// $(document).ready(function () {
//   $(document).on("click", ".btn-edit", function () {
//     let id = $(this).data("id");
//     let name = $(this).data("name");
//     let position = $(this).data("position");
//     let salary = $(this).data("salary");
//     let department = $(this).data("department");

//     $("#editEmployeeId").val(id);
//     $("#editEmployeeName").val(name);
//     $("#editEmployeePosition").val(position);
//     $("#editEmployeeSalary").val(salary);
//     $("#editEmployeeDepartment").val(department);

//     $("#editEmployeeModal").modal("show");
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  loadEmployees();
});

function loadEmployees() {
  fetch("http://localhost:8080/api/employees")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("employeeTableBody");
      tableBody.innerHTML = "";

      data.forEach((employee) => {
        const row = `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>${employee.department}</td>
          <td>
					<button type="button" class="btn btn-warning btn-sm btn-edit" 
            data-id="${employee.id}" data-name="${employee.name}" 
            data-position="${employee.position}"
            data-salary="${employee.salary}"
            data-department="${employee.department}">Edit</button>
					<button type="button" class="btn btn-danger btn-sm delete-btn" 
            data-id="${employee.id}">Delete</button>
				</td>
        </tr>`;
        tableBody.innerHTML += row;
      });

      attachEventListeners();
    })
    .catch((error) => console.error("Error fetching employees:", error));
}

$(document).ready(function () {
  // Open Add Employee modal
  $(document).on("click", "#add-employee-btn", function () {
    $("#addEmployeeModal").modal("show");
  });

  // Handle Add Employee Form submission
  $("#addEmployeeForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let name = $("#newEmployeeName").val();
    let position = $("#newEmployeePosition").val();
    let salary = $("#newEmployeeSalary").val();
    let department = $("#newEmployeeDepartment").val();

    let employeeData = {
      name: name,
      position: position,
      salary: salary,
      department: department,
    };

    $.ajax({
      url: "api/employees", // Adjust your API endpoint as needed
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(employeeData),
      success: function (response) {
        alert("Employee Added Successfully!");
        $("#addEmployeeModal").modal("hide");

        $("#addEmployeeForm")[0].reset();

        loadEmployees(); // Reload the employee list after adding the new employee
      },
      error: function (xhr, status, error) {
        console.error("Error adding Employee: ", error);
        alert("Failed to add employee");
      },
    });
  });
});

function attachEventListeners() {
  document.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", handleDelete);
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".delete-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       let employeeId = this.getAttribute("data-id");
//       if (confirm("Are you sure you want to delete this employee?")) {
//         fetch(`api/employees/${employeeId}`, { method: "DELETE" })
//           .then((response) => {
//             if (response.ok) {
//               this.closest("tr").remove();
//             } else {
//               alert("Failed to delete employee");
//             }
//           })
//           .catch((error) => console.error("Error: ", error));
//       }
//     });
//   });
// });

function handleDelete(event) {
  const row = event.target.closest("tr");
  const employeeId = $(this).data("id");
  // this.getAttribute("data-id");
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`/api/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          row.remove();
        } else {
          alert("Error deleting employee");
        }
      })
      .catch((error) => console.error("Error: ", error));
  }
}

function handleEdit(event) {
  let id = $(this).data("id");
  let name = $(this).data("name");
  let position = $(this).data("position");
  let salary = $(this).data("salary");
  let department = $(this).data("department");

  $("#editEmployeeId").val(id);
  $("#editEmployeeName").val(name);
  $("#editEmployeePosition").val(position);
  $("#editEmployeeSalary").val(salary);
  $("#editEmployeeDepartment").val(department);

  $("#editEmployeeModal").modal("show");
}

$(document).on("click", "#updateEmployee", function () {
  let id = $("#editEmployeeId").val();
  let name = $("#editEmployeeName").val();
  let position = $("#editEmployeePosition").val();
  let salary = $("#editEmployeeSalary").val();
  let department = $("#editEmployeeDepartment").val();

  let employeeData = {
    id: id,
    name: name,
    position: position,
    salary: salary,
    department: department,
  };

  $.ajax({
    url: "api/employees/" + id,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(employeeData),
    success: function (response) {
      alert("Employee Updated Successfully!");
      $("#editEmployeeModal").modal("hide");
      location.reload();
    },
    error: function (xhr, status, error) {
      console.error("Error updating Employee: ", error);
      alert("failed to update employee");
    },
  });
});

function searchEmployee() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();

  fetch(`/api/employees/search?query=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("employeeTableBody");
      tableBody.innerHTML = "";

      data.forEach((employee) => {
        const row = `
      <tr>
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.salary}</td>
        <td>${employee.department}</td>
        <td>
        <button type="button" class="btn btn-warning btn-sm btn-edit" 
          data-id="${employee.id}" data-name="${employee.name}" 
          data-position="${employee.position}"
          data-salary="${employee.salary}"
          data-department="${employee.department}">Edit</button>
        <button type="button" class="btn btn-danger btn-sm delete-btn" 
          data-id="${employee.id}">Delete</button>
      </td>
      </tr>`;
        tableBody.innerHTML += row;
      });

      attachEventListeners();

    })
    .catch((error) => console.error("Error fetching employees:", error));
}
