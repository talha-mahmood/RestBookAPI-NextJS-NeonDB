import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Limit the middleware to paths starting with `/api/order`
export const config = {
  matcher: '/api/order:function*', // apply matcher only on order end points
}

export default async function handler(req: NextRequest, res: NextResponse, next: () => void) {

  const authHeader = req.headers.get('authorization'); // get authorization header from request

  if (!authHeader) {
    return NextResponse.json({"error": "Missing Authorization header."}, { status: 401})
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json({"error": "Missing Authorization token."}, { status: 401})
  }
  
}
