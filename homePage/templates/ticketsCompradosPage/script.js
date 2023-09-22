
function download(cadena) {
    console.log(cadena.toString())
}


function download2(cadena, contador) {
    window.scrollTo(0, 0);
    swalMensaje("Su descarga iniciara en breve")
    var url = document.getElementById('download' + cadena.toString()).getAttribute('data-url');
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
                filename: cadena + ".pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'px', format: [1600, 800], orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
        }
    };
    xhr.send();
}