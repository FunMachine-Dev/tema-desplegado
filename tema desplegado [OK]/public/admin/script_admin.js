//Estos script aplican para los botones de guardar de la pagina de administrador
//Dan las acciones de guardar el contenido de los textarea en los respectivos archivos .json



//script imagen logo
$(document).ready(function () {
    $('#save-logo').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-upload-logo')[0].files[0];
        let section = "imagen-logo";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-logo"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                       location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});



//script titulo hero
$(document).ready(function () {
    $('.save-btn1').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-hero-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                     location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto hero
$(document).ready(function () {
    $('.save-btn2').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-hero-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor
        var message = $('#message'); // Usamos jQuery para acceder al mensaje

        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {

            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});


/*SUBIR IMAGEN HERO (con IA)
$(document).ready(function () {
    $('#save-imagen-hero').click(function (event) {
        event.preventDefault();
        let file = $('#image-upload')[0].files[0];
 
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
 
        let section = $('#save-imagen-hero').data('section'); // Obtener el valor de data-section
        console.log("Sección enviada:", section); // Verificar en consola del navegador
        
        $.ajax({
            url: 'http://localhost:3000/delete-images',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ section }),
            success: function () {
                console.log("Todas las imágenes han sido eliminadas.");
 
                let formData = new FormData();
                formData.append('image', file);
                formData.append('section', section); // Enviar sección al backend
 
                $.ajax({
                    url: 'http://localhost:3000/upload-image',
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        alert("Imagen subida correctamente.");
                        
                        let imageUrl = response.imageUrl;
 
                        $.ajax({
                            url: 'http://localhost:3000/update-content',
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({ section, content: imageUrl }),
                            success: function () {
                                alert("URL guardada correctamente.");
                            },
                            error: function () {
                                alert("Error al guardar la URL de la imagen.");
                            }
                        });
                    },
                    error: function () {
                        alert("Error al subir la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al eliminar las imágenes.");
            }
        });
    });
});*/



/*/script imagen hero que funciona (borrando anteriores)
$(document).ready(function () {
    $('#save-imagen-hero').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-upload')[0].files[0];
        let section = "imagen-hero";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }

        // Primero, eliminar todas las imágenes en el servidor
        $.ajax({
            url: 'http://localhost:3000/delete-images',
            method: 'POST',
            success: function () {
                console.log("Todas las imágenes han sido eliminadas.");

                let formData = new FormData();
                formData.append('image', file);
                formData.append('section', section); // Enviar sección al backend

                // Subir la nueva imagen al servidor
                $.ajax({
                    url: 'http://localhost:3000/upload-image',
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        alert("Imagen subida correctamente.");

                        let imageUrl = response.imageUrl;
                        let section = "imagen-hero"; // nombre que recibe el .json

                        // Guardar la nueva URL en el JSON
                        $.ajax({
                            url: 'http://localhost:3000/update-content',
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({ section, content: imageUrl }),
                            success: function () {
                                alert("URL guardada correctamente.");
                            },
                            error: function () {
                                alert("Error al guardar la URL de la imagen.");
                            }
                        });
                    },
                    error: function () {
                        alert("Error al subir la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al eliminar las imágenes.");
            }
        });
    });
});*/

//script imagen HERO
$(document).ready(function () {
    $('#save-imagen-hero').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-upload-hero')[0].files[0];
        let section = "imagen-hero";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-hero"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                       location.reload(); // Recarga la página 
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});

//script imagen mas info
$(document).ready(function () {
    $('#save-imagen-info').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-upload-info')[0].files[0];
        let section = "imagen-mas-info";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-mas-info"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                        location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});

//script titulo seccion 1
$(document).ready(function () {
    $('.save-btn3').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-seccion1-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto seccion 1
$(document).ready(function () {
    $('.save-btn4').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-seccion1-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});


//script titulo servicios
$(document).ready(function () {
    $('.save-btn5').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-servicios-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto servicios
$(document).ready(function () {
    $('.save-btn6').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-servicios-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script imagen serv1
$(document).ready(function () {
    $('#save-serv1').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-serv1')[0].files[0];
        let section = "imagen-serv1";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-serv1"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                        location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});

//script titulo servicios1
$(document).ready(function () {
    $('.save-btn7').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-servicios1-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto servicios1
$(document).ready(function () {
    $('.save-btn8').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-servicios1-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});


//script imagen serv2
$(document).ready(function () {
    $('#save-serv2').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-serv2')[0].files[0];
        let section = "imagen-serv2";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-serv2"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                       location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});

//script titulo servicios2
$(document).ready(function () {
    $('.save-btn9').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-servicios2-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto servicios2
$(document).ready(function () {
    $('.save-btn10').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-servicios2-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script imagen serv3
$(document).ready(function () {
    $('#save-serv3').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-serv3')[0].files[0];
        let section = "imagen-serv3";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-serv3"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                        location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});


//script titulo servicios3
$(document).ready(function () {
    $('.save-btn11').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-servicios3-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto servicios3
$(document).ready(function () {
    $('.save-btn12').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-servicios3-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});


//script imagen serv4
$(document).ready(function () {
    $('#save-serv4').click(function (event) {
        event.preventDefault(); // Evita que el botón provoque un submit
        let file = $('#image-serv4')[0].files[0];
        let section = "imagen-serv4";
        if (!file) {
            alert("Selecciona una imagen primero.");
            return;
        }
        let formData = new FormData();
        formData.append('image', file);
        formData.append('section', section); // Enviar sección al backend

        // Subir la nueva imagen al servidor
        $.ajax({
            url: 'https://test.genda.cl/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Imagen subida correctamente.");

                let imageUrl = response.imageUrl;
                let section = "imagen-serv4"; // nombre que recibe el .json

                // Guardar la nueva URL en el JSON
                $.ajax({
                    url: 'https://test.genda.cl/update-content',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ section, content: imageUrl }),
                    success: function () {
                        location.reload(); // Recarga la página
                    },
                    error: function () {
                        alert("Error al guardar la URL de la imagen.");
                    }
                });
            },
            error: function () {
                alert("Error al subir la imagen.");
            }
        });
    });
});

//script titulo servicios4
$(document).ready(function () {
    $('.save-btn13').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#titulo-servicios4-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script texto servicios4
$(document).ready(function () {
    $('.save-btn14').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#texto-servicios4-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script mapa
$(document).ready(function () {
    $('.save-btn15').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const newUrl = $('#link-maps-textarea').val().trim(); // Captura el valor del textarea

        // Verificar si el textarea está vacío
        if (newUrl === '') {
            alert("Ingresa el link requerido.");
        } else {
            // Actualizar el src del iframe
            $('#mapa').attr('src', newUrl);
            alert("Link guardado para previsualización");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content: newUrl }), // Enviar el link actualizado
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//Script para actualizar el wsp
$(document).ready(function () {
    $('.update-wsp').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const wsp = $('#num-wsp').val().trim(); // Captura el valor del textarea

        // Verificar si el textarea está vacío
        if (wsp === '') {
            alert("Ingresa el número requerido.");
        } else {
            // Actualizar el src del iframe
            $('#wsp-link').attr('href', wsp);
            alert("Contacto guardado exitosamente");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content: wsp }), // Enviar el link actualizado
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script agenda calendly
$(document).ready(function () {
    $('.save-btn16').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const link_calendly = $('#link-calendly-textarea').val().trim(); // Captura el valor del textarea

        // Verificar si el textarea está vacío
        if (link_calendly === '') {
            alert("Ingresa el link requerido.");
        } else {
            // Actualizar el src del iframe
            $('#agenda-section').html(link_calendly);
            alert("Link guardado para previsualización");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content: link_calendly }), // Enviar el link actualizado
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script direccion
$(document).ready(function () {
    $('.btn-direccion').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#direccion-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script mail
$(document).ready(function () {
    $('.btn-mail').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const content = $(this).prev('.content').val(); // Obtiene el contenido del textarea asociado
        var title = $('#mail-textarea').val().trim(); // Usamos el ID del textarea para obtener el valor


        // Verificar si el textarea está vacío
        if (title === '') {
            alert("Ingresa el texto requerido.");
        } else {
            // Aquí puedes agregar la lógica para guardar el título o continuar con el proceso
            alert("Sección guardada exitosamente");


            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content }),
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script instagram
$(document).ready(function () {
    $('.btn-insta').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const link_insta = $('#insta-textarea').val().trim(); // Captura el valor del textarea

        // Verificar si el textarea está vacío
        if (link_insta === '') {
            alert("Ingresa el link requerido.");
        } else {
            // Actualizar el src del iframe
            alert("Link guardado para previsualización");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content: link_insta }), // Enviar el link actualizado
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});

//script face
$(document).ready(function () {
    $('.btn-face').click(function () {
        const section = $(this).data('section'); // Obtiene la sección desde el botón presionado
        const link_face = $('#face-textarea').val().trim(); // Captura el valor del textarea

        // Verificar si el textarea está vacío
        if (link_face === '') {
            alert("Ingresa el link requerido.");
        } else {
            // Actualizar el src del iframe
            alert("Link guardado para previsualización");

            // Realizar la solicitud AJAX
            $.ajax({
                url: 'https://test.genda.cl/update-content',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ section, content: link_face }), // Enviar el link actualizado
                success: function (response) {
                    $('#message').text('Contenido actualizado correctamente.').show();
                    location.reload(); // Recarga la página
                },
                error: function () {
                    $('#message').text('Error al actualizar el contenido.').show();
                }
            });
        }
    });
});


//logout
async function getAdminData() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../../index.html";
        return;
    }

    const res = await fetch("https://test.genda.cl/admin", {
        headers: { Authorization: token }
    });

    const data = await res.json();
    if (res.ok) {
        document.getElementById("admin-message").innerText = data.message;
    } else {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.close(); // Intentar cerrar la pestaña
    window.location.href = "../index.html"; // Redirigir si no se cierra
}

getAdminData();
