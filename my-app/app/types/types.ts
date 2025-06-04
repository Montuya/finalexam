// /lib/types.ts
export interface Comment {
    id: string;
    postId: string;
    userId: string;
    body: string;
    createdAt: Date;
  }
  
  export interface User {
    id: string;
    name: string;
  }
  
  export interface BlogPost {
    id: string;
    title: string;
  }
  