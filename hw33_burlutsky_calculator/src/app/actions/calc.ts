import type { Operator, UnaryFn } from "@features/ui/types";

export const INPUT_DIGIT    = "calc/INPUT_DIGIT"    as const;
export const INPUT_DECIMAL  = "calc/INPUT_DECIMAL"  as const;
export const TOGGLE_SIGN    = "calc/TOGGLE_SIGN"    as const;
export const BACKSPACE      = "calc/BACKSPACE"      as const;
export const CLEAR_ENTRY    = "calc/CLEAR_ENTRY"    as const;
export const CLEAR_ALL      = "calc/CLEAR_ALL"      as const;

export const SET_OPERATOR   = "calc/SET_OPERATOR"   as const;
export const APPLY_UNARY    = "calc/APPLY_UNARY"    as const;
export const EVALUATE       = "calc/EVALUATE"       as const;

export const MEMORY_ACT     = "calc/MEMORY_ACT"     as const;

export const inputDigit   = (value: string)               => ({ type: INPUT_DIGIT,   payload: { value } });
export const inputDecimal = ()                            => ({ type: INPUT_DECIMAL });
export const toggleSign   = ()                            => ({ type: TOGGLE_SIGN });
export const backspace    = ()                            => ({ type: BACKSPACE });
export const clearEntry   = ()                            => ({ type: CLEAR_ENTRY });
export const clearAll     = ()                            => ({ type: CLEAR_ALL });

export const setOperator  = (op: Operator)                => ({ type: SET_OPERATOR,  payload: { op } });
export const applyUnaryAC = (fn: UnaryFn)                 => ({ type: APPLY_UNARY,   payload: { fn } });
export const evaluate     = ()                            => ({ type: EVALUATE });

export type MemoryAct = "MC" | "MR" | "M+" | "M-" | "MS";
export const memoryAct    = (act: MemoryAct)              => ({ type: MEMORY_ACT,    payload: { act } });

export type CalcAction =
    | ReturnType<typeof inputDigit>
    | ReturnType<typeof inputDecimal>
    | ReturnType<typeof toggleSign>
    | ReturnType<typeof backspace>
    | ReturnType<typeof clearEntry>
    | ReturnType<typeof clearAll>
    | ReturnType<typeof setOperator>
    | ReturnType<typeof applyUnaryAC>
    | ReturnType<typeof evaluate>
    | ReturnType<typeof memoryAct>;
