
let entradasVIP = 0
let entradasGeneral = 0
function elegirEntrada(tipo) {
    Swal.fire({
        title: 'Seleccionar cantidad de entradas ' + tipo.toUpperCase(),
        imageUrl: '../static/imagenes/logosmall.png',
        width: 600,
        padding: '3em',
        html: `
                    <select id="cantidadEntradas" class="swal2-select bg-white text-center">
                        <option value="0">Ninguna</option>    
                        <option value="1">1 entrada</option>
                        <option value="2">2 entradas</option>
                        <option value="3">3 entradas</option>
                        <option value="4">4 entradas</option>
                        <option value="5">5 entradas</option>
                    </select>
                `,
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
        preConfirm: () => {
            const cantidadSeleccionada = document.getElementById('cantidadEntradas').value;
            if (tipo == "VIP") {
                entradasVIP = cantidadSeleccionada
                document.getElementById("cantidadVIP").innerHTML = entradasVIP
                document.getElementById("totalVIP").innerHTML = entradasVIP * 50
            }
            if (tipo == "GENERAL") {
                entradasGeneral = cantidadSeleccionada
                document.getElementById("cantidadGeneral").innerHTML = entradasGeneral
                document.getElementById("totalGeneral").innerHTML = entradasGeneral * 30
            }
            calcularTotal();
        }
    })
}

function calcularTotal() {
    total = entradasGeneral * 30 + entradasVIP * 50
    document.getElementById("total").innerHTML = "S/ " + total
}

function mostrarCampos() {
    if (!verificaMonto()) {
        Swal.fire({
            title: '¡Debe elegir por lo menos una entrada antes de continuar!',
            imageUrl: '../static/imagenes/logosmall.png',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(../static/imagenes/trees.png)',
        });
    }

}

function verificaMonto() {
    total_str = document.getElementById("total").innerHTML
    n = total_str.length
    total_int = parseInt(total_str.slice(3, n))
    if (total_int >= 30) return true;
    else return false;
}

function enviarCodigoSMS() {
    if (!longitudCelularValido()) return
    PopupCargando();
    $.ajax({
        type: 'POST',
        url: '/comprar/',
        data: {
            'Comando': 'EnviarSMS',
            'celular': $('#inputCelular').val(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            if (response.Estado == "Valido") {
                Swal.fire({
                    title: 'Ingresa el codigo de validacion',
                    imageUrl: '../static/imagenes/logosmall.png',
                    text: 'Un mensaje ha sido enviado con el codigo de validacion',
                    input: 'number',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(../static/imagenes/trees.png)',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: (OTP) => {
                        if (OTP == "123456") {

                        }
                        // return fetch(`//api.github.com/users/${login}`)
                        //     .then(response => {
                        //         if (!response.ok) {
                        //             throw new Error(response.statusText)
                        //         }
                        //         return response.json()
                        //     })
                        //     .catch(error => {
                        //         Swal.showValidationMessage(
                        //             `Request failed: ${error}`
                        //         )
                        //     })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: `${result.value.login}'s avatar`,
                            imageUrl: result.value.avatar_url
                        })
                    }
                })
            }
            else {
                // PopupMensaje("error",
                //     "Algo salio mal", "Refresque la pagina e intente de nuevo")
            }

        },
        error: function (xhr, status, error) {
            SMSenviado = false;
            onetimeenviarsms = false
            console.error('Error:', error);
            PopupMensaje("error",
                "Algo salio mal", "error")
        }
    });



}

function longitudCelularValido() {
    celular = document.getElementById("inputCelular").value
    if (celular.length != 9) {
        Swal.fire({
            title: '¡El celular debe tener 9 digitos!',
            imageUrl: '../static/imagenes/logosmall.png',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(../static/imagenes/trees.png)',
        });
        return false
    }
    return true
}

function PopupCargando() {
    Swal.close()
    Swal.fire({
        title: 'Cargando...',
        imageUrl: '../static/imagenes/logosmall.png',
        allowOutsideClick: false,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
        didOpen: () => {
            Swal.showLoading();
        },
        showConfirmButton: false,
        showCancelButton: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    });
}