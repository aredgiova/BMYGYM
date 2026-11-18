# Refinamientos BMYGYM — revisión local del 18 de noviembre de 2026

Trabajo basado en el listado adjunto de la usuaria. Conserva las fuentes, paleta, imágenes, encuadres y composiciones editoriales existentes. Las dos primeras revisiones siguientes se realizaron antes de recibir la imagen adicional; su incorporación y verificación posterior se registran al final.

## Cambios preparados

- ORVÉA™ Architectural Integration Wall y LUMERA™ Recovery Capsule sustituyen las denominaciones genéricas en los seis diccionarios de portada, incluidas referencias, pies y alternativas de imágenes. Ambos se describen como conceptos insignia y conservan su estado de desarrollo.
- European Craftsmanship se integra en la filosofía existente como un bloque editorial de título y texto. El inglés reproduce el texto suministrado; las otras cinco versiones conservan su significado.
- Retreats incorpora la experiencia personal antes del bloque actual de consultas. Permanecen solamente las tres leyendas elegidas, en los seis idiomas. Se mantienen las siete fotografías y la distribución asimétrica, con menores separaciones verticales en móvil.
- Yacht Retreats usa el nuevo texto y horizonte de 2027, con títulos y descripciones localizados. Sigue indicando que las reservas no están abiertas y no tiene acciones de reserva.
- AIR conserva la imagen original y la presentación principal de AERO ONE™. El desplegable existente incluye el nuevo texto sobre entornos de aviación a medida; la nota de desarrollo y certificación está visible fuera del desplegable. El enlace de consultas lleva al formulario existente de Private Commissions. AERO SIGNATURE permanece como concepto futuro para cabinas VIP mayores.
- Se permite que las columnas y textos largos envuelvan el contenido al ampliar el texto en móvil. No se alteraron tamaños normales, colores ni fuentes.

## Material pendiente y límites acordados

El adjunto recibido solo contiene el listado de texto. **No se recibió la nueva visualización de AERO ONE™** y no se ha sustituido, generado ni inventado una imagen alternativa. Su incorporación adicional sigue pendiente del archivo de la usuaria. Cuando llegue, debe acompañar al diseño original dentro de AIR, sin crear categoría nueva ni presentarse como instalación real o certificada.

No se modificaron los formularios, proveedores, API, flujo de consultas, precios, programas ni pagos. No se añadieron enlaces de Stripe ni Linktree. La integración de pagos y Come With a Friend requiere la información definitiva y autorización posterior de la usuaria.

El árabe se evaluó sin incorporarlo. Alcance, esfuerzo y fórmula de presupuesto en [arabic-feasibility-2026-11-18.md](arabic-feasibility-2026-11-18.md).

## Verificación realizada

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Correcto, incluida comprobación TypeScript y generación de 49 páginas |
| `npm run lint` | Sin errores ni advertencias |
| `npm test` | 29 pruebas aprobadas |
| Inicio y Retreats, seis idiomas | 12 rutas HTTP 200; idioma del documento y contenido comprobados |
| Responsive | 48 combinaciones a 320, 390, 768 y 1440 px, sin desbordamiento horizontal |
| Texto ampliado | 12 comprobaciones al 200 % y 390 px, sin desbordamiento horizontal tras corrección |
| Imágenes y contenido | Imágenes cargadas; nombres oficiales, texto de filosofía, nota AIR, tres leyendas de Retreats y Yacht 2027 presentes |
| Navegación | Enlaces locales válidos; seis idiomas; Escape restaura foco; cambio IT → ES conserva página, parámetros y ancla |
| Formulario Retreats | Validación de campos obligatorios comprobada, sin envío real |
| JavaScript | Sin errores de página en el recorrido |
| Revisión visual | Capturas de escritorio y móvil de los bloques cambiados y de Retreats; se conserva la composición editorial |

Recorrido reproducible local: `artifacts/refinements-qa-2026-11-18.cjs`. Evidencias: `artifacts/refinements-2026-11-18/`. La última confirmación mecánica omite capturas nuevas; las capturas de la revisión visual anterior permanecen en esa carpeta. Las capturas de elementos ocultan temporalmente la cabecera fija para que no tape el contenido durante la captura; esto no modifica el sitio. La comprobación en navegador utilizó el servidor de desarrollo local; la compilación de producción se verificó por separado.

Se ejecutó una vez el detector de diseño. Sus avisos son consultivos sobre valores preexistentes y el registro auxiliar de diseño desactualizado; no se cambió el sistema visual para resolverlos. Actualizar ese registro sería una tarea separada, si se solicita.

La revisión lingüística se realizó entre agentes, incluida una corrección de concordancia alemana. No se afirma revisión por un traductor humano nativo. Las pruebas de correo de la suite utilizan respuestas simuladas y no acreditan recepción real.

Vista previa local: `http://127.0.0.1:3118/` y `http://127.0.0.1:3118/retreats`. La publicación sigue pendiente de revisión de la usuaria.

## Segunda verificación solicitada: lista completa de aceptación

Se volvió a leer el listado original y se contrastó directamente con el código, los seis diccionarios, el diff contra la versión anterior y el navegador. Dos revisiones independientes comprobaron portada/aviación y Retreats/árabe, respectivamente. No se encontraron nuevos defectos que requirieran modificar el sitio. Esta comprobación no declara cerrados los puntos pendientes de material o tarifas.

| Petición u observación | Estado comprobado |
| --- | --- |
| Conservar estética, fuentes, colores y distribución editorial | Cumplido. El diff conserva los recursos originales y el sistema visual; solo añade los bloques autorizados y ajustes de reflujo/espaciado. |
| Sustituir los nombres genéricos por ORVÉA™ Architectural Integration Wall y LUMERA™ Recovery Capsule | Cumplido en EN, DE, ES, FR, RU e IT. Sin denominaciones antiguas en `src`. |
| Actualizar títulos, descripciones, referencias y textos alternativos | Cumplido, incluidas las menciones en hero, Private Clients, Land, Sea y Signature Concepts. |
| Igual importancia de ambos conceptos | Cumplido: ambos descritos como conceptos insignia, misma jerarquía de título y etiqueta, conservando la composición asimétrica original. |
| Identificar conceptos en desarrollo | Cumplido en las etiquetas individuales, nota AIR y aviso general de Signature Concepts. |
| European Craftsmanship dentro de Filosofía, sin página nueva | Cumplido. Inglés literal y cinco adaptaciones; composición editorial sin elementos decorativos nuevos. |
| Nueva imagen adicional de AERO ONE™ | **Pendiente: no se ha recibido el archivo.** AIR conserva solamente la visualización original. |
| Conservar diseño y presentación originales de AERO ONE™ | Cumplido. Imagen original intacta; contenido adicional en el desplegable editorial existente. |
| No crear una categoría de aviación nueva ni exclusividad por país | Cumplido. Todo permanece dentro de AIR, sin segmentación de producto por país. La comprobación visual de la nueva interpretación dependerá de recibirla. |
| Incorporar el texto propuesto para AIR | Cumplido. Título descriptivo, entradilla, tres párrafos y enlace presentes; adaptados a los seis idiomas. |
| Nota de concepto no certificado ni comercialmente disponible | Cumplido. Inglés literal y traducciones completas. Visible aunque el desplegable esté cerrado. |
| Vincular AIR con Private Commissions | Cumplido. Clic real en los seis idiomas llega al formulario existente de `#enquiry`. |
| Conservar AERO SIGNATURE para futuras cabinas VIP grandes | Cumplido; descripción y referencia preservadas en los seis idiomas. |
| Evaluar versión árabe completa en la misma plataforma | Cumplido como estudio técnico; no se ha implementado el séptimo idioma. |
| Evaluar RTL en navegación, tipografía, formularios y móvil | Cumplido como propuesta de alcance. Una versión árabe todavía inexistente no se presenta como validada en navegador. |
| Dar plazo aproximado para árabe | Cumplido como estimación condicionada: 32–48 horas técnicas y 2–3 semanas de calendario, incluyendo coordinación de traducción y revisión. |
| Cerrar coste adicional de árabe | **Parcial: hay fórmula y esfuerzo, pero falta una cifra monetaria.** No se dispone de tarifas o propuestas reales de desarrollo/traducción para cerrarla. |
| Mantener los seis idiomas actuales | Cumplido. Orden EN · DE · ES · FR · RU · IT y enlaces localizados comprobados. |
| Añadir experiencia personal de Retreats antes de consultas | Cumplido. Texto inglés literal y cinco adaptaciones, colocado antes del bloque existente de consultas/programas. |
| Conservar únicamente las tres leyendas elegidas | Cumplido. Se renderizan tres leyendas en cada idioma; las demás fotografías conservan sus alternativas accesibles. |
| Conservar imágenes y asimetría de Retreats | Cumplido. Siete imágenes, rutas y dimensiones originales; revisión de escritorio y móvil. |
| Reducir espacios excesivos en móvil | Cumplido mediante ajustes locales dentro del breakpoint móvil. |
| Mantener formulario y funcionamiento actual de consultas/reservas | Código conservado; validación y respuestas simuladas de error/éxito verificadas en los seis idiomas. No se acredita recepción real de correo. |
| No incorporar programas, nuevos precios, Stripe, Linktree ni Come With a Friend | Cumplido. **Aplazados por indicación expresa**, no son una omisión de esta fase. |
| Yacht Retreats: nuevo texto y horizonte de 2027 | Cumplido. Inglés literal, títulos/descripciones localizados y aviso de reservas cerradas. |
| No abrir reservas de yates | Cumplido. No hay enlaces, botones ni formularios de reserva en esa sección. |
| Revisión antes de publicación | Cumplido. Trabajo local, sin nueva subida o publicación. |

### Evidencia de esta segunda pasada

- Nuevamente aprobados `npm test` (29 pruebas), `npm run lint` y `npm run typecheck`. La compilación de producción de la primera pasada corresponde al mismo código de producto, que no cambió durante esta revisión.
- Repetidas las 12 rutas, 48 combinaciones de ancho y 12 comprobaciones de texto al 200 %: sin desbordamiento horizontal ni errores JavaScript.
- Recorrido adicional en los seis idiomas: AIR → Private Commissions; menú móvil y Escape; navegación hacia Retreats conservando idioma; destinos de los seis enlaces del selector; botón de reserva hacia su formulario.
- Formularios Retreats: campos obligatorios validados sin solicitud de red, datos conservados ante fallo simulado y reinicio correcto tras éxito simulado. Las 12 solicitudes de prueba se interceptaron localmente; ninguna se entregó al servidor de correo ni creó una reserva.
- Revisión de nuevas capturas: Retreats en español, escritorio/móvil; European Craftsmanship y AIR en inglés. No se modificó el diseño a partir de esta pasada.
- Evidencia adicional: `artifacts/acceptance-flows-2026-11-18.cjs`, `artifacts/acceptance-2026-11-18/flows.json` y capturas en esa misma carpeta.

**Conclusión de la segunda revisión, anterior a la recepción de la imagen:** los ajustes implementables con el material recibido estaban realizados y verificados. Faltaban la visualización adicional de AERO ONE™ y la cifra económica del proyecto árabe.

## Recepción e incorporación de la imagen AERO ONE

La usuaria facilitó después `388C1ED7-8C01-4725-9AC6-43081BD8BF91.jpeg` con la indicación «te paso la imagen de AERO ONE a publicar». La visualización ya está incorporada debajo de la original en AIR. Se conserva el encuadre completo de 1670 × 941, optimizado como WebP de 377,824 bytes. La imagen original sigue siendo la primera y principal. Procedencia y hashes en [asset-manifest.md](asset-manifest.md).

La nueva imagen tiene leyenda y texto alternativo en los seis idiomas. Ambas imágenes enlazan a `#enquiry`; el aviso de desarrollo y ausencia de certificación sigue visible. No se crea una categoría, exclusividad geográfica ni una afirmación de instalación real.

Validación de esta versión: `npm test` (29/29), `npm run lint` y `npm run build` (49 páginas), correctos. Se repitieron las 12 rutas, 48 combinaciones de ancho y 12 estados con texto al 200 %, sin desbordamientos ni errores de página. Se comprueba la presencia de dos imágenes en AIR, sus rutas, las nuevas leyendas y alternativas localizadas. Nuevas capturas de escritorio y móvil de AIR revisadas en `artifacts/refinements-2026-11-18/`. El detector de layout aplicado a `environments.tsx` y `globals.css` devuelve cero avisos.

**Estado actualizado:** la imagen adicional ya no está pendiente. Los refinamientos del sitio están implementados y verificados; el importe monetario del proyecto árabe sigue pendiente de tarifas reales. El árabe y la fase posterior de precios/pagos no se han implementado.
