/*CREO UN ARRAY DE OBJETOS DONDE SE GUARDARAN LOS DATOS DE CADA ALUMNO*/
const alumnos = []

/*VARIABLES AUXILIARES*/
let opcion_ingresada;
let continuar_programa = true;

/*LLAMO A ESTA FUNCION CUANDO DESEO CARGAR LOS DATOS DE UN NUEVO ALUMNO*/ 
function cargar_datos_alumno(nombre, apellido, grado) {
    const alumno = {
        nombre: nombre,
        apellido: apellido,
        grado: grado,
        presente: 0
    }
    alumnos.push(alumno)
}

/*LLAMO A ESTA FUNCION CUANDO DESEO BUSCAR LOS DATOS DE ALGUN ALUMNO EN PARTICULAR */
function buscar_datos_alumno(apellido) {
    for (const alumno of alumnos) {
        if(alumno.apellido === apellido){
            alert("NOMBRE: " + alumno.nombre + " APELLIDO: " + alumno.apellido + " GRADO: " + alumno.grado)
        }
    }
}

/*LLAMO A ESTA FUNCION CUANDO DESEO PASAR ASISTENCIA*/
function pasar_asistencia_alumnos(){
    for (const alumno of alumnos) {
        let presente = parseFloat(prompt("EL ALUMNO " + alumno.apellido +" "+ alumno.nombre + " ASISTIO A CLASE ?\n 1- PRESENTE\n 2- ENFERMO\n 3- AUSENTE"))
        /*CON EL SIGUIENTE WHILE, CONTROLO QUE LA OPCION INGRESADA CORRESPONDA A UN NUMERO DE LISTA DE OPCIONES
            SI ESTO SE CUMPLE, LE ASIGNA EL VALOR CORRESPONDIENTE AL ALUMNO */
        while((presente != 1) && (presente != 2) && (presente != 3)){
            alert("ERROR, EL VALOR INGRESADO NO CORRESPONDE A LA LISTA")
            presente = prompt("EL ALUMNO " + alumno.apellido +" "+ alumno.nombre + " ASISTIO A CLASE ?\n 1- PRESENTE\n 2- ENFERMO\n 3- AUSENTE")
        }
        alumno.presente = presente
    }
}


function main() {

    while (continuar_programa) {
        opcion_ingresada = prompt("Hola, bienvenidos a tu agenda docente. Selecciona una de las siguientes opciones \n 1- Pasar Asistencia\n 2- Cargar Alumno\n 3- Buscar Alumno\n DEBE INGRESAR EL NUMERO CORRESPONDIENTE A CADA OPCION")

        if (opcion_ingresada == 1) {
            pasar_asistencia_alumnos()
            continuar_programa = confirm("DESEA REALIZAR ALGO MAS ?")
        }
        else if (opcion_ingresada == 2) {
            const nombre = prompt("INGRESE EL NOMBRE DEL ALUMNO").toUpperCase()
            const apellido = prompt("INGRESE EL APELLIDO DEL ALUMNO").toUpperCase()
            const grado = prompt("INGRESE EL GRADO AL CUAL VA EL ALUMNO").toUpperCase()
            /*CON EL SIGUIENTE IF CONTROLO QUE TODOS LOS CAMPOS ESTEN COMPLETOS*/
            if((nombre && apellido && grado) == ""){
                alert("ERROR, NO PUEDE DEJAR CAMPOS VACIOS")
            }else{
                cargar_datos_alumno(nombre, apellido, grado)
            }
            continuar_programa = confirm("DESEA REALIZAR ALGO MAS ?")
        }
        else if (opcion_ingresada == 3) {
            const apellido = prompt("INGRESE EL APELLIDO DEL ALUMNO QUE DESEA BUSCAR").toUpperCase()
            /*CON EL SIGUIENTE IF CONTROLO QUE EL CAMPO DE BUSQUEDA ESTE COMPLETO*/
            if(apellido == ""){
                alert("ERROR, DEBE RELLENAR EL CAMPO")
            }else{
                buscar_datos_alumno(apellido)
            }
            continuar_programa = confirm("DESEA REALIZAR ALGO MAS ?")
        }
        /* SI PRESIONO CANCELAR, SALGO DEL PROGRAMA*/
        else if(opcion_ingresada == null){
            alert("HASTA LUEGO. VUELVA PRONTO ! ")
            continuar_programa = false
        }
        else {
            continuar_programa = confirm("LA OPCION INGRESADA NO ES CORRECTA, DESEA VOLVER A INTENTARLO ?")
        }
        console.log(opcion_ingresada)
    }
}

main()
