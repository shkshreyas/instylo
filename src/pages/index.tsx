import GridPostList from "@/components/shared/GridPostList";
import { useRecentPosts } from "@/lib/react-query/queries/posts";
import { Loader } from "@/components/shared";

const HomeFeed = () => {
  const { data: postsData, isLoading, isError } = useRecentPosts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !postsData) {
    return <div className="text-center pt-10">Error loading posts.</div>;
  }

  // Safely handle potential missing documents property
  const posts = postsData.documents || [];
  
  return (
    <div className="home-container">
      <h2 className="h3-bold text-left w-full mb-8">Home Feed</h2>
      <GridPostList posts={posts} />
    </div>
  );
};

export default HomeFeed; 