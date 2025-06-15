class Milk extends Product {
    fat;

    constructor(id, title, manufacture, price, fat) {
        super(id, title, manufacture, price);
        this.fat = fat;
    }

    toString() {
        return super.toString() + ' ' + this.fat + '% fat;';
    }
}