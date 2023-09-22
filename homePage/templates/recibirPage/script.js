function enviarFormulario() {
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/administrar/',
        data: {
            'comando': 'verificarTransferencia',
            'codigoTransferencia': document.getElementById("inputCodigo").value,
            'dniTransferencia': document.getElementById('inputDNIa').value,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            if (response.estado == "Correcto") {
                swalTituloMensaje(response.titulo, response.mensaje)
                document.getElementById("containerPrimario").style = "display:none!important"
                document.getElementById("containerObligatorio").style = "display:grid!important;margin-top: 80px; margin-bottom: 80px;"

            }
            else {
                swalTituloMensaje(response.titulo, response.mensaje)
            }
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    });
}

function enviarFormulario2() {
    if (!validarNombrePin()) return
    PopupCargando()
    $.ajax({
        type: 'POST',
        url: '/administrar/',
        data: {
            'comando': 'transferirEntrada',
            'codigoTransferencia': document.getElementById("inputCodigo").value,
            'dniTransferencia': document.getElementById('inputDNIa').value,
            'celular': document.getElementById("inputCelular").value,
            'dni': document.getElementById("inputDNI").value,
            'nombre': document.getElementById("inputNombre").value,
            'pin': document.getElementById("inputPIN").value,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            Swal.close()
            if (response.estado == "Correcto") {
                swalTituloMensaje(response.titulo, response.mensaje)
                download2(response.url, response.nombre)

            }
            else {
                swalTituloMensaje(response.titulo, response.mensaje)
            }
        },
        error: function (xhr, status, error) {
            swalMensaje("Algo salio mal, intente nuevamente")
        }
    });
}

function download2(cadena, nombre) {
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
    var url = cadena;
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var iframeDocument = iframe.contentWindow.document;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            iframeDocument.open();
            iframeDocument.write(xhr.responseText);
            iframeDocument.close();
            iframeDocument.querySelector('style').textContent += '@page { size: 1600px 805px; }';
            var element = iframeDocument.body;
            var opt = {
                margin: 1,
                filename: nombre + ".pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'px', format: [1600, 800], orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
        }
    };
    xhr.send();
    Swal.close();
}