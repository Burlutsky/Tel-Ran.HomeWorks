class Product {
    id;
    title;
    manufacture;
    price;

    constructor(id, title, manufacture, price) {
        this.id = id;
        this.title = title;
        this.manufacture = manufacture;
        this.price = price;
    }

    toString() {
        return this.id + '. "' + this.title + '"; "' + this.manufacture + '"; price = ' + this.price + '; ' ;
    }
}