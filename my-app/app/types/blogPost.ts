// app/types/blogPost.ts
// app/types/blogPost.ts
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  date: string; // ISO format
  authorName?: string; // Optional, for display
  thumbnail?: string; // Optional thumbnail URL
}