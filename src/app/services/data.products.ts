import { BaseEntity } from "../models/base.model";

export class Product {
    public productID: number = 0;
    public productName = '';
    public discontinued? = false;
    public unitsInStock?: number;
    public unitPrice = 0;
    public category = {
        categoryID: 0,
        categoryName: ''
    };
}

export const products = [
    {
        productID: 1,
        productName: 'Chai',
        SupplierID: 1,
        categoryID: 1,
        QuantityPerUnit: '10 boxes x 20 bags',
        unitPrice: 18.0,
        unitsInStock: 39,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft Fdrinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 2,
        productName: 'Chang',
        SupplierID: 1,
        categoryID: 1,
        QuantityPerUnit: '24 - 12 oz bottles',
        unitPrice: 19.0,
        unitsInStock: 17,
        UnitsOnOrder: 40,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 3,
        productName: 'Aniseed Syrup',
        SupplierID: 1,
        categoryID: 2,
        QuantityPerUnit: '12 - 550 ml bottles',
        unitPrice: 10.0,
        unitsInStock: 13,
        UnitsOnOrder: 70,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 4,
        productName: "Chef Anton's Cajun Seasoning",
        SupplierID: 2,
        categoryID: 2,
        QuantityPerUnit: '48 - 6 oz jars',
        unitPrice: 22.0,
        unitsInStock: 53,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 5,
        productName: "Chef Anton's Gumbo Mix",
        SupplierID: 2,
        categoryID: 2,
        QuantityPerUnit: '36 boxes',
        unitPrice: 21.35,
        unitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 6,
        productName: "Grandma's Boysenberry Spread",
        SupplierID: 3,
        categoryID: 2,
        QuantityPerUnit: '12 - 8 oz jars',
        unitPrice: 25.0,
        unitsInStock: 120,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 7,
        productName: "Uncle Bob's Organic Dried Pears",
        SupplierID: 3,
        categoryID: 7,
        QuantityPerUnit: '12 - 1 lb pkgs.',
        unitPrice: 30.0,
        unitsInStock: 15,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 7,
            categoryName: 'Produce',
            Description: 'Dried fruit and bean curd'
        }
    },
    {
        productID: 8,
        productName: 'Northwoods Cranberry Sauce',
        SupplierID: 3,
        categoryID: 2,
        QuantityPerUnit: '12 - 12 oz jars',
        unitPrice: 40.0,
        unitsInStock: 6,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 9,
        productName: 'Mishi Kobe Niku',
        SupplierID: 4,
        categoryID: 6,
        QuantityPerUnit: '18 - 500 g pkgs.',
        unitPrice: 97.0,
        unitsInStock: 29,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 10,
        productName: 'Ikura',
        SupplierID: 4,
        categoryID: 8,
        QuantityPerUnit: '12 - 200 ml jars',
        unitPrice: 31.0,
        unitsInStock: 31,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 11,
        productName: 'Queso Cabrales',
        SupplierID: 5,
        categoryID: 4,
        QuantityPerUnit: '1 kg pkg.',
        unitPrice: 21.0,
        unitsInStock: 22,
        UnitsOnOrder: 30,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 12,
        productName: 'Queso Manchego La Pastora',
        SupplierID: 5,
        categoryID: 4,
        QuantityPerUnit: '10 - 500 g pkgs.',
        unitPrice: 38.0,
        unitsInStock: 86,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 13,
        productName: 'Konbu',
        SupplierID: 6,
        categoryID: 8,
        QuantityPerUnit: '2 kg box',
        unitPrice: 6.0,
        unitsInStock: 24,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 14,
        productName: 'Tofu',
        SupplierID: 6,
        categoryID: 7,
        QuantityPerUnit: '40 - 100 g pkgs.',
        unitPrice: 23.25,
        unitsInStock: 35,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 7,
            categoryName: 'Produce',
            Description: 'Dried fruit and bean curd'
        }
    },
    {
        productID: 15,
        productName: 'Genen Shouyu',
        SupplierID: 6,
        categoryID: 2,
        QuantityPerUnit: '24 - 250 ml bottles',
        unitPrice: 15.5,
        unitsInStock: 39,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 16,
        productName: 'Pavlova',
        SupplierID: 7,
        categoryID: 3,
        QuantityPerUnit: '32 - 500 g boxes',
        unitPrice: 17.45,
        unitsInStock: 29,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 17,
        productName: 'Alice Mutton',
        SupplierID: 7,
        categoryID: 6,
        QuantityPerUnit: '20 - 1 kg tins',
        unitPrice: 39.0,
        unitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 18,
        productName: 'Carnarvon Tigers',
        SupplierID: 7,
        categoryID: 8,
        QuantityPerUnit: '16 kg pkg.',
        unitPrice: 62.5,
        unitsInStock: 42,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 19,
        productName: 'Teatime Chocolate Biscuits',
        SupplierID: 8,
        categoryID: 3,
        QuantityPerUnit: '10 boxes x 12 pieces',
        unitPrice: 9.2,
        unitsInStock: 25,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 20,
        productName: "Sir Rodney's Marmalade",
        SupplierID: 8,
        categoryID: 3,
        QuantityPerUnit: '30 gift boxes',
        unitPrice: 81.0,
        unitsInStock: 40,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 21,
        productName: "Sir Rodney's Scones",
        SupplierID: 8,
        categoryID: 3,
        QuantityPerUnit: '24 pkgs. x 4 pieces',
        unitPrice: 10.0,
        unitsInStock: 3,
        UnitsOnOrder: 40,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 22,
        productName: "Gustaf's Knäckebröd",
        SupplierID: 9,
        categoryID: 5,
        QuantityPerUnit: '24 - 500 g pkgs.',
        unitPrice: 21.0,
        unitsInStock: 104,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 23,
        productName: 'Tunnbröd',
        SupplierID: 9,
        categoryID: 5,
        QuantityPerUnit: '12 - 250 g pkgs.',
        unitPrice: 9.0,
        unitsInStock: 61,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 24,
        productName: 'Guaraná Fantástica',
        SupplierID: 10,
        categoryID: 1,
        QuantityPerUnit: '12 - 355 ml cans',
        unitPrice: 4.5,
        unitsInStock: 20,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 25,
        productName: 'NuNuCa Nuß-Nougat-Creme',
        SupplierID: 11,
        categoryID: 3,
        QuantityPerUnit: '20 - 450 g glasses',
        unitPrice: 14.0,
        unitsInStock: 76,
        UnitsOnOrder: 0,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 26,
        productName: 'Gumbär Gummibärchen',
        SupplierID: 11,
        categoryID: 3,
        QuantityPerUnit: '100 - 250 g bags',
        unitPrice: 31.23,
        unitsInStock: 15,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 27,
        productName: 'Schoggi Schokolade',
        SupplierID: 11,
        categoryID: 3,
        QuantityPerUnit: '100 - 100 g pieces',
        unitPrice: 43.9,
        unitsInStock: 49,
        UnitsOnOrder: 0,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 28,
        productName: 'Rössle Sauerkraut',
        SupplierID: 12,
        categoryID: 7,
        QuantityPerUnit: '25 - 825 g cans',
        unitPrice: 45.6,
        unitsInStock: 26,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 7,
            categoryName: 'Produce',
            Description: 'Dried fruit and bean curd'
        }
    },
    {
        productID: 29,
        productName: 'Thüringer Rostbratwurst',
        SupplierID: 12,
        categoryID: 6,
        QuantityPerUnit: '50 bags x 30 sausgs.',
        unitPrice: 123.79,
        unitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 30,
        productName: 'Nord-Ost Matjeshering',
        SupplierID: 13,
        categoryID: 8,
        QuantityPerUnit: '10 - 200 g glasses',
        unitPrice: 25.89,
        unitsInStock: 10,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 31,
        productName: 'Gorgonzola Telino',
        SupplierID: 14,
        categoryID: 4,
        QuantityPerUnit: '12 - 100 g pkgs',
        unitPrice: 12.5,
        unitsInStock: 0,
        UnitsOnOrder: 70,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 32,
        productName: 'Mascarpone Fabioli',
        SupplierID: 14,
        categoryID: 4,
        QuantityPerUnit: '24 - 200 g pkgs.',
        unitPrice: 32.0,
        unitsInStock: 9,
        UnitsOnOrder: 40,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 33,
        productName: 'Geitost',
        SupplierID: 15,
        categoryID: 4,
        QuantityPerUnit: '500 g',
        unitPrice: 2.5,
        unitsInStock: 112,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 34,
        productName: 'Sasquatch Ale',
        SupplierID: 16,
        categoryID: 1,
        QuantityPerUnit: '24 - 12 oz bottles',
        unitPrice: 14.0,
        unitsInStock: 111,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 35,
        productName: 'Steeleye Stout',
        SupplierID: 16,
        categoryID: 1,
        QuantityPerUnit: '24 - 12 oz bottles',
        unitPrice: 18.0,
        unitsInStock: 20,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 36,
        productName: 'Inlagd Sill',
        SupplierID: 17,
        categoryID: 8,
        QuantityPerUnit: '24 - 250 g  jars',
        unitPrice: 19.0,
        unitsInStock: 112,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 37,
        productName: 'Gravad lax',
        SupplierID: 17,
        categoryID: 8,
        QuantityPerUnit: '12 - 500 g pkgs.',
        unitPrice: 26.0,
        unitsInStock: 11,
        UnitsOnOrder: 50,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 38,
        productName: 'Côte de Blaye',
        SupplierID: 18,
        categoryID: 1,
        QuantityPerUnit: '12 - 75 cl bottles',
        unitPrice: 263.5,
        unitsInStock: 17,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 39,
        productName: 'Chartreuse verte',
        SupplierID: 18,
        categoryID: 1,
        QuantityPerUnit: '750 cc per bottle',
        unitPrice: 18.0,
        unitsInStock: 69,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 40,
        productName: 'Boston Crab Meat',
        SupplierID: 19,
        categoryID: 8,
        QuantityPerUnit: '24 - 4 oz tins',
        unitPrice: 18.4,
        unitsInStock: 123,
        UnitsOnOrder: 0,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 41,
        productName: "Jack's New England Clam Chowder",
        SupplierID: 19,
        categoryID: 8,
        QuantityPerUnit: '12 - 12 oz cans',
        unitPrice: 9.65,
        unitsInStock: 85,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 42,
        productName: 'Singaporean Hokkien Fried Mee',
        SupplierID: 20,
        categoryID: 5,
        QuantityPerUnit: '32 - 1 kg pkgs.',
        unitPrice: 14.0,
        unitsInStock: 26,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 43,
        productName: 'Ipoh Coffee',
        SupplierID: 20,
        categoryID: 1,
        QuantityPerUnit: '16 - 500 g tins',
        unitPrice: 46.0,
        unitsInStock: 17,
        UnitsOnOrder: 10,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 44,
        productName: 'Gula Malacca',
        SupplierID: 20,
        categoryID: 2,
        QuantityPerUnit: '20 - 2 kg bags',
        unitPrice: 19.45,
        unitsInStock: 27,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 45,
        productName: 'Rogede sild',
        SupplierID: 21,
        categoryID: 8,
        QuantityPerUnit: '1k pkg.',
        unitPrice: 9.5,
        unitsInStock: 5,
        UnitsOnOrder: 70,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 46,
        productName: 'Spegesild',
        SupplierID: 21,
        categoryID: 8,
        QuantityPerUnit: '4 - 450 g glasses',
        unitPrice: 12.0,
        unitsInStock: 95,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 47,
        productName: 'Zaanse koeken',
        SupplierID: 22,
        categoryID: 3,
        QuantityPerUnit: '10 - 4 oz boxes',
        unitPrice: 9.5,
        unitsInStock: 36,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 48,
        productName: 'Chocolade',
        SupplierID: 22,
        categoryID: 3,
        QuantityPerUnit: '10 pkgs.',
        unitPrice: 12.75,
        unitsInStock: 15,
        UnitsOnOrder: 70,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 49,
        productName: 'Maxilaku',
        SupplierID: 23,
        categoryID: 3,
        QuantityPerUnit: '24 - 50 g pkgs.',
        unitPrice: 20.0,
        unitsInStock: 10,
        UnitsOnOrder: 60,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 50,
        productName: 'Valkoinen suklaa',
        SupplierID: 23,
        categoryID: 3,
        QuantityPerUnit: '12 - 100 g bars',
        unitPrice: 16.25,
        unitsInStock: 65,
        UnitsOnOrder: 0,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 51,
        productName: 'Manjimup Dried Apples',
        SupplierID: 24,
        categoryID: 7,
        QuantityPerUnit: '50 - 300 g pkgs.',
        unitPrice: 53.0,
        unitsInStock: 20,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 7,
            categoryName: 'Produce',
            Description: 'Dried fruit and bean curd'
        }
    },
    {
        productID: 52,
        productName: 'Filo Mix',
        SupplierID: 24,
        categoryID: 5,
        QuantityPerUnit: '16 - 2 kg boxes',
        unitPrice: 7.0,
        unitsInStock: 38,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 53,
        productName: 'Perth Pasties',
        SupplierID: 24,
        categoryID: 6,
        QuantityPerUnit: '48 pieces',
        unitPrice: 32.8,
        unitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: true,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 54,
        productName: 'Tourtière',
        SupplierID: 25,
        categoryID: 6,
        QuantityPerUnit: '16 pies',
        unitPrice: 7.45,
        unitsInStock: 21,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 55,
        productName: 'Pâté chinois',
        SupplierID: 25,
        categoryID: 6,
        QuantityPerUnit: '24 boxes x 2 pies',
        unitPrice: 24.0,
        unitsInStock: 115,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 6,
            categoryName: 'Meat/Poultry',
            Description: 'Prepared meats'
        }
    },
    {
        productID: 56,
        productName: 'Gnocchi di nonna Alice',
        SupplierID: 26,
        categoryID: 5,
        QuantityPerUnit: '24 - 250 g pkgs.',
        unitPrice: 38.0,
        unitsInStock: 21,
        UnitsOnOrder: 10,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 57,
        productName: 'Ravioli Angelo',
        SupplierID: 26,
        categoryID: 5,
        QuantityPerUnit: '24 - 250 g pkgs.',
        unitPrice: 19.5,
        unitsInStock: 36,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 58,
        productName: 'Escargots de Bourgogne',
        SupplierID: 27,
        categoryID: 8,
        QuantityPerUnit: '24 pieces',
        unitPrice: 13.25,
        unitsInStock: 62,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 59,
        productName: 'Raclette Courdavault',
        SupplierID: 28,
        categoryID: 4,
        QuantityPerUnit: '5 kg pkg.',
        unitPrice: 55.0,
        unitsInStock: 79,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 60,
        productName: 'Camembert Pierrot',
        SupplierID: 28,
        categoryID: 4,
        QuantityPerUnit: '15 - 300 g rounds',
        unitPrice: 34.0,
        unitsInStock: 19,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 61,
        productName: "Sirop d'érable",
        SupplierID: 29,
        categoryID: 2,
        QuantityPerUnit: '24 - 500 ml bottles',
        unitPrice: 28.5,
        unitsInStock: 113,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 62,
        productName: 'Tarte au sucre',
        SupplierID: 29,
        categoryID: 3,
        QuantityPerUnit: '48 pies',
        unitPrice: 49.3,
        unitsInStock: 17,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 63,
        productName: 'Vegie-spread',
        SupplierID: 7,
        categoryID: 2,
        QuantityPerUnit: '15 - 625 g jars',
        unitPrice: 43.9,
        unitsInStock: 24,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 64,
        productName: 'Wimmers gute Semmelknödel',
        SupplierID: 12,
        categoryID: 5,
        QuantityPerUnit: '20 bags x 4 pieces',
        unitPrice: 33.25,
        unitsInStock: 22,
        UnitsOnOrder: 80,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 5,
            categoryName: 'Grains/Cereals',
            Description: 'Breads, crackers, pasta, and cereal'
        }
    },
    {
        productID: 65,
        productName: 'Louisiana Fiery Hot Pepper Sauce',
        SupplierID: 2,
        categoryID: 2,
        QuantityPerUnit: '32 - 8 oz bottles',
        unitPrice: 21.05,
        unitsInStock: 76,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 66,
        productName: 'Louisiana Hot Spiced Okra',
        SupplierID: 2,
        categoryID: 2,
        QuantityPerUnit: '24 - 8 oz jars',
        unitPrice: 17.0,
        unitsInStock: 4,
        UnitsOnOrder: 100,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    },
    {
        productID: 67,
        productName: 'Laughing Lumberjack Lager',
        SupplierID: 16,
        categoryID: 1,
        QuantityPerUnit: '24 - 12 oz bottles',
        unitPrice: 14.0,
        unitsInStock: 52,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 68,
        productName: 'Scottish Longbreads',
        SupplierID: 8,
        categoryID: 3,
        QuantityPerUnit: '10 boxes x 8 pieces',
        unitPrice: 12.5,
        unitsInStock: 6,
        UnitsOnOrder: 10,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 3,
            categoryName: 'Confections',
            Description: 'Desserts, candies, and sweet breads'
        }
    },
    {
        productID: 69,
        productName: 'Gudbrandsdalsost',
        SupplierID: 15,
        categoryID: 4,
        QuantityPerUnit: '10 kg pkg.',
        unitPrice: 36.0,
        unitsInStock: 26,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 70,
        productName: 'Outback Lager',
        SupplierID: 7,
        categoryID: 1,
        QuantityPerUnit: '24 - 355 ml bottles',
        unitPrice: 15.0,
        unitsInStock: 15,
        UnitsOnOrder: 10,
        ReorderLevel: 30,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 71,
        productName: 'Flotemysost',
        SupplierID: 15,
        categoryID: 4,
        QuantityPerUnit: '10 - 500 g pkgs.',
        unitPrice: 21.5,
        unitsInStock: 26,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 72,
        productName: 'Mozzarella di Giovanni',
        SupplierID: 14,
        categoryID: 4,
        QuantityPerUnit: '24 - 200 g pkgs.',
        unitPrice: 34.8,
        unitsInStock: 14,
        UnitsOnOrder: 0,
        ReorderLevel: 0,
        discontinued: false,
        category: {
            categoryID: 4,
            categoryName: 'Dairy Products',
            Description: 'Cheeses'
        }
    },
    {
        productID: 73,
        productName: 'Röd Kaviar',
        SupplierID: 17,
        categoryID: 8,
        QuantityPerUnit: '24 - 150 g jars',
        unitPrice: 15.0,
        unitsInStock: 101,
        UnitsOnOrder: 0,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 8,
            categoryName: 'Seafood',
            Description: 'Seaweed and fish'
        }
    },
    {
        productID: 74,
        productName: 'Longlife Tofu',
        SupplierID: 4,
        categoryID: 7,
        QuantityPerUnit: '5 kg pkg.',
        unitPrice: 10.0,
        unitsInStock: 4,
        UnitsOnOrder: 20,
        ReorderLevel: 5,
        discontinued: false,
        category: {
            categoryID: 7,
            categoryName: 'Produce',
            Description: 'Dried fruit and bean curd'
        }
    },
    {
        productID: 75,
        productName: 'Rhönbräu Klosterbier',
        SupplierID: 12,
        categoryID: 1,
        QuantityPerUnit: '24 - 0.5 l bottles',
        unitPrice: 7.75,
        unitsInStock: 125,
        UnitsOnOrder: 0,
        ReorderLevel: 25,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 76,
        productName: 'Lakkalikööri',
        SupplierID: 23,
        categoryID: 1,
        QuantityPerUnit: '500 ml',
        unitPrice: 18.0,
        unitsInStock: 57,
        UnitsOnOrder: 0,
        ReorderLevel: 20,
        discontinued: false,
        category: {
            categoryID: 1,
            categoryName: 'Beverages',
            Description: 'Soft drinks, coffees, teas, beers, and ales'
        }
    },
    {
        productID: 77,
        productName: 'Original Frankfurter grüne Soße',
        SupplierID: 12,
        categoryID: 2,
        QuantityPerUnit: '12 boxes',
        unitPrice: 13.0,
        unitsInStock: 32,
        UnitsOnOrder: 0,
        ReorderLevel: 15,
        discontinued: false,
        category: {
            categoryID: 2,
            categoryName: 'Condiments',
            Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
        }
    }
];
