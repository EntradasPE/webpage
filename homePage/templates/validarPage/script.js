function filtrarNumeros(str) {
    var p = document.getElementById(str)
    var p_on = ''
    for (var i = 0; i < p.value.length; i++) {
        if (('0' <= p.value[i] && p.value[i] <= '9') || p.value[i] == '-') p_on += p.value[i]
    }
    p.value = p_on
    if (p.value.length == 6) p.value = p.value + '-'
}


function verificar() {
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/administrar/',  // Reemplaza esto con la URL de tu vista de Django
        data: {
            'comando': 'verificarBotonValidarTemplate',
            'ticket': $('#inputEntrada').val(),
            'apellido': $('#inputApellido').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            swalTituloMensaje(response.estado, response.mensaje)
        },
        error: function (xhr, status, error) {
            swalTituloMensaje("Algo salio mal, intente nuevamente")
        }
    });
}