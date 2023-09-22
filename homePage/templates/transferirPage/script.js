function enviarFormulario() {
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/administrar/',
        data: {
            'comando': 'generarTransferencia',
            'numeroEntrada': document.getElementById("inputEntrada").value,
            'dni': document.getElementById('inputDNI').value,
            'celular': document.getElementById("inputCelular").value,
            'pin': document.getElementById("inputPIN").value,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            swalTituloMensaje(response.titulo, response.mensaje)
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    });
}

function filtrarNumeros(str) {
    var p = document.getElementById(str)
    var p_on = ''
    for (var i = 0; i < p.value.length; i++) {
        if (('0' <= p.value[i] && p.value[i] <= '9') || p.value[i] == '-') p_on += p.value[i]
    }
    p.value = p_on
    if (p.value.length == 6) p.value = p.value + '-'
}

function filtrarNumeros2(str) {
    var p = document.getElementById(str)
    var p_on = ''
    for (var i = 0; i < p.value.length; i++) {
        if (('0' <= p.value[i] && p.value[i] <= '9')) p_on += p.value[i]
    }
    p.value = p_on
}