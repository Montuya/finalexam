import { NextResponse, NextRequest } from 'next/server';
import { BlogPost } from '../../types/blogPost';


// In-memory "database" for blog posts
let posts: BlogPost[] = [];
let nextPostId = 1;

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, authorId, date } = body;

    if (!title || !content || !authorId || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newPost: BlogPost = { id: nextPostId++, title, content, authorId, date };
    posts.push(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}