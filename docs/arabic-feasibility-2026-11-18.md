# Viabilidad del árabe como séptimo idioma — evaluación histórica

**Estado actualizado, 18 de noviembre de 2026:** la usuaria autorizó posteriormente implementar el árabe. AR ya está incorporado como séptimo idioma y se ha verificado en local. El alcance realizado y su evidencia se encuentran en [arabic-implementation-2026-11-18.md](arabic-implementation-2026-11-18.md). Este documento conserva la evaluación previa: sus tareas previstas, horas y plazos no son trabajo pendiente, una cotización vigente, horas realmente consumidas ni una factura. No acredita publicación ni contratación de un traductor humano.

La evaluación inicial que sigue describe el repositorio antes de esa autorización. En ese momento, el árabe todavía no se había incorporado y no se habían contratado servicios ni publicado cambios derivados de esta evaluación.

**La plataforma actual permite una versión completa en árabe estándar moderno dentro del mismo sitio.** La aplicación utiliza Next.js App Router con rutas por idioma y diccionarios propios. Se puede añadir `/ar`, `/ar/retreats`, `/ar/private-consultation` y las páginas legales correspondientes, manteniendo EN · DE · ES · FR · RU · IT y añadiendo AR · العربية al selector. No se identifica una necesidad técnica de otra web, dominio, plataforma o sistema de reservas. Esta conclusión se basa en la arquitectura observada y en la [documentación oficial de internacionalización de Next.js](https://nextjs.org/docs/app/guides/internationalization).

## Alcance técnico previsto en la evaluación inicial

| Área | Estado observado y trabajo necesario |
| --- | --- |
| Rutas y contenido | `src/i18n/config.ts` centraliza los seis idiomas. Los cargadores `dictionaries.ts`, `common.ts`, `booking.ts` y `retreats.ts` requieren registrar AR y cuatro diccionarios completos. Incluir portada, Retreats, consulta privada, legales, mensajes de error/éxito, cookies, accesibilidad, metadatos y alternativas de imágenes. `src/app/sitemap.ts` y los alternates ya iteran sobre la lista de idiomas; revisar además el mapa Open Graph explícito en `src/app/[locale]/layout.tsx`. |
| Dirección y navegación | El documento declara `lang` pero todavía no `dir`. Añadir `lang="ar" dir="rtl"` solo a AR y conservar la navegación al cambiar de idioma. `language-selector.tsx` ya conserva página, parámetros y ancla y gestiona Escape/foco. Revisar alineación del desplegable, orden visual del menú y flechas direccionales. La recomendación de base RTL y propiedades lógicas procede de [W3C Internationalization](https://www.w3.org/International/questions/qa-html-dir). |
| Composición | `globals.css` combina propiedades lógicas con `padding-left`, `border-left`, `margin-left`, `right: 0` y `text-align: left`; no basta con cambiar `dir`. Adaptar únicamente los componentes que lo necesiten, conservando imágenes, proporciones, jerarquía, colores, ritmo editorial y asimetría. Las fotografías y el logotipo no deben reflejarse. |
| Tipografía | Los archivos servidos actualmente son subconjuntos latinos y cirílicos de Bodoni Moda, Manrope y Cormorant Garamond. Hace falta una fuente complementaria con cobertura árabe, probada con los textos reales y limitada a ese idioma. Conservar las fuentes actuales en los otros seis idiomas y en las marcas latinas. Ajustar interlineado, énfasis y espaciado de letras para la escritura árabe. Se puede servir localmente con el mecanismo existente de [fuentes de Next.js](https://nextjs.org/docs/app/getting-started/fonts); la selección visual y su licencia se confirmarían antes de incorporarla. |
| Texto mixto | Aislar correctamente BMYGYM, ORVÉA™, LUMERA™, AERO ONE™, correos, URLs, cifras y puntuación dentro de frases árabes. Usar marcado de dirección para los fragmentos latinos y `bdi`/`dir="auto"` según el origen del contenido, siguiendo la [guía bidireccional de W3C](https://www.w3.org/International/articles/inline-bidi-markup/). |
| Formularios | Los formularios y la API ya reciben `locale` y usan mensajes localizados. La validación admite texto Unicode; el listado de idiomas todavía rechaza `ar`. Adaptar etiquetas, opciones y mensajes; campos libres con dirección automática y correo con dirección LTR. Probar nombres, ubicaciones y mensajes árabes, textos mixtos, foco, casillas, errores, envío y conservación de datos tras fallo. Mantener el proveedor y el funcionamiento actual de consultas. |
| Móvil y accesibilidad | Comprobar AR en 320, 375/390, 768, 1024 y 1440 px; menú, selector, aviso de cookies, formularios, lectura, teclado, foco, zoom y ausencia de desbordamiento. La cabecera cambia a navegación amplia a 1440 px. La revisión debe incluir también regresión de los seis idiomas actuales. |

## Traducción y presupuesto orientativo históricos

La inspección inicial contabilizó aproximadamente **4.000 palabras inglesas en 408 cadenas**, repartidas entre los cuatro diccionarios. Es una medida bruta con repeticiones, anterior a cerrar los refinamientos de esta entrega; el presupuesto de traducción debe usar el texto definitivo. Se propone traducción y revisión por un profesional de árabe estándar moderno, con glosario de marca, tono arquitectónico discreto y revisión en contexto. Las condiciones de desarrollo, certificación y reservas pendientes deben conservar su significado.

Estimación original de planificación para el alcance examinado entonces:

| Trabajo | Dedicación técnica estimada |
| --- | ---: |
| Registro de idioma, rutas y metadatos | 4–6 h |
| Adaptación RTL, tipografía y texto mixto | 12–18 h |
| Integración del contenido y formularios | 6–10 h |
| Pruebas visuales, funcionales y correcciones | 10–14 h |
| **Total técnico** | **32–48 h** |

Esto equivale a **4–6 jornadas técnicas de 8 horas**, con un plazo de calendario orientativo de **2–3 semanas laborables** si traducción y desarrollo pueden avanzar en paralelo y existe disponibilidad para una ronda de revisión. El plazo comenzaría con el alcance y el texto base definitivos; la contratación del traductor y las respuestas de revisión pueden ampliarlo.

**Coste adicional = 32–48 × tarifa técnica por hora + traducción/revisión de aproximadamente 4.000 palabras + licencia tipográfica, si se elige una de pago.** Si el proveedor de traducción cobra por palabra, su partida sería `palabras acordadas × tarifa por palabra`; si la revisión se cobra aparte, se añadiría explícitamente. No se han recibido tarifas ni presupuestos de proveedores, por lo que no hay una cifra monetaria cerrada. No se identifica una licencia de plataforma obligatoria por incorporar AR. El efecto en alojamiento dependerá del plan y uso reales, que esta evaluación no ha verificado.

El alcance presupuestado conserva las consultas actuales y excluye programas, precios, Stripe, nuevos pagos, nueva fotografía y publicación sin revisión de la usuaria.

## Coherencia de los seis idiomas y verificación pendiente en aquel momento

La inspección de `header.tsx`, `footer.tsx`, `language-selector.tsx` y `localePath` confirma que navegación, enlaces legales, Retreats y consulta privada utilizan el idioma elegido. Las marcas compartidas en inglés son deliberadas. `tests/i18n.test.ts` comprueba el orden de seis idiomas, rutas y estructura de las **cuatro** categorías de diccionarios; esa comprobación no demuestra calidad lingüística ni correcta presentación visual.

Se detectaron y comunicaron dos incoherencias de partida: el título `Yacht Retreats — Coming 2027` repetido en los seis idiomas y su marca fija `lang="en"`. Al cerrar esta evaluación, la entrega actual ya contiene los nuevos títulos localizados y ha retirado esa marca inglesa. La documentación vigente de diccionarios también se ha ajustado de tres a cuatro categorías.

En la evaluación inicial no se había validado una versión árabe en navegador porque aún no existía. Se propuso comprobar las siete páginas principales por idioma —portada, Retreats, consulta y cuatro documentos legales—, la página de error, formularios y mensajes, y realizar una revisión humana de árabe en la composición final. La implementación posterior ya aporta las comprobaciones locales de rutas, composición y funcionamiento descritas en el informe enlazado al inicio. La revisión lingüística realizada es de agentes; no se presenta como aprobación por un traductor humano nativo.
