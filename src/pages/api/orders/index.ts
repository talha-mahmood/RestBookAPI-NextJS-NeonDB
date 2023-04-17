// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import { verifyAuth } from '../../../auth'
//response model
type Data = {
  status: String,
  message: String,
  data?: any
}

// DB Connection
const client = new Client({
  connectionString:  process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(error => {
    console.error('Failed to connect to PostgreSQL database:', error);
  });


  // get all data
async function selectAll() {
  try {
    const result = await client.query('SELECT * FROM orders'); 
    return result.rows;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }

  // store resource in db
async function store(bookId:number, clientId:number) {
  try {
    const query = `INSERT INTO orders (bookId, clientId) VALUES ('${bookId}', '${clientId}');`;
    console.log("query ::::: ", query);
    
    const result = await client.query(query); 
    return result;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }

  // update resource in db
async function update(id:number, bookId:number, clientId:number) {
  try {
    const query = `UPDATE books
    SET bookId = '${bookId}', clientId = '${clientId}''
    WHERE id = ${id};`;
    
    const result = await client.query(query); 
    return result;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }


export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>)
{
  const authHeader = req.headers.authorization; 
  const token:any = authHeader?.split(" ")[1];
  const auth = await verifyAuth(token)

  if (!auth) {
    res.status(401).json({ status: "401", message: "Unathorized" });
  }else{

  if (req.method === "POST") {
    const { bookId, clientId } = req.body;
    if(null == bookId || null == clientId){
      res.status(422).json({ status: "422", message: "parameters missing" });
    }

    let result = await store(bookId, clientId);
    res.status(201).json({ status: "201", message: "Record added successfully" });

  }else if(req.method === "PUT" || req.method === "PATCH"){
    const { id, bookId, clientId } = req.body;
    if(null == id){
      res.status(422).json({ status: "422", message: "parameters missing: 'id' is required" });
    }
    let result = await update(id, bookId, clientId);
    res.status(201).json({ status: "201", message: "Record updated successfully" });

  }else{
    
    let orders = await selectAll()
  
    res.status(200).json({
          status: "ok",
          message: "All Orders",
          data: orders
      })
  }
}

}
