import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Server-side validation
        if (!name || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Connect to database using the same connection method as NextAuth
        await dbConnect();

        // Check if user already exists using the User model
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: `Account already exists with email ${email}. Please try logging in.`,
                isExisting: true
            }, { status: 409 });
        }

        // Hash the password using bcryptjs (same as NextAuth)
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create new user using the User model
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json({ 
            success: true,
            message: 'Account created successfully!' 
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ 
            success: false,
            message: 'Error creating account' 
        }, { status: 500 });
    }
}
