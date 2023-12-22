// Variables y Selectores
const formulario = document.querySelector("#formulario");
const gastosListado = document.querySelector('.gastos-lista');
var miModal = new bootstrap.Modal(document.getElementById('myModal'));


// Eventos
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', leerGasto);
  formulario.addEventListener('submit', crearGasto);
}

function crearGasto(e) {

  e.preventDefault();
  gasto = document.querySelector("#titulo").value;
  descripcion = document.querySelector("#descripcion").value;
  precio = document.querySelector("#precio").value;

  let Objeto_gasto = {
    gasto,
    descripcion,
    precio,
    id: Date.now()
  }

  if (localStorage.getItem("Gastos") == null) {
    let gastos = []
    gastos.push(Objeto_gasto)
    localStorage.setItem("Gastos", JSON.stringify(gastos))
  } else {
    let gastos = JSON.parse(localStorage.getItem("Gastos"))
    gastos.push(Objeto_gasto)
    localStorage.setItem("Gastos", JSON.stringify(gastos))
  }
  formulario.reset();
  leerGasto();

}

// Funcion para listar datos
function leerGasto() {

  let gastosGuardados = JSON.parse(localStorage.getItem("Gastos"));
  // Limpiar HTML
  gastosListado.innerHTML = "";

  // Iterar sobre los gastos 
  if (gastosGuardados) {

    gastosGuardados.forEach(array => {
      const { gasto, descripcion, precio, id } = array;
      // (Tr) para listar
      const nuevoGasto = document.createElement('tr');
      nuevoGasto.dataset.id = id;

      // (td) Insertar el gasto 
      nuevoGasto.innerHTML = `
      <td class="td-celda">${gasto}</td>
      <td class="td-celda">${descripcion}</td>
      <td class="td-celda">${precio}</td>
      `;

      // botones editar/borrar gasto.
      const btnBorrar = document.createElement('td');
      btnBorrar.innerHTML = `
      <button onclick=editarGasto(${id}) class="btn btn-warning editar-gasto" data-bs-toggle="modal" data-bs-target="#myModal">
        <i class="bi bi-pencil"></i>
      </button>
      <button onclick=eliminarGasto(${id}) class=" btn  btn-danger borrar-gasto">
        <i class="bi bi-trash3"></i>
      </button>`;
      nuevoGasto.appendChild(btnBorrar);
      // Insertar al HTML
      gastosListado.appendChild(nuevoGasto);
    });
  } else {
    // (td) Insertar el gasto 
    console.log("sin registros")
  }
}

function eliminarGasto(id) {
  let gastosGuardados = JSON.parse(localStorage.getItem("Gastos"));
  for (let i = 0; i < gastosGuardados.length; i++) {
    if (gastosGuardados[i].id === id) {
      gastosGuardados.splice(i, 1)
    }
  }
  localStorage.setItem("Gastos", JSON.stringify(gastosGuardados));
  leerGasto()

}

function editarGasto(id) {
  let gastosGuardados = JSON.parse(localStorage.getItem("Gastos"));
  for (let i = 0; i < gastosGuardados.length; i++) {
    if (gastosGuardados[i].id === id) {
      const { gasto, descripcion, precio } = gastosGuardados[i];
      document.querySelector(".modal-content").innerHTML = `
    <div class="modal-header">
      <h1 class="modal-title fs-5">Editar gasto</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="card-body">
        <form>
          <div class="form-group">
            <input type="text" id="newtitulo" class="form-control my-3" value="${gasto}" required>
          </div>
          <div class="form-group">
            <textarea id="newdescripcion" class="form-control my-3" required>${descripcion}</textarea>
          </div>
          <div class="form-group">
            <input type="number" id="newprecio" class="form-control my-3" value="${precio}" required>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button type="button"  onclick="actualizarGasto(${i})" class="btn btn-primary">Actualizar</button>
    </div>

      `
    }
  }
  localStorage.setItem("Gastos", JSON.stringify(gastosGuardados));
  leerGasto()
}

function actualizarGasto(i) {
  let gastosGuardados = JSON.parse(localStorage.getItem("Gastos"));
  gastosGuardados[i].gasto = document.querySelector("#newtitulo").value;
  gastosGuardados[i].descripcion = document.querySelector("#newdescripcion").value;
  gastosGuardados[i].precio = document.querySelector("#newprecio").value;

  localStorage.setItem("Gastos", JSON.stringify(gastosGuardados));
  //Ocultar modal
  miModal.hide();
  leerGasto()
}
