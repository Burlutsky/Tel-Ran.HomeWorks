export const getRandomIndex = (min: number, max: number) =>
    Math.trunc(Math.random() * (max - min) + 1);

export const getInfo = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Bad request');
    return response.json();
}
