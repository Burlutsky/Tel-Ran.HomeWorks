
export const getRandomNumber = (from: number, to: number) => {
    return Math.trunc(Math.random()*(to - from)) + from;
}

export const getEcho = (data:string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data) resolve(data);
            else reject(new Error("Error!"))
        }, 1000)
    })
}

export const arraysEqualByKey = <T,>(
    a: T[],
    b: T[],
    keySelector: (item: T) => unknown
): boolean => {
    if (a.length !== b.length) return false;
    return a.every((item, i) => keySelector(item) === keySelector(b[i]));
}
