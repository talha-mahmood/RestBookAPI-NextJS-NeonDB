import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from 'pg'
import jwt, { Secret } from 'jsonwebtoken';

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

      // store token in db
async function store(name:any, email:any, token:any) {
    try {
        const query = `INSERT INTO clients (name, email, token) VALUES ('${name}', '${email}', '${token}');`
        const result = await client.query(query); 
         return result;
  
      } catch (error) {
        console.error('Error executing SQL query:', error);
      }
    }

    // get user data
async function get(name: string, email: string) {
    try {
      const result = await client.query(`SELECT * FROM clients WHERE name='${name}' AND email='${email}'`);
      return result.rows;

      } catch (error) {
        console.error('Error executing SQL query:', error);
      }
    }


async function createAccessToken(req: NextApiRequest,res: NextApiResponse) {
    if(req.method == 'POST'){
        const { clientName, clientEmail } = req.body;
        if(null == clientName || null == clientEmail){
            res.status(422).json({ status: "422", message: "parameters missing" });
        }
        const user = await get(clientName, clientEmail);
        if( user&& user.length > 0){
            res.status(409).json({ status: "409", message: "API client already registered. Try a different email."});
        }

        try{
            const key:any|Secret = process.env.ACCESS_TOKEN_SECRET
            const accessToken = jwt.sign({ name: clientName, email: clientEmail }, key, { expiresIn: '7d' });

            await store(clientName, clientEmail, accessToken)
            res.status(200).json({ accessToken: accessToken});

        }catch(error){
            res.status(500).json({ status: "500", message: "Internal server error" });
        }
    }else{
        res.status(405).json({ status: "405", message: "method not allowed" });
    }
};

export default createAccessToken;