# Auditoría del rediseño inmobiliario

Se reemplazó el diseño Architectural Journal por una web inmobiliaria: header horizontal, hero fotográfico a todo el ancho, oferta prioritaria, estado vacío honesto, información breve, contacto y footer con navegación útil.

No existían anuncios reales documentados. No se publicaron inmuebles, precios, características, filtros o servicios no acreditados. El componente reutilizable de tarjeta y detalle está preparado en js/script.js; los requisitos para activarlo están en README.md. Las dos fotografías visibles son ambientales, locales y distintas; se identifican expresamente como ajenas al catálogo.

Verificación ejecutada con Chrome headless y Node: 375, 768, 1440 y 1920 px sin scroll horizontal, imágenes rotas, anclas inexistentes o errores de ejecución. Menú móvil y cierre al navegar, Escape con retorno del foco, copia real al portapapeles, alternativa de copia y movimiento reducido: correctos. Destinos tel: coinciden con el teléfono conservado. Sintaxis JS validada con node --check. Capturas full-375 y screen-1440 revisadas visualmente.

No se realizaron llamadas reales, comprobaciones externas del negocio ni despliegues. Los datos de contacto proceden de la información documentada en el proyecto anterior. Las fichas futuras no han sido probadas con anuncios reales. Todos los archivos editados pertenecen a inmobiliaria-realty-canoe/.
