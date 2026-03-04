import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LiveStandings from '../LiveStandings.vue';
import { useStandingsStore } from '@/stores/standings';
import { useLeagueStore } from '@/stores/league';

// Mock the components used in LiveStandings
vi.mock('@/components/ui/table', () => ({
  Table: { template: '<table><slot /></table>' },
  TableHeader: { template: '<thead><slot /></thead>' },
  TableRow: { template: '<tr><slot /></tr>' },
  TableHead: { template: '<th><slot /></th>' },
  TableBody: { template: '<tbody><slot /></tbody>' },
  TableCell: { template: '<td><slot /></td>' },
}));

// Mock the API state
vi.mock('@/lib/api', () => ({
  isUsingMockData: vi.fn(() => false),
  apiRequest: vi.fn(() => Promise.resolve([])),
}));

describe('LiveStandings.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('fetches standings on mount', () => {
    const standingsStore = useStandingsStore();
    const fetchSpy = vi.spyOn(standingsStore, 'fetchStandings');
    
    mount(LiveStandings);
    
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('polls for data every 60 seconds', () => {
    const standingsStore = useStandingsStore();
    const fetchSpy = vi.spyOn(standingsStore, 'fetchStandings');
    
    mount(LiveStandings);
    
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    
    vi.advanceTimersByTime(60000);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    
    vi.advanceTimersByTime(60000);
    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });

  it('re-fetches when league or season changes', async () => {
    const leagueStore = useLeagueStore();
    const standingsStore = useStandingsStore();
    const fetchSpy = vi.spyOn(standingsStore, 'fetchStandings');
    
    mount(LiveStandings);
    
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    
    leagueStore.currentLeagueId = '140';
    await vi.dynamicImportSettled(); // Wait for watchers
    
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    
    leagueStore.currentSeason = '2024';
    await vi.dynamicImportSettled();
    
    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });
});
