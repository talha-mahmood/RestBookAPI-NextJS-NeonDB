// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import postgres from "postgres";

const conn = postgres();

async function selectAll() {
  let con=await conn.unsafe(    "SELECT * FROM books");
  console.log(con)
  return con;
 
}

// const sql = postgres();

// const result = await sql.unsafe(req.body);

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  selectAll()
  res.status(200).json(
    { name: 'Talha' })
}
