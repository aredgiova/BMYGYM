# Validación

## Páginas legales — 28 de octubre de 2026

Los cuatro documentos facilitados se incorporaron a `/legal`, `/privacy`, `/cookies` y `/accessibility`, con sus equivalentes en alemán, francés, español y ruso. Cada documento conserva su propia página y los enlaces existentes del footer. Se añadieron titular, dirección profesional y fecha, se retiraron los avisos de borrador y se adaptó la información técnica al formulario y al almacenamiento reales del código. No se modificaron el diseño ni los textos de la landing.

ESLint, TypeScript, compilación de producción y las 22 pruebas existentes pasaron. La comprobación de navegador contra `http://127.0.0.1:3101` verificó las veinte rutas legales con HTTP 200, fecha, títulos, contenido completo, enlaces de email y AEPD, metadatos y ausencia de avisos provisionales. Se siguieron los veinte enlaces del footer y se abrieron las cinco políticas desde el formulario; Cookie Settings accede a la política correspondiente.

Las cuarenta combinaciones de documento/idioma con anchos de 320 y 1440 px no presentan desbordamiento horizontal. El recorrido no registró errores JavaScript, solicitudes externas, cookies ni datos en localStorage/sessionStorage. Capturas e informe local en `artifacts/legal-2026-10-28/`; recorrido en `artifacts/legal-qa-2026-10-28.cjs`. La revisión visual independiente de tres capturas EN/RU no encontró problemas de lectura o recorte. Las traducciones DE/FR y ES/RU recibieron revisión cruzada sin hallazgos materiales; no se afirma revisión humana nativa.

La comprobación corresponde a la aplicación local. No se ha desplegado esta revisión, verificado la infraestructura de producción ni enviado correo real.

## Refinamiento luminoso e imágenes suministradas — 22 de octubre de 2026

La portada presenta la primera imagen completa junto al texto sobre marfil, sin oscurecerla. Se incorporaron cuatro visualizaciones suministradas y se aclararon cabecera, fondos y Signature Concepts. Las alternativas de imagen están actualizadas en los cinco idiomas; OpenGraph y Twitter usan la nueva portada.

| Comprobación | Resultado |
| --- | --- |
| Compilación, TypeScript y ESLint | Correctos |
| Pruebas existentes | 22 aprobadas |
| Responsive | 25 combinaciones EN/DE/FR/ES/RU a 320, 375, 768, 1024 y 1440 px, sin desbordamiento horizontal |
| Rutas | 30 comprobaciones de páginas informativas y rutas inexistentes con estado e idioma correctos |
| Navegación | Menú móvil, selector de idioma, Escape, foco y conservación de URL verificados |
| Formulario | Validación, retención tras fallo y reinicio tras éxito simulados en los cinco idiomas; sin envíos reales |
| Imágenes y consola | Imágenes cargadas y sin errores JavaScript en el recorrido |

Comprobación final contra `next start` en `http://127.0.0.1:3100`. Capturas e informe local en `artifacts/luxury-2026-10-22/`; recorrido en `artifacts/luxury-qa-2026-10-22.cjs`. La primera pasada en desarrollo leía el idioma de algunas páginas 404 antes de terminar la navegación; la comprobación final espera la carga y pasa en producción. Las capturas finales esperan también la decodificación de imágenes tras cambios de tamaño.

El detector se ejecutó una vez: 40 avisos orientativos de documentación de colores y tamaños tipográficos; ningún hallazgo funcional. La documentación visual se actualiza a la implementación. Las cuatro imágenes nuevas suman 1.083.502 bytes en WebP; no se retocaron colores ni contenido.

La revisión independiente de nueve capturas, código e informe cerró sin hallazgos materiales. Contrastes calculados: texto secundario sobre papel 5,14:1, secundario sobre Vision 4,74:1, etiquetas sobre Vision 4,61:1 y placeholders sobre papel 4,79:1. No constituye una auditoría exhaustiva de accesibilidad.

| Área | Disposición | Alcance |
| --- | --- | --- |
| Dirección e identidad | Aprobado | Brief y selección de imágenes |
| Composición visual | Aprobado | Nueve capturas indicadas |
| Adaptación multilingüe | Aprobado | EN, DE y RU visuales; informe de cinco idiomas |
| Accesibilidad comprobable | Aprobado | Contraste, semántica y estilos de foco/movimiento |
| Correcciones | Ninguna requerida | Sin hallazgos materiales |
| Publicación | Fuera de alcance | Revisión realizada solo en lectura |

Tras la vista previa local, el usuario autorizó el 22 de octubre de 2026 subir esta entrega al repositorio `aredgiova/BMYGYM`. Esta validación corresponde al código local y no acredita un despliegue de hosting ni entrega real de correo.

## Two Ways to Work With Us — 20 de octubre de 2026

Sección incorporada entre la introducción y la filosofía, antes de LAND / SEA / AIR, sustituyendo los perfiles de texto anteriores. Título, categorías, descripciones, botones y textos de imagen están localizados en los cinco idiomas. **Las tres referencias mencionadas por el usuario no llegaron adjuntas: las imágenes de los dos bloques son provisionales y reutilizan recursos existentes.**

Compilación y ESLint correctos; las 22 pruebas existentes siguen pasando. El recorrido de navegador `artifacts/work-with-us-qa.cjs` comprobó 20 combinaciones de idioma y ancho (320, 375, 768 y 1440 px), sin desbordamiento. Verificó dos columnas desde 768px y una por debajo, carga de ambas imágenes y ausencia del par anterior duplicado.

En cada idioma se verificaron preselección privada/profesional, CTA repetido, conservación de nombre y mensaje ya escritos, eliminación del error del perfil sin ocultar otros errores, selección manual, atrás/adelante, enlace directo con `client`, parámetros adicionales, valores desconocidos y payload final mediante envío simulado. El selector de idioma conserva el parámetro de perfil. No hubo errores JavaScript ni envíos reales. Capturas e informe local en `artifacts/work-with-us/`.

Pendiente: recibir la referencia de distribución y las dos imágenes definitivas, incorporarlas y revisar sus encuadres. Esta revisión permanece local y sin publicar.

## Actualización multilingüe y comercial — 20 de octubre de 2026

Verificada localmente en una compilación de producción de Next.js 16.4.2, con Microsoft Edge sin interfaz mediante Playwright. No se han publicado estos cambios.

| Comprobación | Resultado |
| --- | --- |
| Compilación de producción | Correcta; cinco páginas de inicio y veinte páginas informativas prerenderizadas |
| TypeScript y ESLint | Sin errores |
| `npm test` | 22 pruebas aprobadas: validación, proveedor simulado, API en cinco idiomas, cobertura completa de diccionarios y rutas localizadas |
| Responsive | 25 combinaciones: EN/DE/FR/ES/RU a 320, 375, 768, 1024 y 1440 px, sin desbordamiento horizontal |
| Páginas informativas y errores | 30 comprobaciones: veinte páginas informativas HTTP 200 y diez rutas inexistentes HTTP 404, con idioma correcto |
| Metadatos | `html lang`, canonical, cinco alternates y `x-default` correctos en las cinco portadas |
| Selector | Conserva página, query y ancla; muestra nombres nativos, abre/cierra y restaura foco con Escape |
| Navegación móvil | Menú abre y cierra con Escape; foco vuelve al botón en los cinco idiomas |
| Formulario | Errores requeridos localizados, perfil obligatorio, retención tras fallo simulado, reinicio tras éxito simulado, perfil e idioma incluidos en payload |
| Imágenes | Todas las imágenes de portada cargadas en las cinco versiones; AERO ONE usa la imagen suministrada y conserva su proporción 3:2 |
| Revisión visual | Portadas de escritorio y móvil, AIR, perfiles, Blueprint y formularios revisados; aviso de desarrollo/certificación visible |
| Consola | Sin errores JavaScript de página en el recorrido automatizado |

Las capturas y el informe local están en `artifacts/i18n/`; el recorrido reproducible de esta máquina está en `artifacts/i18n-qa.cjs`. Esa carpeta no se versiona. El detector de diseño se ejecutó una vez: registró referencias del sistema visual auxiliar preexistente y fuentes cirílicas ahora documentadas; no se sustituyó la estética del proyecto.

Las traducciones recibieron revisión editorial cruzada por agentes, documentada en [i18n.md](i18n.md). No se afirma revisión por traductor humano nativo. La comprobación de correo utilizó respuestas simuladas y no acredita recepción en una bandeja real. No se enviaron correos reales. Los avisos legales mantienen su condición de borrador.

## Primera versión — historial

Comprobaciones realizadas el 16 de octubre de 2026 en Windows, Node.js 22.15.0 y Microsoft Edge mediante Playwright.

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Compilación de producción correcta; páginas estáticas y dos Route Handlers Node.js |
| `npm run lint` | Sin errores ni advertencias de lint |
| `npm run typecheck` | Sin errores TypeScript |
| `npm test` | 15 pruebas aprobadas; proveedor de correo simulado |
| Anchos 320, 375, 768, 1024 y 1440 px | Sin desbordamientos, una H1 y ninguna imagen rota |
| Navegación móvil | Abrir, cerrar, Escape y enlaces de sección correctos |
| Cookie Settings móvil | Desplegable sin desbordamiento horizontal |
| Rutas principales y documentos | HTTP 200; URL inexistente HTTP 404 |
| `/api/health` | Respuesta exacta requerida |
| Correo sin configurar | HTTP 503 y contacto alternativo; no confirma un envío inexistente |
| Formulario en navegador | Conserva datos tras fallo; asocia errores con campos; limpia errores al editar; reinicia tras éxito simulado |
| Revisión visual independiente | Aprobada para esta primera versión local; correcciones resueltas |
| Consola de navegador | Sin errores de ejecución de página |

Las capturas de revisión se encuentran localmente en `artifacts/desktop-home.png`, `artifacts/mobile-home.png` y las capturas completas de esa carpeta. `artifacts/` está excluida de Git. El resumen mecánico se conserva localmente en `artifacts/qa-results.json`.

La revisión visual final resolvió contraste de texto pequeño, identificación de visualizaciones conceptuales en móvil, nitidez del hero móvil, conflicto con una utilidad tipográfica de Tailwind, flechas de una lista que sugerían enlaces y desbordamiento del panel de cookies.

No se enviaron correos reales. La entrega efectiva requiere credenciales, remitente verificado y una prueba autorizada. No se publicaron cambios ni se conectó el dominio.

`npm audit --omit=dev` no reportó vulnerabilidades de producción. La advertencia pendiente del árbol de herramientas de desarrollo se detalla en [dependency-audit.md](dependency-audit.md). Node.js 22.15 emite un aviso experimental al ejecutar TypeScript directamente en las pruebas; no afecta al build de Next.js.
