import { useQuery } from "@tanstack/react-query";
import { getRecentPosts } from "@/lib/appwrite/api";

export function useRecentPosts() {
  return useQuery({
    queryKey: ["recentPosts"],
    queryFn: async () => {
      const posts = await getRecentPosts();
      if (!posts) {
        throw new Error("Unable to fetch posts");
      }
      return posts;
    }
  });
} 