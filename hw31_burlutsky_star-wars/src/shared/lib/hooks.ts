import { useContext } from 'react';
import { SWContext } from '@shared/lib/SWContext';
import type { Friend } from '@shared/types/sw';

export const useMainHero = (friends: Friend[]) => {
    const { mainHero } = useContext(SWContext);
    const hero = friends.find((f) => f.id === mainHero);
    return hero ?? friends[0];
};
