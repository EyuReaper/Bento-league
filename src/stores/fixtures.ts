import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const useFixturesStore = defineStore('fixtures', () => {
    const heroMatch = ref<any>(null);
    const loading = ref(false);

    async function fetchHeroMatch() {
        loading.value = true;
        try {
            // fetch live matches for premier league (league ID: 39)
            const data = await apiRequest<any[]>('fixtures', { league: '39', live: 'all' });
            // logic: pick the first live match, or the first upcoming one if none are live
            heroMatch.value = data[0] || null;
        } catch (error) {
            console.error('Faild to fetch match:', error);
        } finally {
            loading.value = false;
        }
    }
    
    return { heroMatch, loading, fetchHeroMatch };
});
