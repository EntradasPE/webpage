function ActivacionBotonComprar() {
    document.getElementById('descarga').value = document.getElementById('descarga').value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    document.getElementById('pin').value = document.getElementById('pin').value.replace(/\D/g, '');
    // document.getElementById('celular').setAttribute('value', document.getElementById('celular').value.replace(/\D/g, ''))
}
setInterval(ActivacionBotonComprar, 100);

function consultarTicket() {
    PopupCargando();
    $.ajax({
        type: 'POST',
        url: '/qr',
        data: {
            'comando': 'verificar',
            'ticket': document.getElementsByName("ticket")[0].value,
            'descarga': document.getElementsByName("descarga")[0].value,
            'pin': document.getElementsByName("pin")[0].value,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            if (response.Estado == "Valido") {
                download2(response.Pagina)
                Swal.close()
            }
            else swalMensaje(
                `Error: Codigo inválido`
            )

        },
        error: function (xhr, status, error) {
            swalMensaje(
                `Error: Algo salio mal, actualice la pagina`
            )
        }
    })
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

function download(cadena) {
    console.log(cadena.toString())
}


function download2(cadena, contador) {
    var url = '/descargar_boletoQREncriptado/' + cadena
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
            iframeDocument.querySelector('style').textContent += '@page { size: 1600px 830px; }';
            var element = iframeDocument.body;
            var opt = {
                margin: 1,
                filename: document.getElementsByName("ticket")[0].value + ".pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'px', format: [1600, 900], orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
        }
    };
    xhr.send();
}