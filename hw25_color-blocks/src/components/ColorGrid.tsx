import React, { useState } from "react";
import style from './ColorGrid.module.css';

type SquareColor = "red" | "blue" | "green" | "yellow";

const originalColors: SquareColor[] = ["red", "blue", "green", "yellow"];

export const ColorGrid: React.FC = () => {
    const [activeColor, setActiveColor] = useState<SquareColor | null>(null);

    const handleClick = (clickedColor: SquareColor) => {
        if (activeColor) {
            setActiveColor(null);
        } else {
            setActiveColor(clickedColor);
        }
    };

    return (
        <div className={style.main}>
            {originalColors.map((color, idx) => (
                <div className={style.square} key={idx}
                    onClick={() => handleClick(color)}
                    style={{backgroundColor: activeColor || color}}
                />
            ))}
        </div>
    );
};
