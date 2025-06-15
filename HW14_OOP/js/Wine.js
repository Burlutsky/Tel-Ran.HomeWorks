class Wine extends Product {
    alcohol;

    constructor(id, title, manufacture, price, alcohol) {
        super(id, title, manufacture, price);
        this.alcohol = alcohol;
    }

    toString() {
        return super.toString() + ' alcohol ' + this.alcohol + '%;';
    }
}