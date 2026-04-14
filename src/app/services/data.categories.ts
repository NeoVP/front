export class Category {
    public categoryID: number = 0;
    public categoryName: string = '';
}

export const categories: Category[] = [
    <Category>{ categoryID: 1, categoryName: 'Beverages' },
    <Category>{ categoryID: 2, categoryName: 'Condiments' },
    <Category>{ categoryID: 3, categoryName: 'Confections' },
    <Category>{ categoryID: 4, categoryName: 'Dairy Products' },
    <Category>{ categoryID: 5, categoryName: 'Grains/Cereals' },
    <Category>{ categoryID: 6, categoryName: 'Meat/Poultry' },
    <Category>{ categoryID: 7, categoryName: 'Produce' },
    <Category>{ categoryID: 8, categoryName: 'Seafood' }
];
