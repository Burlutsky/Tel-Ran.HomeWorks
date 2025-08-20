import {useCallback} from "react";
import "./App.css";

import Display from "./components/Display";
import MemoryRow from "./components/MemoryRow";
import Keypad from "./components/Keypad";
import Toast from "./components/Toast";
import KeyboardListener from "./components/KeyboardListener";

import {useSelector} from "react-redux";
import {selectDisplay, selectSecondary, selectHasMemory} from "./app/selectors/calc";
import {useKeyIntent} from "./controllers/useKeyIntent";

function App() {
    const display = useSelector(selectDisplay);
    const secondary = useSelector(selectSecondary);
    const hasMemory = useSelector(selectHasMemory);
    const handleKeyPress = useKeyIntent();

    const onToggleTheme = useCallback(() => {
        const root = document.querySelector<HTMLDivElement>(".calc");
        if (!root) return;
        const cur = root.getAttribute("data-theme") || "system";
        root.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
    }, []);

    return (
        <div className="calc" data-theme="system">
            <KeyboardListener onKeyPress={handleKeyPress} />
            <Display
                value={display}
                secondaryValue={secondary}
                hasMemory={hasMemory}
                onToggleTheme={onToggleTheme}
            />
            <MemoryRow onKeyPress={handleKeyPress} hasMemory={hasMemory}/>
            <Keypad onKeyPress={handleKeyPress}/>
            <Toast />
        </div>
    );
}

export default App;
