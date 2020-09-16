var socket = io();

// Obtener los parametros enviados por el URL

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');
// Valido que exista el escritorio con la funcion has();
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});