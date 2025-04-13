/**
 * Mock API services for when real API keys aren't available
 * This allows the application to function in demo mode
 */

// Simulated delay to mimic API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock responses for different query types
const RESPONSES = {
  greeting: [
    "Hello! I'm your Instylo Assistant. How can I help you today?",
    "Welcome to Instylo! I'm here to assist with your sustainability questions.",
    "Hi there! I'm ready to help with energy management and sustainability topics."
  ],
  weather: [
    "Based on current weather data, today would be a good day to optimize your solar panel positioning.",
    "Current weather conditions indicate moderate energy consumption would be ideal today.",
    "Weather patterns today suggest optimal conditions for natural ventilation rather than AC usage."
  ],
  energy: [
    "I analyzed your energy consumption patterns. You could save approximately 15% by adjusting your peak usage hours.",
    "Your recent energy usage shows you're already optimizing well. Consider smart plugs for further improvements.",
    "Based on your data, switching more activities to off-peak hours could reduce your energy bills substantially."
  ],
  sustainability: [
    "Looking at your sustainability goals, focusing on water conservation might give you the biggest impact.",
    "For your sustainability initiatives, consider implementing a composting system next.",
    "To improve your sustainability metrics, transportation adjustments would yield the highest reduction in carbon footprint."
  ],
  default: [
    "I understand your interest in this topic. Would you like more specific information about sustainable practices?",
    "That's an interesting point. Let me suggest some eco-friendly alternatives you might consider.",
    "I appreciate your question. From a sustainability perspective, there are several approaches worth exploring."
  ]
};

// Get a random response from the appropriate category
const getRandomResponse = (category: keyof typeof RESPONSES) => {
  const responses = RESPONSES[category] || RESPONSES.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Detect the category based on user input
const detectCategory = (input: string): keyof typeof RESPONSES => {
  const lowercase = input.toLowerCase();
  
  if (/\bhello\b|\bhi\b|\bhey\b|\bgreetings\b/.test(lowercase)) return 'greeting';
  if (/\bweather\b|\btemperature\b|\bforecast\b|\bclimate\b/.test(lowercase)) return 'weather';
  if (/\benergy\b|\bpower\b|\belectricity\b|\busage\b|\bconsumption\b/.test(lowercase)) return 'energy';
  if (/\bsustainable\b|\becofriendly\b|\bgreen\b|\bcarbon\b|\bfootprint\b/.test(lowercase)) return 'sustainability';
  
  return 'default';
};

// Mock Gemini API
export const mockGeminiAPI = async (prompt: string): Promise<string> => {
  // Simulate API latency
  await delay(1000 + Math.random() * 1000);
  
  const category = detectCategory(prompt);
  return getRandomResponse(category);
};

// Mock Weather API
export const mockWeatherAPI = async (_lat: number, _lon: number) => {
  // Simulate API latency
  await delay(800 + Math.random() * 500);
  
  return {
    location: {
      name: "Your Location",
      region: "Demo Region",
      country: "Demo Country",
    },
    current: {
      temp_c: 22 + Math.random() * 10 - 5,
      condition: {
        text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain"][Math.floor(Math.random() * 4)],
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
      },
      feelslike_c: 23 + Math.random() * 10 - 5,
      humidity: 40 + Math.floor(Math.random() * 40),
      wind_kph: 5 + Math.random() * 15
    }
  };
}; 