import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import user from '@/models/userModel'
import {NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()


export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { token} = reqBody;
        //validation
        console.log(token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({error: "invalid token"}, {status: 500})
        }
        console.log(user);

        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry = undefined
        await user.save();

        return NextResponse.json({error: "Email verified successfully", success: true}, {status: 500})
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, {status: 500})
    }
}
