import React from "react";

export type KeyVariant = "digit" | "op" | "ctrl" | "func" | "eq" | "ghost";
export type Operator = "+" | "-" | "×" | "÷";
export type UnaryFn  = "percent" | "sqrt" | "square" | "inv";
export type ActionAct =
    | "CE" | "C" | "BACKSPACE"
    | "TOGGLE_SIGN" | "DECIMAL" | "EQUALS"
    | "MC" | "MR" | "M+" | "M-" | "MS";

export type KeyIntent =
    | { type: "digit"; value: string }
    | { type: "operator"; op: Operator }
    | { type: "unary"; fn: UnaryFn }
    | { type: "action"; act: ActionAct };

export type KeyConf = {
    id: string;
    label: React.ReactNode;
    variant: KeyVariant;
    intent: KeyIntent;
    ariaLabel?: string;
    disabled?: boolean;
};
