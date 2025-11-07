import React, { createContext, useState, useContext } from "react";
import type { IPost } from "../types/post.type";

interface FeedContextProps {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  scrollY: number;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
}

const FeedContext = createContext<FeedContextProps | null>(null);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [scrollY, setScrollY] = useState<number>(0);

  return (
    <FeedContext.Provider value={{ posts, setPosts, scrollY, setScrollY }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeedContext must be used within FeedProvider");
  return ctx;
};
