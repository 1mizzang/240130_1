// contexts/PostContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostContextType {
  post: Post | null;
  setPost: (post: Post | null) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
