function consultarTicket() {
    PopupCargando();
    $.ajax({
        type: 'POST',
        url: '/qr',
        data: {
            'comando': 'verificar',
            'ticket': document.getElementById("inputEntrada").value,
            'descarga': document.getElementById("inputCodigo").value,
            'pin': document.getElementById("inputPIN").value,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) {
            Swal.close()
            if (response.Estado == "Valido") {
                swalTituloMensaje("Datos correctos", "Su descarga comenzara en breve")
                download2(response.Pagina)
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
                filename: document.getElementById("inputEntrada").value + ".pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'px', format: [1600, 900], orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
        }
    };
    xhr.send();
}