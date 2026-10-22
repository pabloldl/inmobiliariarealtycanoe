# Auditoría previa al rediseño

Se revisaron el HTML y la composición actual de Realty Canoe, y las secciones y cabeceras de las otras once landings. Se examinó además en detalle el HTML de Mari Carmen y El Rescoldo, y las capturas completas existentes de Mari Carmen y Realty Canoe.

Patrones compartidos encontrados: marca a la izquierda y enlaces horizontales a la derecha; hero con titular grande seguido de fotografía ancha; presentación con foto y párrafo enfrentados; bloques numerados con titular de dos líneas y última frase en cursiva; mosaicos de fotos; contacto con titular, número horizontal enorme y acciones inferiores. La versión anterior de Realty Canoe conservaba buena parte de este esqueleto.

Arquitectura decidida antes de escribir el nuevo código:

1. Margen lateral de publicación con índice persistente, independiente del cuerpo. En móvil, sumario desplegable propio y contacto siempre visible.
2. Portada compuesta: marca REALTY / CANOE, fotografía estrecha vertical en el extremo superior derecho y metadatos de publicación. Sin fotografía panorámica debajo del titular ni texto sobre foto.
3. Declaración solo tipográfica con tres alineaciones y párrafo de presentación al pie.
4. Secuencia de cuatro láminas en flujo vertical: panorama, interior de tamaño medio, detalle pequeño y arquitectura vertical. Cada una ocupa su propia fila, con posición, escala y pie distintos. No hay cuadrícula de tarjetas ni fotografías enfrentadas con texto comercial.
5. Identidad local como pliego tipográfico invertido: EL BOSQUE / CÁDIZ y código postal en el margen, con directorio de dirección al pie. Sin mapa ficticio.
6. Contraportada clara, número dividido en tres grupos verticales y columna de acciones de lectura. No hay banda oscura con número horizontal.

Se conservan los datos confirmados y los cinco recursos fotográficos propios de esta carpeta. No se alteran otras landings.

## Contraste visual final

Se revisaron las capturas completas nuevas a 375, 768, 1440 y 1920 px. Se compararon visualmente con las capturas previas de Realty Canoe y las de Mari Carmen, El Rescoldo y Pintor José Luis. La portada ya no es una franja de marca o titular sobre una imagen ancha; el índice ocupa un margen propio; las fotos aparecen en filas independientes, en lugar de un mosaico; el bloque local adopta composición tipográfica; la contraportada separa los tres grupos del teléfono en vertical. Los recursos editoriales compartidos (reglas finas, serif, pies) no repiten la distribución de esos proyectos.

En la primera revisión se detectó que el titular móvil se acercaba demasiado al borde. Se redujo su cuerpo y desplazamiento; la comprobación final de los límites del texto confirma que ambas líneas caben en el ancho disponible. Pasan la apertura del índice con teclado, Escape con retorno del foco, cierre al navegar, seguimiento de sección, copia real del teléfono y su alternativa, anclas, imágenes, fuentes y movimiento reducido. Sin errores JavaScript ni desbordamiento horizontal en los cuatro viewports. Los hashes de los otros once `index.html` permanecen iguales al inicio del rediseño; todas las escrituras se realizaron dentro de esta carpeta.
