jQuery(function () {
    $.LoadingOverlay('show');
    let employeesTableBody = $("#tableBody")[0];
    getResource("/api/employees", "{}", employees => {
        employees
            .map(Employee.fromRawObject)
            .map(getEmployeeTableRow)
            .forEach(employeeRow => insertEmployeeIntoTable(employeesTableBody, employeeRow));
        $.LoadingOverlay('hide');
    });
    $("#addNewEmployeeModal").on("shown.bs.modal", () => {
        $("#emailInput").trigger('focus')
    });

    $("#applyFilterButton").click(() => {
        let salary = $("#salaryFilterInput").val();
        if (!salary) {
            $.amaran({
                content: {
                    title: 'FAIL',
                    message: 'Incorrect salary filter',
                    info: 'Enter some filter value'
                },
                theme: 'awesome error',
                position: 'top right'
            });
        } else {
            let func = $("#functionSelect").find(":selected").val();
            let employeesTableBody = $("#tableBody")[0];
            $(employeesTableBody).html("");
            let query = `{"salary": {\"$${func}\": ${salary}}}`;
            getResource("/api/employees", {query: query}, employees => {
                employees
                    .map(Employee.fromRawObject)
                    .map(getEmployeeTableRow)
                    .forEach(employeeRow => insertEmployeeIntoTable(employeesTableBody, employeeRow));
                $.LoadingOverlay('hide');
            });
        }
    });

    $("#saveEmployeeButton").click(() => {
        let email = $("#emailInput").val();
        let name = $("#nameInput").val();
        let salary = $("#salaryInput").val();
        let company = $("#companyInput").val();
        let photoURL = $("#photoInput").val();
        let phone = $("#phoneInput").val();
        let employee = new Employee(
            null,
            name,
            phone,
            photoURL,
            company,
            new Date(),
            salary,
            email);
        postResource('/api/employees', JSON.stringify(employee), result => {
            $('#addNewEmployeeModal').modal('hide');
            if (result.success) {
                $.amaran({
                    content: {
                        title: 'SUCCESS',
                        message: 'Employee has been created',
                        info: 'Good job!'
                    },
                    theme: 'awesome ok',
                    position: 'top right'
                });
            }
        })
    })
});

function insertEmployeeIntoTable(tbody, row) {
    tbody.insertAdjacentHTML('beforeend', row);
}

function getEmployeeTableRow(employee) {
    return `
        <tr>    
            <td>${employee.id}</td>
            <td>
                <img class="logo-small employee-photo" src="${employee.photo}" alt="Employee photo">
                <span>${employee.name}</span>
            </td>
            <td>${employee.phone}</td>
            <td>${employee.salary}</td>
            <td>${employee.addedDate}</td>
            <td class="flex-row justify-content-between">
                <span>${employee.company}</span>
            </td>
        </tr>`
}
