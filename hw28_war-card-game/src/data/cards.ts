// src/data/cards.ts (создайте новый файл)

// Номиналы карт: 1 (туз) - 13 (король)
// const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
export const ranks = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', '1'];

// Масти:
export const suits = ['club', 'diamond', 'heart', 'spade'];

export const cardDeck = suits.flatMap(suit =>
    ranks.map(rank => `${rank}_${suit}`)
);