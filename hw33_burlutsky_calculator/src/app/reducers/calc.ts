import type {Operator} from "@features/ui/types";
import type {CalcAction} from "../actions/calc";
import {
    INPUT_DIGIT, INPUT_DECIMAL, TOGGLE_SIGN, BACKSPACE, CLEAR_ENTRY, CLEAR_ALL,
    SET_OPERATOR, APPLY_UNARY, EVALUATE, MEMORY_ACT
} from "../actions/calc";
import {applyBinary, applyUnary, format} from "../../domain/mathEngine";

export interface CalcState {
    display: string;
    overwriteInput: boolean;

    accumulator: number | null;
    pendingOperator: Operator | null;

    lastOperator: Operator | null;
    lastOperand: number | null;

    memoryValue: number | null;
}

const initialState: CalcState = {
    display: "0",
    overwriteInput: false,

    accumulator: null,
    pendingOperator: null,

    lastOperator: null,
    lastOperand: null,

    memoryValue: null,
};

const parse = (s: string) => {
    const v = Number(String(s).replace(",", "."));
    return Number.isFinite(v) ? v : 0;
};

export function calcReducer(state: CalcState = initialState, action: CalcAction): CalcState {
    switch (action.type) {
        case INPUT_DIGIT: {
            const d = action.payload.value;
            const next = state.overwriteInput || state.display === "0" ? d : state.display + d;
            return {...state, display: next, overwriteInput: false};
        }

        case INPUT_DECIMAL: {
            const base = state.overwriteInput ? "0" : state.display;
            if (base.includes(".")) return {...state, overwriteInput: false, display: base};
            return {...state, display: `${base}.`, overwriteInput: false};
        }

        case TOGGLE_SIGN: {
            const prev = state.display;
            const next = prev.startsWith("-") ? prev.slice(1) : (prev === "0" ? "0" : "-" + prev);
            return {...state, display: next};
        }

        case BACKSPACE: {
            if (state.overwriteInput) return {...state, display: "0"};
            const prev = state.display;
            const next = prev.length <= 1 ? "0" : prev.slice(0, -1);
            return {...state, display: next};
        }

        case CLEAR_ENTRY:
            return {...state, display: "0", overwriteInput: true};

        case CLEAR_ALL:
            return {
                ...initialState,
                // память обычно не сбрасывается при C; но в нашей логике CLEAR_ALL = "C", оставим как у тебя:
                memoryValue: state.memoryValue,
            };

        case SET_OPERATOR: {
            const op = action.payload.op;
            const curr = parse(state.display);

            if (state.pendingOperator !== null && state.accumulator !== null && !state.overwriteInput) {
                const result = applyBinary(state.accumulator, curr, state.pendingOperator);
                return {
                    ...state,
                    accumulator: result,
                    display: format(result),
                    pendingOperator: op,
                    overwriteInput: true,
                };
            } else {
                return {
                    ...state,
                    accumulator: curr,
                    pendingOperator: op,
                    overwriteInput: true,
                };
            }
        }

        case APPLY_UNARY: {
            const curr = parse(state.display);
            const val = applyUnary(action.payload.fn, curr);
            return {...state, display: format(val), overwriteInput: true};
        }

        case EVALUATE: {
            const curr = parse(state.display);

            if (state.pendingOperator !== null && state.accumulator !== null) {
                const rhs = curr;
                const result = applyBinary(state.accumulator, rhs, state.pendingOperator);
                return {
                    ...state,
                    display: format(result),
                    accumulator: result,
                    lastOperator: state.pendingOperator,
                    lastOperand: rhs,
                    pendingOperator: null,
                    overwriteInput: true,
                };
            }
            if (state.lastOperator !== null && state.lastOperand !== null) {
                const lhs = curr;
                const result = applyBinary(lhs, state.lastOperand, state.lastOperator);
                return {
                    ...state,
                    display: format(result),
                    accumulator: result,
                    overwriteInput: true,
                };
            }
            return state;
        }

        case MEMORY_ACT: {
            const curr = parse(state.display);
            const act = action.payload.act;
            switch (act) {
                case "MC":
                    return {...state, memoryValue: null};
                case "MR":
                    if (state.memoryValue === null) return state;
                    return {...state, display: format(state.memoryValue), overwriteInput: true};
                case "M+":
                    return {...state, memoryValue: (state.memoryValue ?? 0) + curr, overwriteInput: true};
                case "M-":
                    return {...state, memoryValue: (state.memoryValue ?? 0) - curr, overwriteInput: true};
                case "MS":
                    return {...state, memoryValue: curr, overwriteInput: true};
            }
        }
        default:
            return state;
    }
}
