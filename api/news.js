// Vercel Serverless Function to proxy NewsAPI requests
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { category, query, page, pageSize } = req.query;
  const apiKey = process.env.VITE_NEWSAPI_KEY || '18264140198c44bab8fe4312f3f47533';

  try {
    let url;
    if (query) {
      // Search everything endpoint
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize || 12}&page=${page || 1}&apiKey=${apiKey}`;
    } else {
      // Top headlines by category
      url = `https://newsapi.org/v2/top-headlines?category=${category || 'technology'}&language=en&pageSize=${pageSize || 12}&page=${page || 1}&apiKey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      res.status(200).json(data);
    } else {
      throw new Error(data.message || 'Failed to fetch news');
    }
  } catch (error) {
    console.error('Error in news API proxy:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message || 'Failed to fetch news',
      articles: [] 
    });
  }
} 