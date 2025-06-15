class Chocolate extends Product {
    kind;

    constructor(id, title, manufacture, price, kind) {
        super(id, title, manufacture, price);
        this.kind = kind;
    }

    toString() {
        return super.toString() + ' "' + this.kind + '";';
    }
}