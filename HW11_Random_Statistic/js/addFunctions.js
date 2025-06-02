let litmir = [
    { author: 'Orwell', title: '1984'},
    { author: 'Nesbo', title: 'Knife'},
    { author: 'Caroll', title: 'Alice in Wonderland'},
    { author: 'Gogol', title: 'Viy'},
];

litmir.sort((a, b) => a.title < b.title? -1 : 1);

console.log(litmir);

let results = [
    {name: 'Vasya', points: 150},
    {name: 'Moshe', points: 120},
    {name: 'Lisa', points: 100},
    {name: 'Boruh', points: 150},
    {name: 'Sam', points: 120},
    {name: 'Lida', points: 200},
];

results.sort((a, b) => {
    if (a.points !== b.points) {
        return a.points > b.points? -1 : 1;
    } else {
        return a.name < b.name? -1 : 1;
    }
});

console.log(results);