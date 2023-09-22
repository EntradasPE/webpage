function swalMensaje(msg) {
    Swal.fire({
        title: msg,
        imageUrl: '../static/imagenes/logosmall.png',
        imageWidth: 50,
        width: 600,
        padding: {
            top: '0em',
            right: '0em',
            bottom: '3em', // Agrega un padding de 2em en la parte inferior
            left: '0em',
        },
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
    });
}

function swalTituloMensaje(title, msg) {
    Swal.fire({
        title: title,
        text: msg,
        imageUrl: '../static/imagenes/logosmall.png',
        imageWidth: 50,
        width: 600,
        padding: {
            top: '0em',
            right: '0em',
            bottom: '3em',
            left: '0em',
        },
        color: '#716add',
        background: '#fff url(../static/imagenes/trees.png)',
    });
}


function PopupCargando() {
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