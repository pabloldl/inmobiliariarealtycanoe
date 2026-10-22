# Inmobiliaria Realty Canoe

Landing editorial independiente, realizada con HTML5, CSS3 y JavaScript vanilla. Sin dependencias, compilación ni servicios externos de ejecución. Todos los recursos de la web están dentro de esta carpeta y utilizan rutas relativas.

## Abrir localmente

Abre esta carpeta en VS Code y utiliza **Open with Live Server** sobre `index.html`. No hay que instalar paquetes. También puede abrirse directamente el HTML; el botón de copia incorpora una alternativa para navegadores sin Clipboard API.

## Diseño y contenido

Paleta: azul noche `#182D36`, piedra `#EAE5DA`, bronce `#B58D68`, marfil `#FAFAF7` y gris `#46545A`. Composición Architectural Journal: margen lateral de lectura en escritorio, sumario móvil, portada con marca apilada y fotografía vertical, declaración sin imagen, secuencia de cuatro láminas independientes, identidad local tipográfica y contraportada con teléfono apilado. Titulares Bodoni Moda y textos Manrope. Marca geométrica y favicon originales como **propuesta provisional**, sin atribuirlos a una identidad oficial.

Solo se utiliza la información comercial facilitada: nombre, actividad, dirección y teléfono. No hay propiedades anunciadas, precios, servicios sin confirmar, horarios, reseñas, correo, redes ni formulario sin destino. La sección de ubicación utiliza tipografía y la dirección confirmada; no se ha incluido una fotografía de El Bosque al no disponer de una imagen local autorizada verificada.

## Fotografías y licencias

Las cinco fotografías son distintas, se descargaron desde Pexels el 22 de octubre de 2026 y se guardaron como WebP. Se recortan visualmente con `object-fit`, sin modificar su contenido. Se identifican como ilustrativas en la página; no representan una cartera de Realty Canoe ni se atribuyen a El Bosque.

Licencia: [Pexels License](https://www.pexels.com/license/), que permite el uso y modificación de las imágenes, incluido el uso comercial, sujeto a sus condiciones. No se implica respaldo de los fotógrafos ni relación con las propiedades fotografiadas.

| Archivo | Autor | Fuente original |
| --- | --- | --- |
| `img/patio.webp` | Ahmet ÇÖTÜR | [Charming Mediterranean Courtyard with Rustic Architecture · 29702282](https://www.pexels.com/photo/charming-mediterranean-courtyard-with-rustic-architecture-29702282/) |
| `img/arquitectura.webp` | Murat Ak | [Modern Courtyard with Mediterranean Architecture · 31830341](https://www.pexels.com/photo/modern-courtyard-with-mediterranean-architecture-31830341/) |
| `img/salon.webp` | Taylor Thompson | [Cozy Sunlit Living Room with Modern Decor · 34579926](https://www.pexels.com/photo/cozy-sunlit-living-room-with-modern-decor-34579926/) |
| `img/fachada.webp` | Piers Olphin | [Mediterranean White House · 15172242](https://www.pexels.com/photo/mediterranean-white-house-15172242/) |
| `img/detalle.webp` | drB drB | [Charming White Mediterranean House with Potted Plants · 30654613](https://www.pexels.com/photo/charming-white-mediterranean-house-with-potted-plants-30654613/) |

## Tipografías

Fuentes locales de [Google Fonts](https://github.com/google/fonts): [Bodoni Moda](https://github.com/google/fonts/tree/main/ofl/bodonimoda) y [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope). Se incluyen sus licencias SIL Open Font License en `fonts/OFL-Bodoni.txt` y `fonts/OFL-Manrope.txt`. Los estilos inclinados se generan en el navegador a partir de la fuente normal.

## Interacciones y accesibilidad

- Menú móvil con estado `aria-expanded`, enlaces ocultos fuera del recorrido de teclado cuando está cerrado, cierre al navegar, pulsar Escape, salir del margen de navegación con el foco o pulsar fuera. El índice señala el pliego actual mediante `aria-current="location"`.
- Enlaces a las secciones, llamada `tel:+34600280386` y Google Maps con la dirección completa.
- Copia de `600280386` con Clipboard API y alternativa local; resultado anunciado mediante una región de estado accesible.
- Enlace para saltar al contenido, foco visible, HTML semántico, textos alternativos y movimiento reducido.
- Contenido visible sin JavaScript; revelados progresivos solo cuando el navegador puede ejecutarlos.

## SEO

Título y descripción local, Open Graph y JSON-LD `RealEstateAgent` con datos confirmados. No se ha inventado un dominio, URL canónica ni URL pública. `og:image` es relativo para conservar el funcionamiento local; las plataformas sociales suelen requerir una URL absoluta pública para mostrar una imagen compartida.

## Comprobaciones realizadas

Chrome sin interfaz, servido por HTTP local. Resultados en `.qa/results.json`; capturas iniciales de los cuatro tamaños y capturas completas de los cuatro tamaños en `.qa/`.

- Viewports de 375, 768, 1440 y 1920 px: sin desbordamiento horizontal, sin anclas rotas, fuentes cargadas y todas las imágenes cargadas.
- Cinco fotografías con cinco rutas y hashes diferentes; todas con texto alternativo.
- Menú móvil: apertura, cierre al seleccionar sección, Escape y recuperación del foco comprobados.
- Copia real al portapapeles: `600280386`; alternativa sin Clipboard API también comprobada.
- Teléfonos y parámetros de los dos enlaces a Maps verificados. No se realizó una llamada real ni se comprobó la ficha del negocio en Google Maps.
- Preferencia de movimiento reducido verificada; sin errores JavaScript o de recursos registrados durante la prueba.
- Sintaxis JavaScript comprobada con `node --check`.
- Capturas completas de 375, 768, 1440 y 1920 px revisadas visualmente. Comparadas con la versión previa y con las capturas existentes de Mari Carmen, El Rescoldo y Pintor José Luis.

La automatización usa Node y Chrome ya disponibles en el entorno de desarrollo; no son necesarios para utilizar la web. No se instalaron frameworks ni paquetes. Todas las escrituras del encargo se limitaron a esta carpeta; no se modificaron proyectos anteriores ni se añadieron configuraciones de Netlify. No se realizó ningún despliegue.

## Reconstrucción Architectural Journal

La auditoría previa y la arquitectura decidida antes de implementar están en `.qa/audit.md`. Se revisaron las cabeceras y secciones de las otras once landings, además de la web anterior. Se eliminaron el header horizontal, el hero de titular sobre panorama, el bloque de presentación con foto enfrentada, el índice de conceptos, el mosaico y el contacto oscuro con número horizontal.

La nueva retícula tiene cinco pliegos de lectura. En móvil, la fotografía de portada pasa debajo de la marca, junto a sus metadatos, y el índice se convierte en un sumario desplegable. Las cuatro fotografías de la secuencia ocupan filas propias, con cuatro tamaños y posiciones diferentes. El código postal funciona como anotación marginal en el pliego local. La contraportada compone el número real como `600 / 280 / 386`, conserva una etiqueta accesible con el teléfono completo y ofrece las tres acciones solicitadas.

Las animaciones descubren las imágenes mediante recorte vertical y ajustan sutilmente el espaciado de la declaración. El contenido queda disponible sin JavaScript y con movimiento reducido. Se conservaron las mismas cinco fotografías autorizadas de esta carpeta, sin reutilizar archivos de otras landings. Sus fuentes y licencias no cambian.

Las capturas previas se conservan en `.qa/before-redesign/`. Los archivos `full-375.png`, `full-768.png`, `full-1440.png` y `full-1920.png` muestran la reconstrucción completa. `.qa/verify.cjs` permite repetir las comprobaciones con Node y Chrome disponibles en esta máquina, sin instalar paquetes. Las capturas completas fuerzan la visibilidad de las láminas para documentar toda la lectura, incluidas las que aparecen al desplazarse.