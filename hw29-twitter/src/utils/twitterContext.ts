import {createContext} from "react";
import type {ContextValue} from "./types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const TwitterContext = createContext<ContextValue>();