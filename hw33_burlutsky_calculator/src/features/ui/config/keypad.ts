import type { KeyConf } from "../types";
export const KEYPAD_ROWS: ReadonlyArray<ReadonlyArray<KeyConf>> = [
    [
        { id: "percent", label: "%",  variant: "func", intent: { type: "unary", fn: "percent" } },
        { id: "ce",      label: "CE", variant: "ctrl", intent: { type: "action", act: "CE" } },
        { id: "c",       label: "C",  variant: "ctrl", intent: { type: "action", act: "C" } },
        { id: "bksp",    label: "⌫",  variant: "ctrl", intent: { type: "action", act: "BACKSPACE" }, ariaLabel: "Backspace" },
    ],
    [
        { id: "inv",    label: "1/x", variant: "func", intent: { type: "unary", fn: "inv" } },
        { id: "square", label: "x²",  variant: "func", intent: { type: "unary", fn: "square" } },
        { id: "sqrt",   label: "√",   variant: "func", intent: { type: "unary", fn: "sqrt" } },
        { id: "div",    label: "÷",   variant: "op",   intent: { type: "operator", op: "÷" } },
    ],
    [
        { id: "d7",     label: "7", variant: "digit", intent: { type: "digit", value: "7" } },
        { id: "d8",     label: "8", variant: "digit", intent: { type: "digit", value: "8" } },
        { id: "d9",     label: "9", variant: "digit", intent: { type: "digit", value: "9" } },
        { id: "mul",    label: "×", variant: "op",    intent: { type: "operator", op: "×" } },
    ],
    [
        { id: "d4",     label: "4", variant: "digit", intent: { type: "digit", value: "4" } },
        { id: "d5",     label: "5", variant: "digit", intent: { type: "digit", value: "5" } },
        { id: "d6",     label: "6", variant: "digit", intent: { type: "digit", value: "6" } },
        { id: "sub",    label: "−", variant: "op",    intent: { type: "operator", op: "-" } },
    ],
    [
        { id: "d1",     label: "1", variant: "digit", intent: { type: "digit", value: "1" } },
        { id: "d2",     label: "2", variant: "digit", intent: { type: "digit", value: "2" } },
        { id: "d3",     label: "3", variant: "digit", intent: { type: "digit", value: "3" } },
        { id: "add",    label: "+", variant: "op",    intent: { type: "operator", op: "+" } },
    ],
    [
        { id: "sign",   label: "±", variant: "func",  intent: { type: "action", act: "TOGGLE_SIGN" } },
        { id: "d0",     label: "0", variant: "digit", intent: { type: "digit", value: "0" } },
        { id: "dot",    label: ".", variant: "func",  intent: { type: "action", act: "DECIMAL" }, ariaLabel: "Decimal point" },
        { id: "eq",     label: "=", variant: "eq",    intent: { type: "action", act: "EQUALS" } },
    ],
];
