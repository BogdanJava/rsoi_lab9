define(["mongoose", "../config"], function (mongoose, config) {
    let employeeSchema = new mongoose.Schema({
        id: Number,
        name: String,
        phone: String,
        company: String,
        photo: String,
        addedDate: Date,
        salary: Number
    });
    let Employee = mongoose.model('Employee', employeeSchema);
    return {
        connect: () => connect(mongoose, config),
        closeConnection: () => mongoose.disconnect,
        model: () => Employee,
        save: (employee, errorCallback, successCallback) =>
            save(employee, errorCallback, successCallback, Employee),
        getByQuery: (query, errorCallback, successCallback) =>
            getByQuery(query, errorCallback, successCallback, Employee)
    };
});

function save(employee, errorCallback, successCallback, Employee) {
    employee.addedDate = new Date();
    Employee.count({}, (err, count) => {
        if (err) {
            console.log(err);
            throw err;
        }
        employee.id = count + 1;
        let employeeDocument = new Employee(employee);
        employeeDocument.save(err => {
            if (err) {
                errorCallback(err);
            } else successCallback();
        });
    })
}

function getByQuery(query, errorCallback, successCallback, Employee) {
    let queryObject = typeof query === "string" ? JSON.parse(query) : query;
    Employee.find(queryObject, (err, result) => {
        if (err) {
            errorCallback(err);
        } else successCallback(result);
    });
}

function connect(mongoose, config) {
    mongoose.connect(
        `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${
            config.MONGO_DB_NAME
            }`,
        err => {
            if (err) {
                console.log(`Error while connecting to mongo: ${err}`);
            } else {
                console.log(`Connected to mongo`);
                console.log(`db: ${config.MONGO_DB_NAME}`);
                console.log(`host: ${config.MONGO_HOST}`);
                console.log(`port: ${config.MONGO_PORT}`);
            }
        }
    );
}
