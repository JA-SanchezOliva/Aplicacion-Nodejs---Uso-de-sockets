const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        // Valido si hay tickets pendientes
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        // Tomo el número del primer ticket que esta pendiente
        let numeroTicket = this.tickets[0].numero;
        // Una vez obtenido el primer ticket elimino el primer ticket del arreglo
        this.tickets.shift();
        // Declaro una instancia de un nuevo ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        // Coloco el ticket que tengo en la variable atender ticket al únicio del arreglo
        this.ultimos4.unshift(atenderTicket);
        // Valido que el arreglo últimos cuatro solo tenga cuatro tickets dentro
        if (this.ultimos4.length > 4) {
            //Borro el último elemento del arreglo
            this.ultimos4.splice(-1, 1);
        }
        console.log('Últimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }
}


module.exports = {
    TicketControl
}