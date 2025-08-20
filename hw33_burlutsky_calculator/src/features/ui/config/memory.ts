import type {KeyConf} from "../types";

export const MEMORY_KEYS: ReadonlyArray<KeyConf> = [
    {id: "mc",      label: "MC", variant: "ghost", intent: {type: "action", act: "MC"}, ariaLabel: "Memory clear"},
    {id: "mr",      label: "MR", variant: "ghost", intent: {type: "action", act: "MR"}, ariaLabel: "Memory recall"},
    {id: "mplus",   label: "M+", variant: "ghost", intent: {type: "action", act: "M+"}, ariaLabel: "Memory add"},
    {id: "mminus",  label: "M−", variant: "ghost", intent: {type: "action", act: "M-"}, ariaLabel: "Memory subtract"},
    {id: "ms",      label: "MS", variant: "ghost", intent: {type: "action", act: "MS"}, ariaLabel: "Memory store"},
];
