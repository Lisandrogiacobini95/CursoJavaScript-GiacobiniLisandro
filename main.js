
/*CARGO LOS DATOS ALMACENADOS EN LOCAL STORAGE, O CREO UN ARREGLO NUEVO SI NO HAY DATOS.*/
const alumnos = JSON.parse(localStorage.getItem("alumnos")) || []

/*LLAMO A ESTA FUNCION CUANDO DESEO CARGAR LOS DATOS DE UN NUEVO ALUMNO*/
const cargar_datos_alumno = (nombre, apellido, grado) => {
   
    const alumno = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        grado,
        presente: 0
    }
    alumnos.push(alumno)
    localStorage.setItem("alumnos",JSON.stringify(alumnos))
    alert("El alumno fue cargado exitosamente")
}

/*LLAMO A ESTA FUNCION CUANDO DESEO BUSCAR LOS DATOS DE ALGUN ALUMNO EN PARTICULAR */
const buscar_datos_alumno = (apellido) => {
    alumnos.forEach(alumno => {
        if (alumno.apellido === apellido.toUpperCase()) {
            alert("NOMBRE: " + alumno.nombre + " APELLIDO: " + alumno.apellido + " GRADO: " + alumno.grado)
        }})
    
}

/*LLAMO A ESTA FUNCION CUANDO DESEO PASAR ASISTENCIA*/
const pasar_asistencia_alumnos = () => {
    console.log("HOLAA")
    alumnos.forEach(alumno =>{
        const app = document.getElementById("pasar_lista-edit")
        const element = document.createElement("div")
        element.className = "tarjeta"
        element.innerHTML = `
                                <input type="text"  class="input" value="${alumno.nombre}">
                                <textarea type="text"  class="input">${alumno.contenido}</textarea>
                                <button class="btn btn-actualizar">Actualizar</button>
                                <button class="btn btn-borrar">Borrar</button>
        `
        if(app){
            app.append(element)
        }
    })
    
}

const principal = () => {
    //CARGARMOS LA FUNCION A EJERCUTAR AL PRESIONAR EL BOTON CARGAR ALUMNO
    const btnCargarAlumno = document.getElementById("btn-cargarAlumno")
    if(btnCargarAlumno){
        btnCargarAlumno.addEventListener("click",()=>{
            const nombreAlumnoCargar = document.getElementById("nombreAlumno-cargar")
            const apellidoAlumnoCargar = document.getElementById("apellidoAlumno-cargar")
            const gradoAlumnoCargar = document.getElementById("gradoAlumno-cargar")
            cargar_datos_alumno(nombreAlumnoCargar.value,apellidoAlumnoCargar.value,gradoAlumnoCargar.value)
            nombreAlumnoCargar.value = ""
            apellidoAlumnoCargar.value = ""
            gradoAlumnoCargar.value = 0
            console.log(alumnos)
        })
    }
    
    //CARGARMOS LA FUNCION A EJERCUTAR AL PRESIONAR EL BOTON BUSCAR ALUMNO
    const btnBuscarAlumno = document.getElementById("btn-buscarAlumno")
    if(btnBuscarAlumno){
        btnBuscarAlumno.addEventListener("click",()=>{
            const apellidoAlumnoBuscar = document.getElementById("apellidoAlumno-buscar")
            buscar_datos_alumno(apellidoAlumnoBuscar.value)
            apellidoAlumnoBuscar.value = ""
        })
    }

    const btnPasarLista = document.getElementById("btn-pasarLista-index")
    if(btnPasarLista){
        btnPasarLista.addEventListener("click",pasar_asistencia_alumnos())
    }
}

principal()