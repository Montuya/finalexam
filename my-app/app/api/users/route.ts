// app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { User } from '../../types/user';

// In-memory "database" for demonstration purposes
let users: User[] = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
let nextId = 2;

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newUser: User = { id: nextId++, name, email, age };
    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}