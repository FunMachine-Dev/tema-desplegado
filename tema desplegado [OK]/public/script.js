//Estos script muestran el contenido de los respectivos archivos .json en sus secciones
//Se asocia la sección con el ID y el archivo .json respectivo
//Al actualizar la página se extrae el contenido del .json y se muestra en la sección correspondiente

//Actualiza imagen logo
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-logo.json', function (data) {
        $('#imagen-logo').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-logo').val('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido del "titulo HERO"
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-hero.json', function (data) {
        $('#titulo-hero').text(data.content);
    }).fail(function () {
        $('#titulo-hero').text('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'texto hero'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-hero.json', function (data) {
        $('#texto-hero').text(data.content);
    }).fail(function () {
        $('#texto-hero').text('No se pudo cargar el contenido.');
    });
});

//Actualiza imagen hero
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-hero.json', function (data) {
        $('#imagen-hero').attr('src', '/' + data.content);//ojo con la ruta porque es diferente en el index y en el panel (porque el panel está dentro de "admin")
    }).fail(function () {
        $('#imagen-hero').val('No se pudo cargar el contenido.');
    });
});

//Actualiza img mas info
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-mas-info.json', function (data) {
        $('#imagen-mas-info').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-mas-info').val('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'titulo seccion 1'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-seccion1.json', function (data) {
        $('#titulo-seccion1').text(data.content);
    }).fail(function () {
        $('#titulo-seccion1').text('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'texto seccion 1'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-seccion1.json', function (data) {
        $('#texto-seccion1').text(data.content);
    }).fail(function () {
        $('#texto-seccion1').text('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'titulo servicios'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-servicios.json', function (data) {
        $('#titulo-servicios').text(data.content);
    }).fail(function () {
        $('#titulo-servicios').text('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'texto servicios'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-servicios.json', function (data) {
        $('#texto-servicios').text(data.content);
    }).fail(function () {
        $('#texto-servicios').text('No se pudo cargar el contenido.');
    });
});

//Actualiza img serv1
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-serv1.json', function (data) {
        $('#imagen-servicios1').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-servicios1').val('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'titulo servicios1'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-servicios1.json', function (data) {
        $('#titulo-servicios1').text(data.content);
    }).fail(function () {
        $('#titulo-servicios1').text('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'texto servicios1'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-servicios1.json', function (data) {
        $('#texto-servicios1').text(data.content);
    }).fail(function () {
        $('#texto-servicios1').text('No se pudo cargar el contenido.');
    });
});

//Actualiza img serv2
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-serv2.json', function (data) {
        $('#imagen-servicios2').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-servicios2').val('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'titulo servicios2'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-servicios2.json', function (data) {
        $('#titulo-servicios2').text(data.content);
    }).fail(function () {
        $('#titulo-servicios2').text('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'texto servicios2'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-servicios2.json', function (data) {
        $('#texto-servicios2').text(data.content);
    }).fail(function () {
        $('#texto-servicios2').text('No se pudo cargar el contenido.');
    });
});

//Actualiza img serv3
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-serv3.json', function (data) {
        $('#imagen-servicios3').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-servicios3').val('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'titulo servicios3'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-servicios3.json', function (data) {
        $('#titulo-servicios3').text(data.content);
    }).fail(function () {
        $('#titulo-servicios3').text('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'texto servicios3'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-servicios3.json', function (data) {
        $('#texto-servicios3').text(data.content);
    }).fail(function () {
        $('#texto-servicios3').text('No se pudo cargar el contenido.');
    });
});


//Actualiza img serv4
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/imagen-serv4.json', function (data) {
        $('#imagen-servicios4').attr('src', '/' + data.content);
    }).fail(function () {
        $('#imagen-servicios4').val('No se pudo cargar el contenido.');
    });
});


// Obtener el contenido de la sección 'titulo servicios4'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/titulo-servicios4.json', function (data) {
        $('#titulo-servicios4').text(data.content);
    }).fail(function () {
        $('#titulo-servicios4').text('No se pudo cargar el contenido.');
    });
});

// Obtener el contenido de la sección 'texto servicios4'
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/texto-servicios4.json', function (data) {
        $('#texto-servicios4').text(data.content);
    }).fail(function () {
        $('#texto-servicios4').text('No se pudo cargar el contenido.');
    });
});

//Mostrar el mapa
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/link-maps.json', function (data) {
        $('#mapa').attr('src', data.content);
    }).fail(function () {
        $('#link-maps-textarea').val('No se pudo cargar el contenido.');
    });
});

//Actualizar btn de contacto
$(document).ready(function () {
    const whatsappLink = `https://api.whatsapp.com/send/?phone=569`;

    $.getJSON('https://test.genda.cl/content/wsp.json', function (data) {
        $('#wsp-link').attr('href', whatsappLink + data.content);
        $('#telefono').text(data.content);
    }).fail(function () {
        $('#wsp-link').val('No se pudo cargar el contenido.');
    });
});

//Actualizar agenda calendly
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/link-calendly.json', function (data) {
        $('#agenda-section').html(data.content);
    }).fail(function () {
        $('#agenda-section').val('No se pudo cargar el contenido.');
    });
});

// actualizar la direccion
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/direccion.json', function (data) {
        $('#direccion').text(data.content);
    }).fail(function () {
        $('#direccion').text('No se pudo cargar el contenido.');
    });
});

// actualizar mail
$(document).ready(function () {
    $.getJSON('https://test.genda.cl/content/mail.json', function (data) {
        $('#mail').text(data.content);
    }).fail(function () {
        $('#mail').text('No se pudo cargar el contenido.');
    });
});

//Actualiza el insta
$(document).ready(function () {
    
    $.getJSON('https://test.genda.cl/content/link-insta.json', function (data) {
        $('#insta').attr('href', data.content);
    }).fail(function () {
        $('#insta').val('No se pudo cargar el contenido.');
    });
});

//Actualiza el face
$(document).ready(function () {
    
    $.getJSON('https://test.genda.cl/content/link-face.json', function (data) {
        $('#face').attr('href', data.content);
    }).fail(function () {
        $('#face').val('No se pudo cargar el contenido.');
    });
});


//Inicio de sesión
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://test.genda.cl/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        window.open("admin/panel_admin.html", "_blank"); // Abre en una nueva pestaña
        location.reload(); // Recarga la página actual
    } else {
        document.getElementById("message").innerText = data.message;
    }
}
