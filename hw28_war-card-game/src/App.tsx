import {type FC, useEffect, useState} from 'react';
import './App.css';
import Card from './components/Card';
import { cardDeck } from './data/cards'; // Импортируем полный набор карт
import {getCardRank, getCardViewBox, shuffle} from './utils/cardUtils'; // Импортируем функцию для viewBox

const App: FC = () => {
    const [player1Cards, setPlayer1Cards] = useState<string[]>([]);
    const [player2Cards, setPlayer2Cards] = useState<string[]>([]);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        const shuffledDeck = shuffle([...cardDeck]);
        setPlayer1Cards(shuffledDeck.slice(0, 18));
        setPlayer2Cards(shuffledDeck.slice(18));
    }, []);

    const handlePlayTurn = () => {
        if (winner) return;
        if (player1Cards.length === 0) {
            setWinner('Компьютер');
            return;
        }
        if (player2Cards.length === 0) {
            setWinner('Игрок');
            return;
        }

        const [card1, ...rest1] = player1Cards;
        const [card2, ...rest2] = player2Cards;

        const rank1 = getCardRank(card1);
        const rank2 = getCardRank(card2);

        const player1Wins = (rank1 === 1 && rank2 === 9) || (rank1 > rank2 && !(rank2 === 1 && rank1 === 9));
        const player2Wins = (rank2 === 1 && rank1 === 9) || (rank2 > rank1 && !(rank1 === 1 && rank2 === 9));

        if (player1Wins) {
            const newDeck = [...rest1, card1, card2];
            setPlayer1Cards(newDeck);
            setPlayer2Cards(rest2);
        } else if (player2Wins) {
            const newDeck = [...rest2, card1, card2];
            setPlayer1Cards(rest1);
            setPlayer2Cards(newDeck);
        } else {                                                // Карты одинаковые
            const warCards1 = rest1.slice(0, 1);
            const warCards2 = rest2.slice(0, 1);

            if (getCardRank(warCards1[0]) > getCardRank(warCards2[0])) {
                const newDeck = [...rest1.slice(1), card1, card2, warCards1[0], warCards2[0]];
                setPlayer1Cards(newDeck);
                setPlayer2Cards(rest2.slice(1));
            }
            if (getCardRank(warCards2[0]) > getCardRank(warCards1[0])) {
                const newDeck = [...rest2.slice(1), card1, card2, warCards1[0], warCards2[0]];
                setPlayer1Cards(rest1.slice(1));
                setPlayer2Cards(newDeck);
            }
        }
    };

    const playerCard = player1Cards.length > 0? player1Cards[0] : '';
    const computerCard = player2Cards.length > 0? player2Cards[0] : '';
    console.log(player1Cards, player2Cards);
    return (
        <div className="container">
            <h1>Игра «Пьяница»</h1>
            <div className="field">
                <div>
                    <h2>Игрок</h2>
                    <p>Карт: {player1Cards.length}</p>
                    {playerCard && (
                        <Card cardId="back" viewBox={getCardViewBox('back')} width={96} height={141} />
                    )}
                    <Card cardId={playerCard} viewBox={getCardViewBox(playerCard)} />
                </div>
                <div>
                    <h2>Компьютер</h2>
                    <p>Карт: {player2Cards.length}</p>
                    <Card cardId={computerCard} viewBox={getCardViewBox(computerCard)} />
                    {computerCard && (
                        <Card cardId="back" viewBox={getCardViewBox('back')} width={96} height={141} />
                    )}
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={handlePlayTurn} disabled={!!winner}>
                    {winner ? 'Игра окончена' : 'Следующий ход'}
                </button>
            </div>

            {winner && (
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
                    Победил {winner}! Другой игрок — пьяница.
                </h2>
            )}
        </div>
    );
};

export default App;