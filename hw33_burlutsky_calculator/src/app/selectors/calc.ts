import type { RootState } from "../store";

export const selectDisplay   = (s: RootState) => s.calc.display;
export const selectHasMemory = (s: RootState) => s.calc.memoryValue !== null;

export const selectSecondary = (s: RootState) => {
    const { accumulator, pendingOperator } = s.calc;
    if (pendingOperator && accumulator !== null) {
        return `${accumulator} ${pendingOperator}`;
    }
    return "";
};
