const store = new Store();
store.add(new Milk(1, 'Milk 3%', 'Cow farm 1', 10, 3));
store.add(new Milk(2, 'Milk 5%', 'Cow farm 1', 12, 5));
store.add(new Milk(3, 'Milk 3%', 'Cow farm 2', 9, 3));
store.add(new Chocolate(4, 'Dark Chocolate 80%', 'Chocolate plant 1', 25, 'Dark 80%'));
store.add(new Chocolate(5, 'Dark Chocolate 96%', 'Chocolate plant 1', 28, 'Dark 96%'));
store.add(new Chocolate(6, 'Milk Chocolate', 'Chocolate plant 1', 15, 'Milk'));
store.add(new Wine(7, 'Whiskey', 'Jack Daniels', 80, 40));

console.log(store.getByType('Milk'));
console.log(store.getAll());
console.log(store.getByTitle('Milk'));

const main = document.querySelector('body');
const productTypes = [...new Set(store.getAll().map(item => item.constructor.name))];
for (let productType of productTypes) {
    const typeDiv = document.createElement('div');
    typeDiv.innerHTML = '<h2>' + productType + '</h2>';
    for (const item of store.getByType(productType)) {
        typeDiv.innerHTML += `<p>${item.toString()}</p>`;
    }
    main.append(typeDiv);
}
main.innerHTML += '<hr> See more in console.'