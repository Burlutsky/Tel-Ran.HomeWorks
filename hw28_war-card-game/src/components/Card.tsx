// src/components/Card.tsx
import React from 'react';
import cardsSvg from '../assets/svg-cards.svg?url';

interface CardProps {
    cardId: string;
    viewBox: string;
    width?: number;
    height?: number;
    onClick?: () => void; // Добавляем обработчик клика
}

const Card: React.FC<CardProps> = ({ cardId, viewBox, width = 96, height = 141, onClick }) => {
    return (
        <svg width={width} height={height} onClick={onClick}
             viewBox={viewBox} style={{ padding: '10px' }}>
            <use href={`${cardsSvg}#${cardId}`} />
        </svg>
    );
};

export default Card;