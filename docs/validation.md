# Validación

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
