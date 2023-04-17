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

export async function verifyAuth(token:string) {

  try {
    const client = await getClient();
      const query = `SELECT * FROM clients
      WHERE token = '${token}';`;
      
      const result = await client.query(query); 
      return result?.rowCount>0 ? result.rows[0] : 0;

    } catch (error) {
      console.error('Error executing SQL query:', error);
    }

}