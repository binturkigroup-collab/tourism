class ObjectSet<T>  extends Set{
    items: IterableIterator<T>;
    constructor(items: T[], key: string | number) {
        super(items.map(item => item[key]));
        this.items = items[Symbol.iterator]();
    }

    values(): IterableIterator<T> {
        return this.items;
    }
}

export default ObjectSet;
