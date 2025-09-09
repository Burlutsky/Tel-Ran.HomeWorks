// src/utils/validateCredentials.ts
import type {ValidationSetters, Credentials} from "./types";

export function validateCredentials(
    {email, password, name}: Credentials,
    s: ValidationSetters
): boolean {
    let ok = true;
    // Reset errors
    s.setEmailError(false);
    s.setEmailErrorMessage("");
    s.setPasswordError(false);
    s.setPasswordErrorMessage("");
    // Check email
    if (!email || !email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        s.setEmailError(true);
        s.setEmailErrorMessage("Invalid email format");
        ok = false;
    }
    // Check password
    if (!password || !password.value || password.value.length < 6) {
        s.setPasswordError(true);
        s.setPasswordErrorMessage("Password must be at least 6 characters");
        ok = false;
    }

    // Name for future use
    if (name && s.setNameError && s.setNameErrorMessage) {
        if (!name.value || name.value.length < 6) {
            s.setPasswordError(true);
            s.setPasswordErrorMessage("Name must be at least 6 characters");
            ok = false;
        } else {
            s.setNameError(false);
            s.setNameErrorMessage("");
        }
    }
    return ok;
}
