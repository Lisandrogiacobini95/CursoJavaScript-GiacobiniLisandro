const alumnos = []

let opcion_ingresada;
let cantidad_alumnos;


function main(){
    opcion_ingresada = prompt("Hola, bienvenidos a tu agenda docente. Selecciona una de las siguientes opciones \n 1- Pasar Lista\n 2- Cargar Alumno\n 3- Buscar Alumno\n DEBE INGRESAR EL NUMERO CORRESPONDIENTE A CADA OPCION")
    if( (0 < opcion_ingresada) && (opcion_ingresada < 4)){
        if(opcion_ingresada == 1){
            console.log(opcion_ingresada)
        }
        else if(opcion_ingresada == 2){
            console.log(opcion_ingresada)
        }
        else if(opcion_ingresada == 3){
            console.log(opcion_ingresada)
        }   
    }
    else{
        alert("LA OPCION INGRESADA NO ES CORRECTA")
    }
}

function cargar_alumno(nombre,apellido,grado){

}

main()
