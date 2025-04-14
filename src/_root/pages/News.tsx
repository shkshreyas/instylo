import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Newspaper, Search, RefreshCw, 
  Bookmark, ExternalLink, ThumbsUp, 
  Share, Calendar 
} from "lucide-react";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const News = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("technology");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [activeView, setActiveView] = useState<"all" | "saved">("all");
  const [pageSize] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  // Real API fetch function using NewsAPI.org via our proxy
  const fetchNews = async (category: string, query: string = "") => {
    setLoading(true);
    setError(null);
    
    try {
      // Determine which API endpoint to use based on search query
      let url = '';
      const baseUrl = import.meta.env.PROD 
        ? `/api/news` // Use our serverless function in production
        : `https://newsapi.org/v2`; // Use direct API in development
      
      if (import.meta.env.PROD) {
        // When in production, use our serverless function
        url = `${baseUrl}?${query ? `query=${encodeURIComponent(query)}` : `category=${category}`}&pageSize=${pageSize}&page=${page}`;
      } else {
        // In development, use direct NewsAPI endpoints
        const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
        if (query) {
          // Search everything endpoint
          url = `${baseUrl}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
        } else {
          // Top headlines by category
          url = `${baseUrl}/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
        }
      }
      
      const response = await fetch(url);
      const data: NewsResponse = await response.json();
      
      if (data.status === 'ok') {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } else {
        throw new Error(data.status);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news. Please try again later.");
      setLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to fetch news articles. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Load saved articles from localStorage
    const savedArticlesData = localStorage.getItem('savedNewsArticles');
    if (savedArticlesData) {
      try {
        setSavedArticles(JSON.parse(savedArticlesData));
      } catch (error) {
        console.error("Error parsing saved articles:", error);
      }
    }
    
    fetchNews(category);
  }, [category, page, pageSize]);

  // Save articles to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedNewsArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPage(1); // Reset to first page when searching
      fetchNews("", searchQuery);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSearchQuery("");
    setPage(1); // Reset to first page when changing category
  };

  const handleSaveArticle = (article: Article) => {
    const isSaved = savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );

    if (isSaved) {
      setSavedArticles(
        savedArticles.filter((savedArticle) => savedArticle.url !== article.url)
      );
      toast({
        title: "Removed",
        description: "Article removed from saved items",
      });
    } else {
      setSavedArticles([...savedArticles, article]);
      toast({
        title: "Saved",
        description: "Article saved for later reading",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col py-10 px-5 md:px-8 lg:px-14 gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Newspaper className="w-10 h-10 text-primary-500" />
          <h1 className="h1-bold text-light-1">News Feed</h1>
        </div>
        <p className="text-light-3 max-w-lg">
          Stay updated with the latest news and events from around the world.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-1 gap-2 bg-dark-3 rounded-xl p-2 items-center">
          <Search className="w-5 h-5 text-light-3 ml-2" />
          <input
            type="text"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent border-none outline-none p-2 text-light-1"
          />
          <Button
            className="px-4 bg-primary-500 hover:bg-primary-600"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeView === "all" ? "default" : "outline"}
            className={activeView === "all" ? "bg-primary-500" : ""}
            onClick={() => setActiveView("all")}
          >
            All News
          </Button>
          <Button
            variant={activeView === "saved" ? "default" : "outline"}
            className={activeView === "saved" ? "bg-primary-500" : ""}
            onClick={() => setActiveView("saved")}
          >
            Saved ({savedArticles.length})
          </Button>
        </div>
      </div>

      {/* Categories - Only show when in "all" view and no search query */}
      {activeView === "all" && !searchQuery && (
        <div className="flex flex-wrap gap-2">
          {["business", "entertainment", "general", "health", "science", "sports", "technology"].map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat 
                  ? "bg-primary-500 text-white" 
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-dark-3 text-light-2 hover:bg-dark-4"
            onClick={() => fetchNews(category, searchQuery)}
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* News content */}
      <div className="w-full">
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
              <p className="text-light-3">Loading news articles...</p>
            </div>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-500">{error}</p>
            <Button 
              className="mt-4"
              onClick={() => fetchNews(category, searchQuery)}
            >
              Try Again
            </Button>
          </div>
        ) : activeView === "saved" && savedArticles.length === 0 ? (
          <div className="py-20 text-center">
            <Bookmark className="w-12 h-12 text-light-3 mx-auto mb-4" />
            <p className="text-light-3">No saved articles yet.</p>
            <Button 
              className="mt-4"
              onClick={() => setActiveView("all")}
            >
              Browse Articles
            </Button>
          </div>
        ) : (activeView === "all" && articles.length === 0 && !loading) ? (
          <div className="py-20 text-center">
            <Newspaper className="w-12 h-12 text-light-3 mx-auto mb-4" />
            <p className="text-light-3">No articles found matching your criteria.</p>
            <Button 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                fetchNews(category);
              }}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeView === "all" ? articles : savedArticles).map((article, index) => (
                <motion.div
                  key={article.url + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-dark-3 rounded-xl overflow-hidden border border-dark-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    {article.urlToImage ? (
                      <img 
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          // Replace broken images with a placeholder
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image+Available';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-4 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-light-3" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full bg-dark-1/70 backdrop-blur-sm ${
                          savedArticles.some(saved => saved.url === article.url)
                            ? "text-yellow-500"
                            : "text-light-2"
                        }`}
                        onClick={() => handleSaveArticle(article)}
                      >
                        <Bookmark className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-primary-500/20 text-primary-500 rounded-full">
                        {article.source.name || "Unknown Source"}
                      </span>
                      <span className="text-xs text-light-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-light-1 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-light-3 text-sm mb-4 line-clamp-3">{article.description || "No description available."}</p>
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-dark-4">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-500 text-sm font-medium flex items-center gap-1 hover:underline"
                      >
                        Read More <ExternalLink className="w-4 h-4" />
                      </a>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-light-3 hover:text-light-1"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-light-3 hover:text-light-1"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: article.title,
                                url: article.url
                              }).catch(console.error);
                            } else {
                              // Fallback - copy to clipboard
                              navigator.clipboard.writeText(article.url);
                              toast({
                                title: "Link Copied",
                                description: "Article link copied to clipboard",
                              });
                            }
                          }}
                        >
                          <Share className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Load more button - only show for "all" view and if more results are available */}
            {activeView === "all" && articles.length > 0 && articles.length < totalResults && (
              <div className="mt-8 flex justify-center">
                <Button 
                  className="bg-primary-500 hover:bg-primary-600"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Articles'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News; 