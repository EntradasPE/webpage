function cambiarImagenParaPantallaPequeña() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 500) {
        document.getElementById('banner-image').src = "static/homePage/images/bannercelular.jpg";
        document.getElementById('pContainer').style = "padding-left: 0%; padding-right: 0%;";
        document.getElementById('txtSearch1').style = "font-size: 1em;";
    }
    else if (screenWidth < 768) {
        document.getElementById('banner-image').src = "static/homePage/images/bannercelular.jpg";
        document.getElementById('pContainer').style = "padding-left: 2%; padding-right: 2%;";
        document.getElementById('txtSearch1').style = "font-size: 1em;";
    }
    else if (screenWidth < 1200) {
        document.getElementById('banner-image').src = "static/homePage/images/bannercelular.jpg";
        document.getElementById('pContainer').style = "padding-left: 5%; padding-right: 5%;";
        document.getElementById('txtSearch1').style = "font-size: 1em;";
    }
    else {
        document.getElementById('banner-image').src = "static/homePage/images/bannerpc.jpg";
        document.getElementById('pContainer').style = "padding-left: 15%; padding-right: 15%;";
        document.getElementById('txtSearch1').style = "font-size: 1.5em;";
    }

}
window.addEventListener('load', cambiarImagenParaPantallaPequeña);
window.addEventListener('resize', cambiarImagenParaPantallaPequeña);