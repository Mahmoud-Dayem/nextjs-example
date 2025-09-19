// app/api/submit-form/route.js (Next.js 13+ App Router)
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request) {
    console.log('api called xxxxxxxxxx');

    try {
        const { name, email, password } = await request.json();

        // Server-side validation
        if (!name || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Example: save to database or just log
        console.log('Received form data:', { name, email /* do not log password */ });

        const client = await clientPromise;
        const db = client.db("usersdb");

        // Check if user already exists
        const existingUser = await db.collection('userscollection').findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: `Account already exists with email ${email}. Please try logging in.`,
                isExisting: true
            }, { status: 409 });
        }

        // Hash the password before inserting
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await db.collection('userscollection').insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        return NextResponse.json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('submit-form error', error);
        return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
    }
}
