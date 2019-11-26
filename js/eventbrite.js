class EventBrite{
    constructor(){
        this.token_auth = 'LDZX5XINQVBXI54D2BME';
        this.ordenar = 'date';
        
    }
    // Mostrar resultados de la busqueda
    async obtenerEventos(evento, categoria){
        const respuestaEvento = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${evento}&sort_by=${this.ordenar}&categories=${categoria}&token=${this.token_auth}`);

        // codigo esperar la respuesta del evento y enviarlo como json
        const eventos = await respuestaEvento.json();
        return {
            eventos
        }
    }


    // Método que obtiene las categorias
    async obtenerCategorias(){
        // consultar las categorias a la REST API de event brite
        const respuestaCategorias = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);

        // Esperar las respuestas de las categorias y devolver JSON
        const categorias = await respuestaCategorias.json();

        //  Devolver el resultado para que se muestre en interface
        return{
            categorias
        }
    }
}//https://www.eventbriteapi.com/v3/users/me/?token=
