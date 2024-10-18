// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

//TEST FOR LENGTH OF COLLECT EMPLOYEES FUNCTION-------------------------------------------------------------------------------------------------
//let lengthOfList = 0;
//----------------------------------------------------------------------------------------------------------------------------------------------

// initialize tracking variables for object array of employees and a modifiable data out for function to enter employee info, created here to not reset the object array when initializing a new employee input loop 
let personNumber = 0;
const dataOut = [];

// Collect employee data
const collectEmployees = function () {
  // initialize array of keys for all value names and array to store employee values
  const keys = ['firstName', 'lastName', 'salary'];
  const values = [];

  // creates unique first oppurtunity to enter values or deny and return nothing, avoids returning an empty dataOut object
  let enter = confirm(`Enter new employee info?`)
  if (!enter && dataOut.length === 0) {
    return;
  } else if (!enter) {
    return dataOut; // prevents error from calling this function on button press if you enter nothing by returning the existing array of objects
  }

  // as long as you selected to input employees will continue to allow more employee object editions
  while(enter) {
    const employee = {};
    values[0] = prompt(`Enter first name of employee: `);
    values[1] = prompt(`Enter last name of employee: `);
    values[2] = prompt(`Enter salary of employee: `);
    values[2] = parseInt(values[2]); // fix input to interger value for salary

    // assign default value of zero if non interger entered for salary
    if (isNaN(values[2])) {
      values[2] = 0;
    }

    // create the employee object and adds values to keys (MUST ADD MORE VALUE INPUTS IF EXTENDING KEY LIST, OTHERWISE WILL BE LEFT UNDEFINED)
    for (let i = 0; i < keys.length; i++) {
      employee[keys[i]] = values[i];
    }
    console.log(employee); //ad for tracking object creation
    // add each new employee object to the data return for this function, verify if adding more employees, and iterate the personNumber variable to maintain consistent list placement
    // ADDITIONAL NOTES ON LIST SIZE AND ADDING MORE EMPLOYEES AFTER CLOSING THE LOOP ------------------------------------------------------------------
    // if looking for a consistent way to not overwrite the list (adding an edit button and object array index selector could be used for that) instead of using personNumber variable which is reset on page load since let var = 0; is in the global scope,
    // add a table size check in case prepopulated info is there. Depends on storage location or if the array is initialized with those objects and values in the above JS code
    dataOut[personNumber] = employee;
    enter = confirm(`Add more employees?`);
    personNumber++;
    //ALSO ADD LENGTH OF LIST ITERATOR FOR TEST CONSOLE PRINT LOOP-----------------------------------------------------------------------------------------------------------
    //lengthOfList++;
  }
  return dataOut;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // note that this is currently referencing the returned data that comes out of collectEmployees function, if no inputs are made and array of objects is still empty will show an error
  // (this could be fixed adding single line return in an if else statement that checks if employeesArray passed into this function is a valid array or empty and unable to use length function to set random number selection size)
  // another option could be to add a separate call/button for this function so it's not automatically called even if you cancel inputting employees information
  let choice = Math.floor(Math.random() * employeesArray.length);
  console.log(choice);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();
  //TEST BLOCK---------------------------------------------------------------------------------------------
  // for (let i = 0; i < lengthOfList; i++){
    // console.log(employees[i]);
  // }
  //-------------------------------------------------------------------------------------------------------
  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
