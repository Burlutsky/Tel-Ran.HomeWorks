import React, {Fragment, memo} from "react";
import {KEYPAD_ROWS} from "@features/ui/config";
import type {KeyIntent} from "@features/ui/types";
import {Key} from "../Key";

interface KeypadProps {
    onKeyPress: (intent: KeyIntent) => void;
    disabled?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({onKeyPress, disabled}) => {
    return (
        <section className="keypad" role="group" aria-label="Keypad">
            {KEYPAD_ROWS.map((row) => (
                <Fragment key={row.map(k => k.id).join("-")}>
                    {row.map((k) => (
                        <Key
                            key={k.id}
                            label={k.label}
                            variant={k.variant}
                            intent={k.intent}
                            ariaLabel={k.ariaLabel}
                            disabled={disabled || k.disabled}
                            onPress={onKeyPress}
                        />
                    ))}
                </Fragment>
            ))}
        </section>
    );
};

export default memo(Keypad);
