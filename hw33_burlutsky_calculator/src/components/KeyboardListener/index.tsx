import React, { useEffect, useMemo } from "react";
import { KEYPAD_ROWS } from "@features/ui/config";
import { KEYBOARD_MAP } from "@features/ui/maps/keyboard";
import type { KeyIntent } from "@features/ui/types";

// Построим быстрый словарь id -> intent из конфигурации клавиатуры
function useIntentMap() {
  return useMemo(() => {
    const map: Record<string, KeyIntent> = {};
    for (const row of KEYPAD_ROWS) {
      for (const key of row) {
        map[key.id] = key.intent;
      }
    }
    return map;
  }, []);
}

type Props = {
  onKeyPress: (intent: KeyIntent) => void;
  enabled?: boolean;
};

const CODE_FALLBACK: Record<string, string> = {
  NumpadAdd: "add",
  NumpadSubtract: "sub",
  NumpadMultiply: "mul",
  NumpadDivide: "div",
  NumpadEnter: "eq",
  NumpadDecimal: "dot",
};

export const KeyboardListener: React.FC<Props> = ({ onKeyPress, enabled = true }) => {
  const intentById = useIntentMap();

  useEffect(() => {
    if (!enabled) return;

    const pressVisual = (id: string, down: boolean) => {
      const el = document.querySelector<HTMLButtonElement>(`button[data-key="${id}"]`);
      if (!el) return;
      if (down) {
        el.classList.add("is-pressed");
      } else {
        el.classList.remove("is-pressed");
      }
    };

    const toId = (e: KeyboardEvent): string | null => {
      // Пробуем по e.key
      if (KEYBOARD_MAP[e.key] != null) return KEYBOARD_MAP[e.key];
      // Фолбэк по коду
      if (CODE_FALLBACK[e.code] != null) return CODE_FALLBACK[e.code];
      return null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const id = toId(e);
      if (!id) return;
      const intent = intentById[id];
      if (!intent) return;
      e.preventDefault();
      pressVisual(id, true);
      onKeyPress(intent);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const id = toId(e);
      if (!id) return;
      pressVisual(id, false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [enabled, intentById, onKeyPress]);

  return null;
};

export default KeyboardListener;
