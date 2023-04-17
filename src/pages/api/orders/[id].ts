// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'

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

//response model
type Data = {
    status: String,
    message: String,
    data?: any
  }

  // delete resource from db
  async function destroy(id) {
    try {
      const query = `DELETE FROM books
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
    const { id } = req.query
    if(req.method === "DELETE"){
        if(null == id){
          res.status(422).json({ status: "422", message: "parameters missing" });
        }
        let result = await destroy(id);
        res.status(201).json({ status: "201", message: "Record deleted successfully" });
        
      }

}
