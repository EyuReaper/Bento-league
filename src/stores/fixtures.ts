import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const useFixturesStore = defineStore('fixtures', () => {
    const heroMatch = ref<any>(null);
    const nextMatch = ref<any>(null);
    const loading = ref(false);

    async function fetchHeroMatch() {
        loading.value = true;
        try {
            const data = await apiRequest<any[]>('fixtures', { league: '39', live: 'all' });
            heroMatch.value = data[0] || null;
        } catch (error) {
            console.error('Failed to fetch match:', error);
        } finally {
            loading.value = false;
        }
    }

    async function fetchNextMatch() {
        loading.value = true;
        try {
            const data = await apiRequest<any[]>('fixtures', { league: '39', next: '1' });
            nextMatch.value = data[0] || null;
        } catch (error) {
            console.error('Failed to fetch next match:', error);
        } finally {
            loading.value = false;
        }
    }
    
    return { heroMatch, nextMatch, loading, fetchHeroMatch, fetchNextMatch };
});
