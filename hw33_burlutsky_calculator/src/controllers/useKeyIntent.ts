import {useCallback} from "react";
import {useDispatch} from "react-redux";
import type {KeyIntent} from "@features/ui/types";
import { showToast } from "@features/ui/toast";
import {
    applyUnaryAC,
    backspace,
    clearAll,
    clearEntry,
    evaluate,
    inputDecimal,
    inputDigit,
    memoryAct,
    setOperator,
    toggleSign
} from "../app/actions/calc";

export function useKeyIntent() {
    const dispatch = useDispatch();

    return useCallback((intent: KeyIntent) => {
        switch (intent.type) {
            case "digit":
                return void dispatch(inputDigit(intent.value));
            case "operator":
                return void dispatch(setOperator(intent.op));
            case "unary":
                return void dispatch(applyUnaryAC(intent.fn));
            case "action": {
                switch (intent.act) {
                    case "DECIMAL":
                        return void dispatch(inputDecimal());
                    case "TOGGLE_SIGN":
                        return void dispatch(toggleSign());
                    case "BACKSPACE":
                        return void dispatch(backspace());
                    case "CE":
                        dispatch(clearEntry());
                    showToast("Cleared entry");
                    return;
                    case "C":
                        dispatch(clearAll());
                    showToast("All cleared");
                    return;
                    case "EQUALS":
                        return void dispatch(evaluate());
                    case "MC":
                    case "MR":
                    case "M+":
                    case "M-":
                    case "MS":
                        dispatch(memoryAct(intent.act));
switch (intent.act) {
    case "MC": showToast("Memory cleared"); break;
    case "MR": showToast("Memory recalled"); break;
    case "M+": showToast("Added to memory"); break;
    case "M-": showToast("Subtracted from memory"); break;
    case "MS": showToast("Saved to memory"); break;
}
return;

                    default:
                        return;
                }
            }
        }
    }, [dispatch]);
}
