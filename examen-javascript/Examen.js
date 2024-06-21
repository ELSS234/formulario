
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const userTableContainer = document.getElementById("user-table-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    addUserToTable(nombre, apellido);
    form.reset();
  });

  const addUserToTable = (nombre, apellido) => {
    
    if (!userTableContainer.querySelector("table")) {
      const userTable = document.createElement("table");
      const tableHead = document.createElement("thead");
      const tableRow = document.createElement("tr");

    
      const headerCell1 = document.createElement("th");
      headerCell1.textContent = "Nombre";
      tableRow.appendChild(headerCell1);

      const headerCell2 = document.createElement("th");
      headerCell2.textContent = "Apellido";
      tableRow.appendChild(headerCell2);

      
      tableHead.appendChild(tableRow);
      userTable.appendChild(tableHead);
      userTableContainer.appendChild(userTable);
    }

    const userTable = userTableContainer.querySelector("table").getElementsByTagName("tbody")[0];
    const row = userTable.insertRow();
    const nombreCell = row.insertCell(0);
    const apellidoCell = row.insertCell(1);
    nombreCell.textContent = nombre;
    apellidoCell.textContent = apellido;
  };

  
  const fetchUsersFromAPI = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5500/Examen.html');  
      const data = await response.json();
      data.slice(0, 5).forEach(user => {
        addUserToTable(user.name, user.username); 
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsersFromAPI();
});
