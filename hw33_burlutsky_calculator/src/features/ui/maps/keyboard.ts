// Пример: нормализуем KeyboardEvent.key → id из раскладки
export const KEYBOARD_MAP: Record<string, string> = {
    "0":"d0","1":"d1","2":"d2","3":"d3","4":"d4","5":"d5","6":"d6","7":"d7","8":"d8","9":"d9",
    "+":"add","-":"sub","*":"mul","x":"mul","X":"mul","/":"div","÷":"div",
    "Enter":"eq","=":"eq",
    "Backspace":"bksp","Delete":"c",
    ".":"dot",",":"dot",
    "%":"percent",
};
