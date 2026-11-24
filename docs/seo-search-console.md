# Visibilidad en Google y Search Console

Revisión del 24 de noviembre de 2026. Este documento conserva el diagnóstico inicial y el procedimiento de activación. La evidencia posterior de publicación se guarda localmente en `artifacts/seo-2026-11-24/release.json`; el diagnóstico inicial de esta guía no representa el estado posterior al despliegue.

## Estado de producción al iniciar la revisión

| Componente | Resultado |
| --- | --- |
| 21 páginas comerciales | HTTP 200: inicio, Retreats y consulta privada en EN, DE, ES, FR, RU, IT y AR. |
| Indexación | Las 21 páginas publicadas devuelven `noindex, nofollow`. |
| Robots | `https://www.bmygym.com/robots.txt` contiene `Disallow: /`. |
| Sitemap | Responde HTTP 200, pero contiene cero URLs. |
| Metadatos | Las 21 páginas tienen título, descripción, canonical y ocho alternativas: siete idiomas y `x-default`. El idioma HTML coincide con cada versión. |
| Dominio principal | HTTPS sin `www` redirige con 308 a `https://www.bmygym.com/`. HTTP redirige a HTTPS. |
| Datos estructurados | No se encontraron bloques JSON-LD en las páginas comerciales publicadas. |
| Verificación de Google | No hay etiqueta HTML de verificación en las páginas comprobadas ni registros TXT `google-site-verification` en el dominio raíz o `www`. Esto no demuestra que no exista una propiedad: puede haber otros métodos o verificaciones anteriores. |
| DNS | Servidores `ns6.wixdns.net` y `ns7.wixdns.net`. |
| Search Console | No se ha accedido a una propiedad autenticada; no se pueden confirmar propietarios, envío del sitemap, cobertura ni rendimiento. |

La evidencia inicial está en `artifacts/seo-2026-11-24/production-before.json` (archivo local excluido de Git). Tras autorizar el acceso a Vercel, se confirmó que `ENABLE_INDEXING` era `false` en Production y `SITE_URL` era `https://www.bmygym.com`.

## Mejora preparada en el código

Las siete portadas incorporan JSON-LD renderizado en servidor con `Organization` y `WebSite`. Todas identifican a la misma organización mediante IDs estables. Se utilizan el nombre BMYGYM, el correo público, Bojana Pesic como fundadora visible en la portada y la dirección profesional de Legal Notice: Avda. Primado Reig 129, Entlo. D, 46020 Valencia, ES. Cada idioma enlaza su aviso legal y usa su descripción localizada.

No se añaden horarios, teléfono, identificación fiscal, reseñas, certificaciones ni la afirmación de que la dirección sea un gimnasio abierto al público. Las páginas legales conservan su política de exclusión del índice.

Validación local completada: 32 pruebas, TypeScript y compilación de producción; comprobados los 21 documentos comerciales, 21 URLs del sitemap, ocho alternativas por página y JSON-LD válido en las siete portadas. También se verificaron cinco combinaciones de entorno: producción habilitada y exclusión de desarrollo, previews y configuración deshabilitada. Resultado local en `artifacts/seo-2026-11-24/local-verification.json`.

La compilación de prueba utilizó `ENABLE_INDEXING=true`, `VERCEL_ENV=production` y `SITE_URL=https://www.bmygym.com`. Esto no modifica el hosting ni acredita un despliegue.

## Activación en Vercel

Proyecto existente: `aredlopez-8250s-projects/bmygym`; repositorio `aredgiova/BMYGYM`, rama de producción documentada `main`.

1. Comprobar el acceso al proyecto y el despliegue activo.
2. Configurar `SITE_URL=https://www.bmygym.com` y `ENABLE_INDEXING=true` en **Production**. Mantener los entornos de revisión excluidos. No cambiar el control del código para forzar indexación en previews.
3. Publicar la revisión con los datos estructurados y reconstruir el despliegue. Sitemap, robots y metadatos se generan durante la compilación; cambiar una variable sin reconstruir no actualiza los archivos ya generados.
4. Comprobar en el dominio público: ausencia de bloqueos globales; `index, follow` en las 21 páginas comerciales; sitemap con 21 URLs canónicas y sus alternativas; JSON-LD en las siete portadas; redirecciones HTTP/HTTPS y `www` conservadas.

La aplicación existente también permite cargar Google Analytics, solo tras consentimiento afirmativo, cuando se habilita la indexación. No se modificó ese comportamiento en esta revisión.

## Propiedad de la cuenta de BMYGYM

La cuenta de Google propietaria debe ser la indicada por BMYGYM; no inferirla a partir de la sesión de un colaborador técnico.

1. Acceder a [Google Search Console](https://search.google.com/search-console) con esa cuenta y comprobar si ya existe la propiedad.
2. Preferir una propiedad de **Dominio** `bmygym.com`, que cubre protocolos y subdominios. Obtener el registro TXT real que Google entrega a esa cuenta.
3. Añadir ese TXT en los DNS de Wix, conservando los demás registros, y completar la verificación en Search Console. Mantener el TXT después de verificar. No se necesita compartir la contraseña con el colaborador técnico.
4. Si solo se dispone de acceso al código/hosting, la alternativa es una propiedad de prefijo `https://www.bmygym.com/` con el token HTML real en `GOOGLE_SITE_VERIFICATION`, seguida de reconstrucción y verificación. Este método no verifica una propiedad de Dominio.
5. Confirmar en la interfaz que la cuenta correcta figura como **propietaria verificada**; añadir acceso delegado por sí solo no equivale a una verificación independiente.
6. Con producción accesible a Google, enviar `https://www.bmygym.com/sitemap.xml` en Sitemaps y comprobar el resultado del procesamiento. No confundir publicar el archivo o declararlo en robots con haberlo enviado desde Search Console.
7. Inspeccionar las portadas y las páginas de servicios representativas, probar la URL publicada y solicitar indexación donde corresponda. Revisar posteriormente Páginas, Sitemaps y Rendimiento por consultas, país e idioma/página.

La preparación técnica permite el rastreo; Google decide la inclusión y las posiciones. No hay una garantía de ranking ni de plazo. Los servicios y Signature Concepts se presentan dentro de la portada; futuras páginas específicas requieren contenido propio y aprobación editorial, evitando duplicar páginas solo para introducir palabras clave.

## Requisitos de cierre de la puesta en marcha

- Publicación y comprobación de Production, registradas por separado en la evidencia de despliegue.
- Identificación de la cuenta de Google propietaria y acceso autenticado a Search Console.
- Registro TXT real y acceso a los DNS de Wix, o token HTML real para la alternativa de prefijo.
- Confirmación de propiedad, envío y procesamiento del sitemap, e inspección de URLs dentro de Search Console.

## Referencias oficiales

- [Verificar la propiedad en Search Console](https://support.google.com/webmasters/answer/9008080?hl=es).
- [Versiones localizadas y hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions).
- [Crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Datos estructurados de Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
