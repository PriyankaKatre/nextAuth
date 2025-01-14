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
        const { username, email, password } = reqBody;
        //validation

        console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'user already exists'},
                {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hasPassword = await bcryptjs.hash(password, salt);

        const newUser = new User ({
            username,
            email,
            password: hasPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        //send verification email
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })

        return NextResponse.json({
            message: 'User Registered Susseccfully',
            success: true,
            savedUser,
        }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, {status: 500})
    }
}
