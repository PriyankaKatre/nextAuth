import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token: any = request.cookies.get('token');
        const decodedToken: any = jwt.verify(token.value, process.env.TOKEN_SECRET!)
        return decodedToken.id
    }
    catch (error: any) {
        throw new Error(error.message)
    }

}

