import React from "react";

export interface DisplayProps {
    value: string;
    secondaryValue?: string;
    hasMemory: boolean;
    onToggleTheme: () => void;
}

const Display: React.FC<DisplayProps> = ({
                                             value,
                                             secondaryValue = "",
                                             hasMemory,
                                             onToggleTheme,
                                         }) => {
    return (
        <section className="display" role="region" aria-label="Display">
            <div className="topbar__right">
                <button
                    type="button"
                    className="icon-btn"
                    data-action="toggle-theme"
                    aria-label="Toggle theme"
                    onClick={onToggleTheme}
                >
                    🌓
                </button>
                {hasMemory && (
                    <span className="memory-indicator" title="Memory">
            M
          </span>
                )}
            </div>

            <div className="display__secondary" aria-live="polite" aria-atomic="true">
                {secondaryValue}
            </div>
            <div className="display__main" aria-live="assertive" aria-atomic="true">
                {value}
            </div>
        </section>
    );
};

export default Display;
