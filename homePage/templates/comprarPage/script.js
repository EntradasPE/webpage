

let entradasVIP = 0
let entradasGeneral = 0
let celular = 0
let dni = 0
let nombre = ""
let apellido = ""
let pin = 0
let correo = ""
let pregunta1 = ""
let pregunta2 = ""
let pregunta3 = ""
let respuesta1 = ""
let respuesta2 = ""
let respuesta3 = ""
let box1 = 0
let box2 = 0
let box3 = 0

const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
const url = window.location.href;
const headers = new Headers({
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken
});
function elegirEntrada(tipo) {
    Swal.fire({
        title: 'Seleccionar cantidad de entradas ' + tipo.toUpperCase(),
        imageUrl: '../static/imagenes/logosmall.png',
        width: 600,
        padding: '3em',
        html: `
                    <select id="cantidadEntradas" class="form-select bg-white text-center">
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
        return
    }
    document.getElementById("buttonContinuar").disabled = true
    document.getElementById("containerObligatorio").style = "display: grid!important;"
    document.getElementById("buttonVIP").disabled = true
    document.getElementById("buttonGeneral").disabled = true
    document.getElementById("containerEscenario").style = "background-color: gray;"

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
    celular = $('#inputCelular').val(),
        PopupCargando();
    $.ajax({
        type: 'POST',
        url: '/comprar/',
        data: {
            'boton': 'sms',
            'celular': celular,
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
                        autocapitalize: 'on'
                    },
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(../static/imagenes/trees.png)',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    customClass: {
                        input: 'form-control text-center bg-white' // Aquí puedes definir tu clase personalizada
                    },
                    preConfirm: (OTP) => {
                        console.log(OTP)
                        return $.ajax({
                            type: 'POST',
                            url: '/comprar/',
                            data: {
                                'boton': 'verificar',
                                'celular': celular,
                                'codigo': OTP,
                                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
                            },
                            success: function (response) {
                                if (response.Estado == "Valido") {
                                    return response
                                }
                                Swal.showValidationMessage(
                                    `Error: Codigo inválido`
                                )
                            },
                            error: function (xhr, status, error) {
                                Swal.showValidationMessage(
                                    `Error: Algo salio mal, actualice la pagina`
                                )
                            }
                        })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Celular validado correctamente!',
                            imageUrl: '../static/imagenes/logosmall.png',
                            width: 600,
                            padding: '3em',
                            color: '#716add',
                            background: '#fff url(../static/imagenes/trees.png)',
                            showCancelButton: false,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            showLoaderOnConfirm: true,
                        })

                        document.getElementById("inputCelular").disabled = true
                        document.getElementById("containerDNI").style = "display: block!important"
                    }
                });
            }
            else {
                // PopupMensaje("error",
                //     "Algo salio mal", "Refresque la pagina e intente de nuevo")
            }

        },
        error: function (xhr, status, error) {
        }
    });



}

function longitudCelularValido() {
    celular = document.getElementById("inputCelular").value
    if (celular.length != 9) {
        swalMensaje("¡El numero de celular debe tener 9 digitos!")
        return false
    }
    return true
}

function swalMensaje(msg) {
    Swal.fire({
        title: msg,
        imageUrl: '../static/imagenes/logosmall.png',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
    });
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

function verificarDNI() {
    if (!longitudDNIvalido()) {
        return;
    }
    dni = $('#inputDNI').val();
    const codigoVerificacion = calculaCodigoVerificacion(dni)
    Swal.fire({
        title: 'Ingresa el dígito de verificación',
        imageUrl: '../static/imagenes/logosmall.png',
        text: 'Ingresa el código único de verificación de su DNI',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'on'
        },
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        customClass: {
            input: 'form-control text-center bg-white'
        },
        preConfirm: (d) => {
            return new Promise((resolve) => {
                if (d == codigoVerificacion) {
                    resolve();
                } else {
                    Swal.showValidationMessage('Error: Código inválido');
                    $('.swal2-confirm, .swal2-cancel').prop('disabled', false);
                }
            });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'DNI validado correctamente!',
                imageUrl: '../static/imagenes/logosmall.png',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(../static/imagenes/trees.png)',
                showCancelButton: false,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            });
            document.getElementById("inputDNI").disabled = true
            document.getElementById("containerNombre").style = "display: block!important"
            document.getElementById("containerApellido").style = "display: block!important"
            document.getElementById("containerPIN").style = "display: block!important"
            document.getElementById("buttonPagar").disabled = false
        }
    });
}


function longitudDNIvalido() {
    dni = document.getElementById("inputDNI").value
    if (dni.length != 8) {
        swalMensaje("¡El DNI debe tener 8 digitos!")
        return false
    }
    return true
}

function calculaCodigoVerificacion(dni) {
    var ruc = "10" + dni;
    var mult = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5];
    var suma = 0;
    for (var i = 0; i < mult.length; i++) {
        suma += mult[i] * parseInt(ruc.substring(ruc.length - (i + 1), ruc.length - i));
    }

    var value = 11 - (suma % 11);
    if (value >= 10)
        value = value % 10;
    if (!isNaN(value))
        return value;
    return "";
}

function generarCompra() {
    nombre = document.getElementById("inputNombre").value
    apellido = document.getElementById("inputNombre").value
    pin = document.getElementById("inputPIN").value
    if (nombre.length < 2) {
        swalMensaje("¡Debe ingresar un nombre valido!")
        return
    }
    if (apellido.length < 2) {
        swalMensaje("¡Debe ingresar un apellido valido!")
        return
    }
    if (pin.length < 6) {
        swalMensaje("¡El pin debe tener 6 digitos!")
        return
    }
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/comprar/',
        data: {
            'boton': 'comprar',
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
            'celular': celular,
            'pin': pin,
            'nombre': nombre,
            'apellido': apellido,
            'dni': dni,
            'correo': correo,
            'pregunta1': pregunta1,
            'respuesta1': respuesta1,
            'pregunta2': pregunta1,
            'respuesta2': respuesta1,
            'pregunta3': pregunta1,
            'respuesta3': respuesta1,
            'box1': box1,
            'box2': box1,
            'box3': box1,
            'cantidadEntradas1': entradasVIP,
            'cantidadEntradas2': entradasGeneral,
            'cantidadEntradas3': 0,
            'cantidadEntradas4': 0,
            'cantidadEntradas5': 0,
            'cantidadEntradas6': 0
        },
        success: function (response) {
            location.reload(true)
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    })

}
