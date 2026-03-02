import { mockLeagues, mockStandings, mockFixtures, mockTransfers } from './mocks';

const API_KEY = (import.meta.env.VITE_API_FOOTBALL_KEY || '').trim();
const BASE_URL = import.meta.env.VITE_API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

// Internal state to track if we are currently using mock data due to a failure
let usingFallbackMocks = !API_KEY || API_KEY.length !== 32;

export const isUsingMockData = () => usingFallbackMocks || import.meta.env.VITE_USE_MOCKS === 'true';

const getMockData = (endpoint: string): any => {
  if (endpoint.includes('leagues')) return mockLeagues;
  if (endpoint.includes('standings')) return mockStandings;
  if (endpoint.includes('fixtures')) return mockFixtures;
  if (endpoint.includes('transfers')) return mockTransfers;
  if (endpoint.includes('injuries')) return mockInjuries;
  if (endpoint.includes('predictions')) return mockPredictions;
  if (endpoint.includes('players')) return mockPlayers;
  return [];
};

export async function apiRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  // If we already know we're in fallback mode or key is missing/invalid length, use mocks
  if (isUsingMockData()) {
    if (API_KEY && API_KEY.length !== 32 && !usingFallbackMocks) {
       console.error(`CRITICAL: Your API Key is ${API_KEY.length} chars. API-Football REQUIRES a 32-char hex key.`);
       usingFallbackMocks = true;
    }
    return getMockData(endpoint) as unknown as T;
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    
    if (data.errors && (typeof data.errors === 'string' || Object.keys(data.errors).length > 0)) {
      const errorMsg = typeof data.errors === 'string' ? data.errors : Object.values(data.errors).join(', ');
      throw new Error(errorMsg);
    }

    return data.response as T;
  } catch (error: any) {
    console.group('⚽ Bento League API Diagnostic');
    console.error(`Endpoint: ${endpoint}`);
    console.error(`Error: ${error.message}`);
    console.warn('Action: Automatically falling back to MOCK DATA.');
    console.info('Tip: Verify your VITE_API_FOOTBALL_KEY in .env is exactly 32 characters.');
    console.groupEnd();
    
    usingFallbackMocks = true; // Switch to fallback mode for the rest of the session
    return getMockData(endpoint) as unknown as T;
  }
}
