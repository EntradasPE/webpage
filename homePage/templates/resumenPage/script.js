
function PopupCargando() {
    Swal.close()
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        showConfirmButton: false,
        showCancelButton: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    });
}

function PopupMensaje(Icono, Titulo, Mensaje) {
    Swal.close()
    Swal.fire({
        icon: Icono,
        title: Titulo,
        text: Mensaje
    });
}

var Minutos = 10
var Segundos = 0
function DisminuirTimeout() {
    Segundos = Segundos - 1
    if (Segundos <= -1 && Minutos > 0) {
        Segundos = 59
        Minutos = Minutos - 1
    } else if (Segundos <= -1 && Minutos <= 0) {
        return;
    }
    document.getElementById("timeout").innerText = Minutos.toString().padStart(2, '0') + ":" + Segundos.toString().padStart(2, '0')

}
setInterval(DisminuirTimeout, 1000);

var precioEntradasTipoResumen = new Array(6)

window.onbeforeunload = function () {
    location.reload(true);
}

function copiarAlPortapapeles(texto) {
    var elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = texto;

    // Asegurarse de que el elemento esté fuera de la vista
    elementoTemporal.style.position = 'absolute';
    elementoTemporal.style.left = '-9999px';

    document.body.appendChild(elementoTemporal);
    elementoTemporal.select();
    document.execCommand('copy');
    document.body.removeChild(elementoTemporal);


    alert('Texto copiado al portapapeles: ' + texto);
}

function confirmar() {
    // document.getElementById("boton").value = "confirmarCompra"
    // document.getElementById("comprarForm").submit()
    PopupCargando()
    location.reload(true)

}

function donwload(cadena) {
    console.log(cadena.toString())
}

function confirmarPre() {
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/comprar/',  // Reemplaza esto con la URL de tu vista de Django
        data: {
            'comando': 'confirmarCompra',
            'cip': $('#cip').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            if (response.estado == "Confirmado") {
                PopupMensaje("success", "Confirmado", "Sus entradas han sido reservadas exitosamente")
                document.getElementById("columnaPago").style.display = "grid"
                document.getElementById("containerConfirmarCancelar").style.display = "none"
                document.getElementsByClassName("TimerClass")[0].style.display = "none";
            }
            if (response.estado == "Timeout") {
                PopupMensaje("warning", "Alerta", "Se acabo su tiempo de espera")
                location.reload(true)
            }
            console.log(response)
        },
        error: function (xhr, status, error) {
            PopupMensaje("error", "Algo salio mal", error)
            console.error('Error:', error);
        }
    });
}

function cancelarPre() {
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/comprar/',  // Reemplaza esto con la URL de tu vista de Django
        data: {
            'comando': 'cancelarCompra',
            'cip': $('#cip').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            if (response.estado == "Cancelado") {
                PopupMensaje("info", "Confirmado", "Sus entradas han sido canceladas correctamente")
                location.reload(true)
            }
        },
        error: function (xhr, status, error) {
            PopupMensaje("error", "Algo salio mal", error)
            console.error('Error:', error);
        }
    });
}
