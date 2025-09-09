// src/utils/types.ts
import React from "react";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ValidationSetters = {
    setEmailError: Setter<boolean>;
    setEmailErrorMessage: Setter<string>;
    setPasswordError: Setter<boolean>;
    setPasswordErrorMessage: Setter<string>;
    setNameError?: Setter<boolean>;
    setNameErrorMessage?: Setter<string>;
};

export type Credentials = {
    name?: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
};
