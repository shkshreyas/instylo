import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, Button, Input } from '@/components/ui';
import { 
  Gamepad, Search, Filter, Monitor, Globe
} from 'lucide-react';

// Define game interface
interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [featuredGame, setFeaturedGame] = useState<Game | null>(null);

  // Game categories
  const genres = ['MMORPG', 'Shooter', 'Strategy', 'MOBA', 'Racing', 'Sports', 'Social', 'Card Game', 'Battle Royale', 'Action RPG', 'Fighting'];

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      try {
        // Using the free FreeToGame API through RapidAPI proxy
        const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch games data');
        }

        const data: Game[] = await response.json();
        setGames(data);
        setFilteredGames(data);
        
        // Set a random featured game from top-rated games
        const topGames = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
        setFeaturedGame(topGames[0]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to fetch games. Please try again later.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on search query, genre and platform
  useEffect(() => {
    let result = games;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.short_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre) {
      result = result.filter(game => 
        game.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // Filter by platform
    if (selectedPlatform) {
      result = result.filter(game => 
        game.platform.toLowerCase().includes(selectedPlatform.toLowerCase())
      );
    }

    setFilteredGames(result);
  }, [searchQuery, selectedGenre, selectedPlatform, games]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in the useEffect
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="flex flex-col w-full h-full p-6 bg-dark-1 text-light-1">
      <h1 className="text-3xl font-bold mb-6">Game Center</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Featured Game */}
          {featuredGame && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl overflow-hidden border border-purple-500/30"
            >
              <div className="relative h-80 w-full">
                <img 
                  src={featuredGame.thumbnail} 
                  alt={featuredGame.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-1 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Featured</span>
                      <span className="px-2 py-1 bg-dark-4/80 text-light-2 text-xs rounded-full">{featuredGame.genre}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{featuredGame.title}</h2>
                    <p className="text-light-2 max-w-2xl line-clamp-2">{featuredGame.short_description}</p>
                    <div className="flex gap-4 mt-2">
                      <a 
                        href={featuredGame.game_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full inline-flex items-center gap-2 transition-colors"
                      >
                        <Gamepad className="w-4 h-4" />
                        Play Now
                      </a>
                      <a 
                        href={featuredGame.freetogame_profile_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-dark-4 hover:bg-dark-3 text-light-1 rounded-full inline-flex items-center gap-2 transition-colors"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-3 w-5 h-5" />
                <Input 
                  type="text"
                  placeholder="Search games..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 py-2 bg-dark-3 border-dark-4 focus:border-primary-500"
                />
              </div>
            </form>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-40 py-2 px-4 bg-dark-3 border border-dark-4 rounded-md text-light-1 appearance-none cursor-pointer focus:border-primary-500"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-3 w-4 h-4" />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPlatform('')}
                  className={`p-2 rounded-md ${selectedPlatform === '' ? 'bg-primary-500' : 'bg-dark-3'}`}
                  title="All Platforms"
                >
                  <Globe className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedPlatform('PC')}
                  className={`p-2 rounded-md ${selectedPlatform === 'PC' ? 'bg-primary-500' : 'bg-dark-3'}`}
                  title="PC"
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedPlatform('Browser')}
                  className={`p-2 rounded-md ${selectedPlatform === 'Browser' ? 'bg-primary-500' : 'bg-dark-3'}`}
                  title="Browser"
                >
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ y: -5 }}
                  className="bg-dark-2 rounded-xl overflow-hidden border border-dark-4 hover:border-primary-500 transition-all"
                >
                  <div className="relative group">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title} 
                      className="w-full h-40 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <a 
                        href={game.game_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-primary-500 text-white rounded-md"
                      >
                        Play Now
                      </a>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-dark-1/80 text-xs rounded-full">
                        {game.platform.includes('PC') && <Monitor className="w-3 h-3 inline mr-1" />}
                        {game.platform.includes('Browser') && <Globe className="w-3 h-3 inline mr-1" />}
                        {game.platform}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-md line-clamp-1">{game.title}</h3>
                      <span className="px-1.5 py-0.5 bg-dark-4 text-light-2 text-xs rounded">
                        {game.genre}
                      </span>
                    </div>
                    <p className="text-light-3 text-sm line-clamp-2 mb-3">{game.short_description}</p>
                    <div className="flex justify-between items-center text-xs text-light-3">
                      <span>
                        {game.release_date && formatDate(game.release_date)}
                      </span>
                      <span>{game.publisher}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
              <Gamepad className="w-12 h-12 text-light-3 mb-2" />
              <p className="text-light-3">No games found. Try adjusting your filters.</p>
            </div>
          )}
          
          {/* Load More Button */}
          {filteredGames.length > 0 && filteredGames.length < games.length && (
            <div className="flex justify-center mt-8">
              <Button className="px-6 py-2">
                Load More Games
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Games; 