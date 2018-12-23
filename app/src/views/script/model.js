class Warehouse {
    constructor(id, name, address, company, products, addedDate) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.company = company;
        this.products = products;
        this.addedDate = addedDate;
    }

    static fromRawObject(raw) {
        let warehouse = new Warehouse();
        if (raw) {
            Object.assign(warehouse, raw);
            warehouse.address = Address.fromRawObject(warehouse.address);
            warehouse.addedDate = new Date(Date.parse(raw.addedDate)).toDateString();
        }
        return warehouse;
    }
}

class Employee {
    constructor(id, name, phone, photo, company, addedDate, salary, email) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.company = company;
        this.photo = photo;
        this.addedDate = addedDate;
        this.salary = salary;
        this.email = email;
    }

    static fromRawObject(raw) {
        let employee = new Employee();
        if (raw) {
            Object.assign(employee, raw);
            employee.addedDate = new Date(Date.parse(raw.addedDate)).toDateString();
        }
        return employee;
    }
}

class Company {
    constructor(id, name, address, registrationDate, photo, addedDate, employees, warehouses) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.registrationDate = registrationDate;
        this.photo = photo;
        this.employees = employees;
        this.warehouses = warehouses;
        this.addedDate = addedDate;
    }

    static fromRawObject(raw) {
        let company = new Company();
        if (raw) {
            Object.assign(company, raw);
            company.address = Address.fromRawObject(company.address);
            company.addedDate = new Date(Date.parse(raw.addedDate)).toDateString();
            company.registrationDate = new Date(Date.parse(raw.registrationDate)).toDateString();
        }
        return company;
    }
}

class Product {
    constructor(id, name, price, photo, description, warehouse, unit, addedDate) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.photo = photo;
        this.description = description;
        this.warehouse = warehouse;
        this.unit = unit;
        this.addedDate = addedDate;
    }

    static fromRawObject(raw) {
        let product = new Product();
        if (raw) {
            Object.assign(product, raw);
            product.addedDate = new Date(Date.parse(raw.addedDate)).toDateString();
            product.warehouse = Warehouse.fromRawObject(product.warehouse);
            product.warehouse.company = Company.fromRawObject(product.warehouse.company);
        }
        return product;
    }
}

class Address {
    constructor(country, city, street, house) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.house = house;
    }

    getAddressString() {
        return `${this.house} ${this.street}, ${this.city}, ${this.country}`
    }

    static fromRawObject(raw) {
        let address = new Address();
        if (raw) {
            Object.assign(address, raw);
        }
        return address;
    }
}