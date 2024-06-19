/*URL de la base de datos para simular el traspaso de informacion*/
const URL = "https://basedatos-alumnos-default-rtdb.firebaseio.com/"

/*CARGO LOS DATOS ALMACENADOS EN LA BASE DE DATOS DE FIREBASE.*/
const traer_datos_alumnos = async () =>{
    try {
        const response = await fetch(URL + "alumnos.json")
        const data = await response.json()
        let alumnos = await Object.keys(data).map(key =>({id:key,...data[key]}))
        return alumnos

    } catch (error) {
        console.log(error)
    }
}

/*LLAMO A ESTA FUNCION CUANDO DESEO CARGAR LOS DATOS DE UN NUEVO ALUMNO*/
const cargar_datos_alumnos = async (nombre, apellido, grado) => {
    try{
        const alumno = {
        // id:crypto.randomUUID(),
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        grado,
        presente: "indefinido"
    }

    const response = await fetch(URL + "alumnos.json", {
        method:"POST",
        body: JSON.stringify(alumno)
    })

    mensaje("El alumno fue cargado exitosamente","success","center")
    }
    catch (error) {
        console.log(error)
    }
    
}

/*LLAMO A ESTA FUNCION CUANDO DESEO BUSCAR LOS DATOS DE ALGUN ALUMNO EN PARTICULAR */
const buscar_datos_alumno = async (apellido, alumnos) => {
    /*LIMPIO LA PAGINA DE BUSQUEDAS ANTERIORES*/
    const appBuscar = document.getElementsByClassName("resultado-busqueda")[0];
        while (appBuscar.firstChild) {
            appBuscar.removeChild(appBuscar.firstChild);
            }
    /* CREO UNA VARIABLE PARA UTILIZAR COMO FLAG POR SI NO SE ENCUENTRAN RESULTADOS*/
    let alumnoEncontrado = 0
    alumnos.forEach(alumno => {
        if (alumno.apellido === apellido.toUpperCase()) {
            const appBuscar = document.getElementsByClassName("resultado-busqueda")[0]
            const element = document.createElement("div")
            element.className = "card"
            element.style = "width: 18rem"
            element.innerHTML = `
                                <img src="../assets/imagen-alumnos.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${alumno.nombre} ${alumno.apellido}</h5>
                                    <p class="card-text">El alumno va a ${alumno.grado} año</p>
                                    <p class="card-text">ID: ${alumno.id}</p>
                                </div>
                `
            appBuscar.append(element)
            alumnoEncontrado = 1
        }
    })
    if(alumnoEncontrado == 0){
       mensaje("No se encuentra ningun alumno con ese apellido en nuestra base de datos","warning","center")
    }

}

/*LLAMO A ESTA FUNCION CUANDO DESEO PASAR ASISTENCIA*/
const pasar_asistencia_alumnos = async (alumno) => {

    const appPasarLista = document.getElementById("app-pasarLista")
    const element = document.createElement("div")
    element.className = "card pasar_lista-edit"
    element.style = "width: 18rem"
    element.innerHTML = `
                        <img src="../assets/imagen-alumnos.jpg" class="card-img-top" alt="...">
                        <div class="card-body" id="${alumno.id}">
                            <h5 class="card-title"> ${alumno.nombre} ${alumno.apellido}</h5>
                            <p class="card-text">El alumno va a ${alumno.grado} año</p>
                            <p class="card-text" id="asistencia-${alumno.id}">Asistencia: ${alumno.presente}</p>
                            <button type="button" id="btn-presente-${alumno.id}" class="btn btn-dark btn-presente">Presente</button>
                            <button type="button" id="btn-ausente-${alumno.id}" class="btn btn-dark btn-ausente">Ausente</button>
                        </div>
                        `
    appPasarLista.append(element)
}

const alumno_presente = async (id) => {
    try {
        const response = await fetch(URL + `alumnos/${id}.json`)
        const alumno = await response.json()

        const alumno_actualizado = {
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            grado: alumno.grado,
            presente: "Presente"
        } 
    
        await fetch(URL + `alumnos/${id}.json`, {
            method:"PUT",
            body: JSON.stringify(alumno_actualizado)
        })

        const valorAsistencia = document.getElementById(`asistencia-${id}`)
        valorAsistencia.innerText = `Asistencia: ${alumno_actualizado.presente}`
        mensaje("La asistencia se modifico exitosamente","success","top-end")


    } catch (error) {
        console.log(error)
    }    

}

const alumno_ausente = async (id) => {
    try {
        const response = await fetch(URL + `alumnos/${id}.json`)
        const alumno = await response.json()

        const alumno_actualizado = {
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            grado: alumno.grado,
            presente: "Ausente"
        } 
    
        await fetch(URL + `alumnos/${id}.json`, {
            method:"PUT",
            body: JSON.stringify(alumno_actualizado)
        })

        const valorAsistencia = document.getElementById(`asistencia-${id}`)
        valorAsistencia.innerText = `Asistencia: ${alumno_actualizado.presente}`
        mensaje("La asistencia se modifico exitosamente","success","top-end")

    } catch (error) {
        console.log(error)
    }    

}

const mensaje = (title,icon,position) => {
    Swal.fire({
        title,
        icon, /* warning, error, success, info, and question*/
        toast:true,
        position,
        showConfirmButton: false,
        timer:3000

      })
}

const main = async () => {
    const alumnos = await traer_datos_alumnos()
    // const alumnos = Object.keys(data).map(key =>({id:key,...data[key]}))

    //CARGAMOS LA FUNCION A EJERCUTAR AL PRESIONAR EL BOTON CARGAR ALUMNO
    const btnCargarAlumno = document.getElementById("btn-cargarAlumno")
    if (btnCargarAlumno) {
        btnCargarAlumno.addEventListener("click", () => {
            const nombreAlumnoCargar = document.getElementById("nombreAlumno-cargar")
            const apellidoAlumnoCargar = document.getElementById("apellidoAlumno-cargar")
            const gradoAlumnoCargar = document.getElementById("gradoAlumno-cargar")
            cargar_datos_alumnos(nombreAlumnoCargar.value, apellidoAlumnoCargar.value, gradoAlumnoCargar.value)
            nombreAlumnoCargar.value = ""
            apellidoAlumnoCargar.value = ""
            gradoAlumnoCargar.value = 0
        })
    }

    //CARGARMOS LA FUNCION A EJERCUTAR AL PRESIONAR EL BOTON BUSCAR ALUMNO
    const btnBuscarAlumno = document.getElementById("btn-buscarAlumno")
    if (btnBuscarAlumno) {
        btnBuscarAlumno.addEventListener("click",async () => {
            const apellidoAlumnoBuscar = document.getElementById("apellidoAlumno-buscar")
            await buscar_datos_alumno(apellidoAlumnoBuscar.value, alumnos)
            apellidoAlumnoBuscar.value = ""
        })
    }

    const appPasarLista = document.getElementById("app-pasarLista")
    if (appPasarLista) {
        alumnos.forEach(async (alumno) => {
            await pasar_asistencia_alumnos(alumno)
        })
    
            appPasarLista.addEventListener("click",async (event)=>{
                if(event.target && event.target.classList.contains("btn-presente")){
                    const parentElement = event.target.parentElement
                    await alumno_presente(parentElement.id)
                    //location.reload()
                    
                }else if(event.target && event.target.classList.contains("btn-ausente")){
                    const parentElement = event.target.parentElement
                    await alumno_ausente(parentElement.id)
                }

             })
    }

}

main()
