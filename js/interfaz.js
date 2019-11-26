class Interfaz {
    constructor(){
        // Inicializat la APP al instanciar
        this.init();
        // leer el resultado
        this.listado = document.getElementById('resultado-eventos');
    }

    // Método para inicializar APP
    init(){
        // Llamar la función de imprimir categorias de la REST API
        this.imprimirCategorias();
    }
    // Imprimir categorias consumir REST API
    imprimirCategorias(){
        const listaCategorias = eventbrite.obtenerCategorias()
            .then(categorias =>{
                const cats = categorias.categorias.categories;
                // Seleccionar el select de categorias
                const selectCategoria = document.getElementById('listado-categorias');

                // Recorremos el arreglo e imprimimos los options
                // De esta forma creamos en el DOM las categorias del Evento
                cats.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.appendChild(document.createTextNode(cat.name_localized));
                    selectCategoria.appendChild(option);
                })
            })
    }
    // Limpia los resi¡ultados previos
    limpiarResult(){
        this.listado.innerHTML = '';
    }
    // Lee la respuesta de la API e imprime result
    mostrarEventos(eventos){
        // Lee los eventos y los agrega a una variable
        const listaEventos =  eventos.events;
       // Recorrer los eventos y crear templates

        listaEventos.forEach(evento=>{
            this.listado.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card mb-5">
                            <img class="img-fluid mb-2" src="${evento.logo !==null ? evento.logo.url : ''}">
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="lead text-info">Información del Evento</p>
                                <p>${evento.description.text.substring(0,280)}...</p>

                                <span class="badge badge-primary">Capacidad: ${evento.capacity}</span>
                                <span class="badge badge-secondary">Capacidad: ${evento.start.local}</span>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">Comprar boletos </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    // Metodo para imprimir mensajes de errores y correctos
    mostrarMensaje(mensaje, clases){
        this.limpiarMensaje();
        const div = document.createElement('div');
        div.classList = clases; // Aqui se envian las clases para que tenga formato bootstrap
        // agregar texto
        div.appendChild(document.createTextNode(mensaje));
        // buscar un padre
        const divBuscador = document.querySelector('#buscador');
        divBuscador.appendChild(div);
        // Quitar el alert despues de 3 segundos
        setTimeout(()=>{
            this.limpiarMensaje();
        }, 3000);
    }

    // Desaparece el mensaje en caso de que existe
    limpiarMensaje(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
    }
}
