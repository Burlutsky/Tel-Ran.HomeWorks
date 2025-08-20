import React from "react";
import {Key} from "../Key";
import type { KeyIntent } from "@features/ui/types";
import { MEMORY_KEYS } from "@features/ui/config";

interface MemoryRowProps {
    onKeyPress: (intent: KeyIntent) => void;
    hasMemory: boolean;               // ← чтобы решать, активны ли MC/MR
    disabled?: boolean;               // опционально: выключить весь ряд
}

const MemoryRow: React.FC<MemoryRowProps> = ({ onKeyPress, hasMemory, disabled }) => {
    return (
        <div className="memory-row" role="group" aria-label="Memory row">
            {MEMORY_KEYS.map((k) => {
                const isClear = k.id === "mc";
                const isRecall = k.id === "mr";
                // MC/MR отключаем, если памяти нет; остальные — как есть
                const isDisabled = disabled || (!hasMemory && (isClear || isRecall));

                return (
                    <Key
                        key={k.id}
                        label={k.label}
                        variant={k.variant}
                        intent={k.intent}
                        ariaLabel={k.ariaLabel}
                        disabled={isDisabled}
                        dataKey={k.id}           // удобно для KeyboardListener/подсветки
                        onPress={onKeyPress}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(MemoryRow);
