// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

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
    const result = await client.query('SELECT * FROM books'); 
    return result.rows;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }

  // store resource in db
async function store(name:number, type:string, available:string) {
  try {
    const query = `INSERT INTO books (name, type, available) VALUES ('${name}', '${type}', '${available}');`;
    console.log("store book query ::::: ", query);
    
    const result = await client.query(query); 
    return result;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }

  // update resource in db
async function update(id:number, name:string, type:string, available:string) {
  try {
    const query = `UPDATE books
    SET name = '${name}', type = '${type}', available = '${available}'
    WHERE id = ${id};`;
    console.log("query ::::: ", query);
    
    const result = await client.query(query); 
    return result;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }
  }


export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>)
{
  if (req.method === "POST") {
    const { name, type, available } = req.body;
    if(null == name || null == type || null == available){
      res.status(422).json({ status: "422", message: "parameters missing" });
    }

    let result = await store(name, type, available);
    res.status(201).json({ status: "201", message: "Record added successfully" });

  }else if(req.method === "PUT" || req.method === "PATCH"){
    
    const { id, name, type, available } = req.body;
    let result = await update(id, name, type, available);
    if(null == id){
      res.status(422).json({ status: "422", message: "parameters missing: 'id' is required" });
    }
    res.status(201).json({ status: "201", message: "Record updated successfully" });

  }else{
    
    let books = await selectAll()
  
    res.status(200).json({
          status: "ok",
          message: "All Books",
          data: books
      })
  }


}
