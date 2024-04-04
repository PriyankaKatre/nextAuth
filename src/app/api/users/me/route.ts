import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/userModel'


connect()


export const POST = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request);
        console.log(userId)
        const user = await User.findOne({ _id: userId })
        return NextResponse.json({message: "User Found", data: user})
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, {status: 500})
    }
}
