class Store {
    products = [];

    constructor() {
    }
    add(product) {                  // method should add unique products
        this.products.push(product);
    };
    getAll() {               // return array with all products
        return this.products;
    };
    getByType(type) {         // return array with products of type only
        // type = 'Milk' - only products instance of Milk
        // type = 'Chocolate' - only products instance of Chocolate
        // type = 'Wine' - only products instance of Wine
        return this.products.filter(product => product.constructor.name === type);
    };
    getByTitle(title) {       // return array with products of name only
        return this.products.filter(product => product.title.indexOf(title) > -1);
    };

}