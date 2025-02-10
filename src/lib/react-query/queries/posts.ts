import { useQuery } from "react-query";
import { getRecentPosts } from "@/lib/appwrite/api";

export function useRecentPosts() {
  return useQuery("recentPosts", async () => {
    const posts = await getRecentPosts();
    if (!posts) {
      throw new Error("Unable to fetch posts");
    }
    return posts;
  });
} 