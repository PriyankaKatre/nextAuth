import { connect } from '@/dbConfig/dbConfig'
import {NextRequest, NextResponse } from 'next/server'


connect()


export const GET = async (request: NextRequest) => {
    try {
        const response = NextResponse.json({ message: 'Logout Successfully', success: true })
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return response
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, {status: 500})
    }
}
