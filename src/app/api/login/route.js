// app/api/submit-form/route.js (Next.js 13+ App Router)
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request) {
  console.log('login api called');

  try {
    const { email, password } = await request.json();

    // Server-side validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('usersdb');

    // Find user by email
    const existingUser = await db.collection('userscollection').findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify password - supports hashed passwords (bcrypt).
    // If stored password is plain text (not recommended), fallback to direct compare.
    let passwordMatches = false;
    try {
      if (existingUser.password) {
        passwordMatches = await bcrypt.compare(password, existingUser.password);
      }
    } catch (err) {
      console.error('bcrypt compare error', err);
      // leave passwordMatches false to treat as mismatch
    }

    // fallback plain-text check (in case DB has unhashed passwords)
    if (!passwordMatches && existingUser.password && existingUser.password === password) {
      passwordMatches = true;
    }

    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Prepare safe user payload (avoid sending sensitive fields)
    const safeUser = {
      email: existingUser.email,
      name: existingUser.name || null,
      createdAt: existingUser.createdAt ? existingUser.createdAt.toString() : null
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Authenticated successfully',
        user: safeUser
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
