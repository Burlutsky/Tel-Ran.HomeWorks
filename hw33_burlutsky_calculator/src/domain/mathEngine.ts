import type { Operator, UnaryFn } from "@features/ui/types";

export function applyUnary(fn: UnaryFn, x: number): number {
    switch (fn) {
        case "percent": return x / 100;
        case "sqrt":    return Math.sqrt(x);
        case "square":  return x * x;
        case "inv":     return x === 0 ? Infinity : 1 / x;
    }
}

export function applyBinary(a: number, b: number, op: Operator): number {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "×": return a * b;
        case "÷": return b === 0 ? Infinity : a / b;
    }
}

// простейший форматтер
export const format = (n: number) => String(n);
