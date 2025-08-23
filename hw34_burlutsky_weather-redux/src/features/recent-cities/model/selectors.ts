import type { RootState } from '@/app/providers/store';

export const selectRecentCities = (s: RootState) => s.recentCities.cities;
export const selectRecentCitiesLimit = (s: RootState) => s.recentCities.maxItems;
