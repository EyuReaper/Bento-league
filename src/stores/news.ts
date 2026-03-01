import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface NewsItem {
  id: string | number;
  text: string;
  category: string;
  icon: string;
  source: string;
  image?: string;
}

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([]);
  const loading = ref(false);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  async function fetchNews() {
    loading.value = true;
    try {
      // Fetching top football news from specific high-quality sports domains
      const domains = 'goal.com,skysports.com,espn.com,bbc.co.uk/sport';
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=(football OR soccer OR "Premier League")&domains=${domains}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.articles) {
        news.value = data.articles.map((article: any, index: number) => ({
          id: index,
          text: article.title,
          category: article.source.name.toUpperCase(),
          icon: '⚽',
          source: article.source.name,
          image: article.urlToImage
        }));
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      // Fallback mock data if API fails or key is missing
      news.value = [
        { id: 1, text: 'Arsenal finalize agreement for Real Madrid midfielder', category: 'TRANSFER', icon: '⚡', source: 'Sky Sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=200&auto=format&fit=crop' },
        { id: 2, text: 'Injury Blow: Haaland sidelined for crucial UCL clash', category: 'INJURY', icon: '🚑', source: 'BBC Sport', image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=200&auto=format&fit=crop' }
      ];
    } finally {
      loading.value = false;
    }
  }

  return { news, loading, fetchNews };
});
