# Realty Canoe ? Web inmobiliaria

Redise?o completo local con HTML5, CSS3 y JavaScript vanilla. Abrir index.html con Live Server. Sin instalaci?n, compilaci?n ni despliegue.

## Contenido y alcance

La web anterior era una revista arquitect?nica. La nueva presenta una portada fotogr?fica, navegaci?n horizontal, consulta de inmuebles, presentaci?n breve de la inmobiliaria, contacto, ubicaci?n y llamada fija m?vil. Verde bosque, blanco, crema y Manrope local. La marca gr?fica es una propuesta de dise?o, no un logotipo oficial confirmado.

Se conservan exclusivamente nombre, tel?fono (600 280 386) y direcci?n (Av. Juan XXIII, 23, Pta. Dcha., 11670 El Bosque, C?diz) documentados como facilitados en el proyecto anterior. No se ha hecho una verificaci?n externa nueva de esos datos. No hab?a inventario real, servicios concretos acreditados ni fotograf?as autorizadas de inmuebles propios en los archivos. Por ello no se publican compra/alquiler, servicios de propietarios, valoraciones, horarios, correo, redes, WhatsApp ni formularios sin destino.

La secci?n de oferta contiene un estado vac?o y permite consultar por tel?fono. No implica que la agencia carezca de inmuebles; solo indica que no hay anuncios publicados en esta web. No hay filtros ni buscador ficticio.

## Incorporaci?n de inmuebles

En js/script.js, la colecci?n properties est? vac?a. Existe un componente de tarjeta y un di?logo de detalle con galer?a, caracter?sticas y contacto; no se publica ninguna ficha de ejemplo. Para cada anuncio se necesitan:

- Referencia interna y autorizaci?n de comercializaci?n/publicaci?n.
- title, type, operation (Venta o Alquiler) y locality, comprobados.
- images: rutas locales img/ de fotograf?as autorizadas; confirmar derechos y textos alternativos apropiados.
- verified: true solo tras comprobar contenido y permisos.
- Opcionales: price (euros; mensual para Alquiler), area (m?), bedrooms, bathrooms y description. Los valores ausentes no se muestran.
- No publicar direcciones privadas; la localidad es suficiente. Documentar fuente, fecha, vigencia y permisos antes de activar el anuncio.

El precio no debe ser una cadena, y las cifras deben ser n?meros comprobados. Revisar manualmente cada anuncio y su galer?a antes de publicar. Cuando haya un inventario suficiente, implementar filtros seg?n sus datos; a?n no existen porque no hay cat?logo. La estructura futura no se ha validado con inmuebles reales.

## Interacciones y accesibilidad

Men? m?vil con cierre al elegir enlace, Escape, clic exterior y salida del foco. Copia de tel?fono con alternativa sin Clipboard API. Enlaces reales tel: y Google Maps. Contenido accesible sin JavaScript, foco visible, salto al contenido, SVG para s?mbolos y prefers-reduced-motion. Sin animaciones de aparici?n ni dependencias remotas. Im?genes locales WebP, carga diferida salvo portada; no se repiten fotograf?as en las secciones.


## Verificaci?n del redise?o

La ejecuci?n actual de .qa/verify.cjs genera .qa/results.json y capturas screen/full en 375, 768, 1440 y 1920 px. Usa Node y Chrome instalados, sin a?adir dependencias a la web. Comprueba desbordamiento, carga de im?genes y fuentes, anclas, men?, Escape, tel?fono copiado y alternativa, destinos tel:, estado vac?o y movimiento reducido. Las capturas antiguas en before-redesign corresponden al dise?o editorial anterior.

No se prueban llamadas telef?nicas reales ni la exactitud comercial de Google Maps. No se ha realizado despliegue. Solo se han editado archivos de inmobiliaria-realty-canoe/.
