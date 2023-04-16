// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status:string,
  message:string,
  data: object 
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { id }= req.query
    // let books=[];
    // let books=[
    //     [
    //         {
    //         "id": 1,
    //         "name": "The Russian",
    //         "type": "fiction",
    //         "available": true
    //         },
    //         {
    //         "id": 2,
    //         "name": "Just as I Am",
    //         "type": "non-fiction",
    //         "available": false
    //         },
    //         {
    //         "id": 3,
    //         "name": "The Vanishing Half",
    //         "type": "fiction",
    //         "available": true
    //         },
    //         {
    //         "id": 4,
    //         "name": "The Midnight Library",
    //         "type": "fiction",
    //         "available": true
    //         },
    //         {
    //         "id": 5,
    //         "name": "Untamed",
    //         "type": "non-fiction",
    //         "available": true
    //         },
    //         {
    //         "id": 6,
    //         "name": "Viscount Who Loved Me",
    //         "type": "fiction",
    //         "available": true
    //         }
    //         ]
    // ]
  res.status(200).json({
  status:"ok",
  message:"All Books",
  data: books });
} 

