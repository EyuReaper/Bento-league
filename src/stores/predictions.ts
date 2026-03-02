import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiRequest } from '@/lib/api';

export const usePredictionsStore = defineStore('predictions', () => {
  const prediction = ref<any>(null);
  const loading = ref(false);

  async function fetchPredictions(fixtureId?: number) {
    loading.value = true;
    try {
      let id = fixtureId;
      if (!id) {
         // Fallback to latest fixture if no ID provided
         const fixtures = await apiRequest<any[]>('fixtures', { league: '39', next: '1' });
         if (fixtures.length > 0) id = fixtures[0].fixture.id;
      }
      
      if (id) {
        const data = await apiRequest<any[]>('predictions', { fixture: id.toString() });
        prediction.value = data[0] || null;
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      loading.value = false;
    }
  }

  return { prediction, loading, fetchPredictions };
});
