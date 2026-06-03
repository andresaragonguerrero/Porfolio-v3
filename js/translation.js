// función para cargar los JSON
async function cargarJSON(idioma) {
    try {
        const respuesta = await fetch(`languages/${idioma}.json`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error cargando', idioma, error);
        return null;
    }
}

// función para aplicar las traducciones
function aplicarTraducciones(traducciones) {
    const elementos = document.querySelectorAll('[data-translate]');

    elementos.forEach(elemento => {
        const clave = elemento.dataset.translate;
        const partes = clave.split('.');
        let texto = traducciones;

        partes.forEach(parte => {
            if (texto) texto = texto[parte];
        });

        if (texto && typeof texto === 'string') {
            elemento.textContent = texto;
        }
    });
}

// función para cambiar de idioma
async function cambiarIdioma(codigoIdioma) {

    const traducciones = await cargarJSON(codigoIdioma);
    if (!traducciones) return;

    aplicarTraducciones(traducciones);

    // Actualizar selectores de idioma (ES/EN/FR)
    document.querySelectorAll('.language').forEach(elemento => {
        elemento.textContent = codigoIdioma.toUpperCase();
    });

    // aquí se puede añadir un mensaje que diga que se ha cambiado el idioma
}

// configuración de los botones de idioma
function configurarBotones() {
    const botonesIds = [
        'language-en', 'language-es', 'language-fr',
        'sidebar-language-en', 'sidebar-language-es', 'sidebar-language-fr'
    ];

    botonesIds.forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.addEventListener('click', () => {
                const idioma = id.replace('language-', '').replace('sidebar-', '');
                cambiarIdioma(idioma);
            });
        }
    });
}

// Cuando el DOM está preparado, se inicia
document.addEventListener('DOMContentLoaded', () => {
    configurarBotones();
    cambiarIdioma('es');
});