import type {KeyIntent, KeyVariant} from "@features/ui/types";
import React from "react";

export interface KeyProps {
    label: React.ReactNode;
    variant: KeyVariant;
    intent: KeyIntent;
    ariaLabel?: string;
    disabled?: boolean;
    dataKey?: string;                // NEW: для подсветки и хоткеев
    onPress: (intent: KeyIntent) => void;
}

export const Key: React.FC<KeyProps> = ({ label, variant, intent, ariaLabel, disabled, dataKey, onPress }) => {
    const className = `key ${variant === "digit" ? "key--digit" : ""} ${
        variant === "op" ? "key--op" : ""
    } ${variant === "ctrl" ? "key--ctrl" : ""} ${variant === "func" ? "key--func" : ""} ${
        variant === "eq" ? "key--eq" : ""
    } ${variant === "ghost" ? "key--ghost" : ""}`;

    return (
        <button
            type="button"
            className={className}
            aria-label={ariaLabel}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            data-key={dataKey}           // <-- здесь используем
            onClick={() => onPress(intent)}
        >
            {label}
        </button>
    );
};
