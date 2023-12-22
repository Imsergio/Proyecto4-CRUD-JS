// Variables y Selectores
const formulario = document.querySelector("#formulario");
const gastosListado = document.querySelector('.gastos-lista');


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
      <button onclick=actualizarGasto(${id}) class="btn btn-warning editar-gasto">
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
  for(let i=0; i<gastosGuardados.length;i++) {
    if(gastosGuardados[i].id === id){
      gastosGuardados.splice(i,1)
    }
  }
  localStorage.setItem("Gastos",JSON.stringify(gastosGuardados));
  leerGasto()

}

