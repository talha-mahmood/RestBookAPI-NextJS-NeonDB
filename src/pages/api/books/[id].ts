// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

// DB Connection
async function getClient(){
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
    return client;
}
//response model
type Data = {
    status: String,
    message: String,
    data?: any
  }

  // delete resource from db
  async function destroy(id:any) {
    
    const client = await getClient(); 
    try {
      const query = `DELETE FROM books
      WHERE id = ${id};`;
      
      const result = await client.query(query); 
      return result;
  
      } catch (error) {
        console.error('Error executing SQL query:', error);
      }
    }

    // get book by id from db
  async function show(id:any) {
    const client = await getClient(); 
    try {
      const query = `SELECT * FROM books
      WHERE id = ${id};`;
      
      const result = await client.query(query);
      return result;
  
      } catch (error) {
        console.error('Error executing SQL query:', error);
      }
    }
  

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>)
{
    const { id } = req.query
    if(null == id){
      res.status(422).json({ status: "422", message: "parameters missing" });
    }

    if(req.method === "DELETE"){
        let result = await destroy(id);
        res.status(201).json({ status: "201", message: "Record deleted successfully" });
        
      }else{
        let result = await show(id);
        if(result && result.rowCount > 0){
          res.status(201).json({ status: "200",message: "book", data: result?.rows[0] });
        }else{
          res.status(404).json({ status: "404",message: "NO Recod found"});

        }

      }

}
