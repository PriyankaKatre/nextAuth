import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import user from '@/models/userModel'
import {NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()


export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email, password} = reqBody;
        //validation
        console.log(reqBody)

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({error: "User Does not exists"}, {status: 500})
        }
        console.log(user);

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "Check your credentials", success: true}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        const response = NextResponse.json({ message: "Logged in  successfully", success: true }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, {status: 500})
    }
}
