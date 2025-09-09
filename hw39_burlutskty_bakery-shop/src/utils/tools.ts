export const getRandomNumber = (from: number, to: number) => {
    return Math.trunc(Math.random() * (to - from)) + from;
}

export function parseFullName(fullName: string): { name: string; lastName: string } {
    const trimmed = fullName.trim();

    if (!trimmed) return { name: "", lastName: "" };
    const firstSpaceIndex = trimmed.indexOf(" ");

    if (firstSpaceIndex === -1) return { name: trimmed, lastName: "" };     // One word

    const name = trimmed.slice(0, firstSpaceIndex);
    const lastName = trimmed.slice(firstSpaceIndex).trim();

    return { name, lastName };
}