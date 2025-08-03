import {cardDeck, ranks, suits} from "../data/cards.ts";

const cardWidth = 167.575;
const cardHeight = 243.238;
const cardYOffset = -236;

export function getCardViewBox(cardId: string) {
    // console.log(cardId);
    if (cardId === 'back') {
        return "335.15 737.55 167.575 243.137";
    }
    if (cardId === 'black_joker') {
        return "0 737.55 167.575 243.137";
    }
    if (cardId === 'red_joker') {
        return "167.575 737.55 167.575 243.137";
    }

    const [rank, suit] = cardId.split('_');
    const rankIndex = ranks.indexOf(rank) == 8? 0 : ranks.indexOf(rank) + 5;
    const suitIndex = suits.indexOf(suit);
    if (rankIndex === -1 || suitIndex === -1) {
        // console.error(`Invalid cardId: ${cardId}`);
        return "335.15 737.55 167.575 243.137";
    }

    const x = rankIndex * cardWidth;
    const y = cardYOffset + suitIndex * cardHeight;

    return `${x} ${y} ${cardWidth} ${cardHeight}`;
}

export function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getCardRank = (cardId: string) => {
    const rank = cardId.split('_')[0];
    const rankValues: { [key: string]: number } = {
        '6': 1, '7': 2, '8': 3, '9': 4, '10': 5,
        'jack': 6, 'queen': 7, 'king': 8, '1': 9, // Туз — самая старшая
    };
    return rankValues[rank] || 0;
};

export const getRandomCard = (): string => {
    const randomIndex = Math.floor(Math.random() * cardDeck.length);
    return cardDeck[randomIndex];
};