

let entradasVIP = 0
let entradasGeneral = 0
let celular = 0
let dni = 0
let nombre = ""
let apellido = ""
let pin = 0
let correo = ""
let pregunta1 = "1"
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
                document.getElementById("cantidadVIP2").innerHTML = entradasVIP

            }
            if (tipo == "GENERAL") {
                entradasGeneral = cantidadSeleccionada
                document.getElementById("cantidadGeneral").innerHTML = entradasGeneral
                document.getElementById("cantidadGeneral2").innerHTML = entradasGeneral
            }
            calcularTotal();
        }
    })
}

function calcularTotal() {
    document.getElementById("totalVIP").innerHTML = entradasVIP * 50
    document.getElementById("totalGeneral").innerHTML = entradasGeneral * 30
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
    document.getElementsByClassName("fa-minus-circle")[0].onclick = ""
    document.getElementsByClassName("fa-minus-circle")[1].onclick = ""
    document.getElementsByClassName("fa-plus-circle")[0].onclick = ""
    document.getElementsByClassName("fa-plus-circle")[1].onclick = ""

}

function verificaMonto() {
    total_str = document.getElementById("total").innerHTML
    n = total_str.length
    total_int = parseInt(total_str.slice(3, n))
    if (total_int >= 30) return true;
    else return false;
}

function enviarCodigoSMS(event) {
    filtrarNumeros('inputCelular')
    var p = $('#inputCelular').val();
    if (event.key != "Enter" && p.length != 9) return;
    if (!longitudCelularValido()) return
    celular = $('#inputCelular').val();
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
                    title: 'Verifique que la pagina web sea www.entradaspe.com',
                    imageUrl: '../static/imagenes/logosmall.png',
                    width: 600,
                    padding: '0em',
                    color: '#716add',
                    background: '#fff url(../static/imagenes/trees.png)',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    html:
                        `<p class="h5">Ingrese el código enviado a su celular ${celular.toString()}</p>` +
                        '<div class=col-12 d-flex>' +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input1" onkeyup="opt('input1',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input2" onkeyup="opt('input2',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input3" onkeyup="opt('input3',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input4" onkeyup="opt('input4',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input5" onkeyup="opt('input5',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input6" onkeyup="opt('input6',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input7" onkeyup="opt('input7',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        `<input type="text" class="swal2-input col-1 p-0 m-0 bg-white" id="input8" onkeyup="opt('input8',event)" inputmode="numeric" maxlength="1" style="text-align: center;">` +
                        '</div>',
                    customClass: {
                        input: 'form-control text-center bg-white d-flex' // Aquí puedes definir tu clase personalizada
                    },
                    preConfirm: () => {
                        var OTP = ''
                        for (var i = 1; i <= 8; i++) OTP += document.getElementById('input' + i).value
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

function opt(str, event) {
    p = document.getElementById(str)
    if (event.key == 'Tab') return
    if (event.key == 'Enter') return
    if (event.key == 'Backspace') {
        if (str == "input1") return;

    }
    if (event.key < '0' || '9' < event.key) {
        p.value = ''; return;
    }
    else {
        p.value = event.key
        const newevent = new KeyboardEvent('keydown', {
            key: 'Tab',
            code: 'Tab',
            which: 9,
            keyCode: 9,
            bubbles: true,
        });

        p.dispatchEvent(newevent);
    }

}

function filtrarNumeros(str) {
    var p = document.getElementById(str)
    var p_on = ''
    for (var i = 0; i < p.value.length; i++) {
        if ('0' <= p.value[i] && p.value[i] <= '9') p_on += p.value[i]
    }
    p.value = p_on
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
        padding: '0em',
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

function verificarDNI(event) {
    var p = $('#inputDNI').val();
    filtrarNumeros('inputDNI')
    if (event.key != "Enter" && p.length != 8) return;
    if (!longitudDNIvalido()) {
        return;
    }
    dni = $('#inputDNI').val();
    const codigoVerificacion = calculaCodigoVerificacion(dni)
    Swal.fire({
        title: 'Ingresa el dígito de verificación',
        imageUrl: '../static/imagenes/logosmall.png',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        html:
            `<p class="h5">Ingrese el codigo unico de verificacion de su DNI</p>` +
            '<div class=col-12 d-flex justify-content-center>' +
            `<input type="text" class="swal2-input col-1 p-0 m-0 mx-1 bg-white" id="input11" inputmode="numeric" maxlength="1" style="width: 2em; text-align: center;">` +
            '</div>',
        preConfirm: () => {
            return new Promise((resolve) => {
                d = document.getElementById("input11").value
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
            document.getElementById("containerPIN").style = "display: block!important"
            document.getElementById("buttonPagar").disabled = false
            document.getElementById("buttonOpcionales").disabled = false
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
    if (!validarNombrePin()) return
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
            if (response.Estado == "Valido") {
                window.location.href = "/resumen";
            }
            else swalMensaje(response.Mensaje)
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    })

}

function validarNombrePin() {
    nombre = document.getElementById("inputNombre").value
    apellido = document.getElementById("inputNombre").value
    pin = document.getElementById("inputPIN").value
    if (nombre.length < 2) {
        swalMensaje("¡Debe ingresar un nombre valido!")
        return false
    }
    if (pin.length < 6 || 10 < pin.length) {
        swalMensaje("¡El pin debe tener de 6 a 10 digitos!")
        return false
    }
    for (var i = 0; i < pin.length - 3; i++) {
        x = parseInt(pin[i])
        y = parseInt(pin[i + 1])
        z = parseInt(pin[i + 2])
        if (x == y && y == z) {
            swalMensaje(`¡El pin no puede tener 3 numeros repetidos! "${x}${y}${z}"`)
            return false
        }
        if (x + 2 == y + 1 && y + 1 == z) {
            swalMensaje(`¡El pin no puede tener 3 numeros consecutivos! "${x}${y}${z}"`)
            return false
        }
        if (x - 2 == y - 1 && y - 1 == z) {
            swalMensaje(`¡El pin no puede tener 3 numeros consecutivos! "${x}${y}${z}"`)
            return false
        }
    }
    return true
}

function verificarPIN() {
    pin = document.getElementById("inputPIN").value;
    if (pin.length < 6) {
        document.getElementById("pinHelpMessage").textContent = "El PIN debe tener al menos 6 dígitos.";
        return;
    }
    for (var i = 0; i < pin.length - 1; i++) {
        var currentDigit = parseInt(pin.charAt(i));
        var nextDigit = parseInt(pin.charAt(i + 1));
        if (currentDigit + 1 === nextDigit || currentDigit - 1 === nextDigit) {
            document.getElementById("pinHelpMessage").textContent = "El PIN no puede contener números consecutivos.";
            return;
        }
        if (currentDigit === nextDigit) {
            document.getElementById("pinHelpMessage").textContent = "El PIN no puede contener números repetidos.";
            return;
        }
    }
    document.getElementById("pinHelpMessage").textContent = "";
}

function convertirMayusculas(str) {
    var p = document.getElementById(str);
    p.value = p.value.toUpperCase();
}

function cambiaEntradas(str) {
    if (str == "vip-") {
        var p = parseInt(document.getElementById("cantidadVIP").innerHTML)
        if (p <= 0) p = 0
        else p--
        entradasVIP = p
        document.getElementById("cantidadVIP").innerHTML = p
        document.getElementById("cantidadVIP2").innerHTML = p
    }
    else if (str == "vip+") {
        var p = parseInt(document.getElementById("cantidadVIP").innerHTML)
        if (p >= 5) p = 5
        else p++
        entradasVIP = p
        document.getElementById("cantidadVIP").innerHTML = p
        document.getElementById("cantidadVIP2").innerHTML = p
    }
    else if (str == "general-") {
        var p = parseInt(document.getElementById("cantidadGeneral").innerHTML)
        if (p <= 0) p = 0
        else p--
        entradasGeneral = p
        document.getElementById("cantidadGeneral").innerHTML = p
        document.getElementById("cantidadGeneral2").innerHTML = p

    }
    else if (str == "general+") {
        var p = parseInt(document.getElementById("cantidadGeneral").innerHTML)
        if (p >= 5) p = 5
        else p++
        entradasGeneral = p
        document.getElementById("cantidadGeneral").innerHTML = p
        document.getElementById("cantidadGeneral2").innerHTML = p
    }
    calcularTotal()
}

function verificarCorreoValido(str) {
    p = document.getElementById(str).value
    if (p == "") return
    var expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!expresionRegular.test(p.toString())) {
        swalMensaje(`¡Debe ingresar un correo valido!`)
    }
}

function agregarPregunta() {
    if (respuesta1 == "") {
        swalMensaje("Debe responder la pregunta antes de agregar otra")
        return
    }
    if (document.getElementById("containerR2").style.display != "grid") {
        var p = document.getElementById("inputP2");
        var optionToRemove = p.querySelector(`option[value="${pregunta1}"]`);
        if (optionToRemove) p.removeChild(optionToRemove);
        pregunta2 = p.value
        p = document.getElementById("inputP3");
        optionToRemove = p.querySelector(`option[value="${pregunta1}"]`);
        if (optionToRemove) p.removeChild(optionToRemove);
        document.getElementById("containerR2").style = "display: grid !important"
        document.getElementById("inputR1").disabled = true
        document.getElementById("inputP1").disabled = true
        return
    }
    if (respuesta2 == "") {
        swalMensaje("Debe responder la pregunta antes de agregar otra")
        return
    }
    var p = document.getElementById("inputP3");
    var optionToRemove = p.querySelector(`option[value="${pregunta2}"]`);
    if (optionToRemove) p.removeChild(optionToRemove);
    pregunta3 = p.value
    document.getElementById("inputR2").disabled = true
    document.getElementById("inputP2").disabled = true
    document.getElementById("containerR3").style = "display:grid!important"
    document.getElementById("buttonAgregarPregunta").style = "display:none!important"

}

function agregarOpcionales() {
    if (!validarNombrePin()) return
    document.getElementById("inputNombre").disabled = true
    document.getElementById("inputPIN").disabled = true
    document.getElementById("buttonPagar").disabled = true
    document.getElementById("buttonOpcionales").disabled = true
    document.getElementById("containerOpcional").style = "display:grid!important"
}

function generarCompra2() {
    var p = document.getElementById("inputCorreo").value
    var q = document.getElementById("inputCorreo").value
    var expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!expresionRegular.test(p.toString())) {
        swalMensaje(`¡Debe ingresar un correo valido!`)
        return
    }
    if (p != q) { swalMensaje("!Los correos no coinciden¡"); return }
    if (respuesta1 == "") { swalMensaje("!Debe ingresar una respuesta¡"); return }
    if (respuesta2 == "" && pregunta2 != "") { swalMensaje("!Debe ingresar una respuesta¡"); return }
    if (respuesta3 == "" && pregunta3 != "") { swalMensaje("!Debe ingresar una respuesta¡"); return }

    $.ajax({
        type: 'POST',
        url: '/comprar/',
        data: {
            'boton': 'comprar',
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
            'celular': celular,
            'pin': pin,
            'nombre': nombre,
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
            if (response.Estado == "Valido") {
                window.location.href = "/resumen";
            }
            else swalMensaje(response.Mensaje)
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    })

}