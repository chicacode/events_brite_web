// Instanciar Clases para mostrar
const eventbrite = new EventBrite();
const ui = new Interfaz();

// Listener al buscador

document.getElementById('buscarBtn').addEventListener('click', (e) =>{
    e.preventDefault();

    // Leer el texto de Input buscar
    const textoBuscador = document.getElementById('evento').value;

   // Leer select
    const categorias = document.getElementById('listado-categorias');
    const categoriaSeleccionada = categorias.options[categorias.selectedIndex].value;

    // Revisar que haya algo escrito en buscador, hacerl obligatorio
    if(textoBuscador !== ''){
       // Aqui se hace las consultas a los eventos SI hay busqueda
        eventbrite.obtenerEventos(textoBuscador, categoriaSeleccionada)
            .then(eventos => {
                if(eventos.eventos.events.length > 0){
                    //Si hay eventos mostrar
                    ui.limpiarResult();
                    ui.mostrarEventos(eventos.eventos);
                    
                }else{
                    // No hay eventos enviar un alerta
                    ui.mostrarMensaje('No hay resultados', 'alert alert-warning mt-4');
                }
            })
            .catch(error => ui.mostrarMensaje('Hay un error 500 en Servidor de Event Brite, imposible obtener resultados', 'alert alert-danger mt-4') );

    }else{
        // Mostrando error si el campo esta vacio
        ui.limpiarResult();
        ui.mostrarMensaje('Escribe algo en buscador', 'alert alert-danger mt-4');

    }
        
})