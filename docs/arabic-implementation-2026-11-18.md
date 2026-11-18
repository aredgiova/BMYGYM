# Implementación del árabe — 18 de noviembre de 2026

La usuaria autorizó incorporar el árabe completo como séptimo idioma. La implementación está realizada y verificada en local. Este informe registra el código y las comprobaciones locales; no declara que la publicación se haya completado. La [evaluación de viabilidad inicial](arabic-feasibility-2026-11-18.md) queda como antecedente histórico, no como cotización vigente ni trabajo técnico pendiente.

## Alcance realizado

El selector conserva el orden **EN · DE · ES · FR · RU · IT** y añade **AR · العربية**. El árabe estándar moderno está disponible en `/ar`, `/ar/retreats`, `/ar/private-consultation` y los cuatro documentos legales. Se mantienen el sitio, sus imágenes, colores, jerarquía editorial y flujos actuales de consultas.

Los cuatro diccionarios nuevos —`ar-home.json`, `ar-common.json`, `ar-retreats.json` y `ar-booking.json`— cubren portada, Retreats, consulta privada, navegación, formularios, validación, estados de envío/error/éxito, cookies, accesibilidad, legales, metadatos, alternativas de imágenes y página no encontrada. Sus claves, tipos y estructuras corresponden a los diccionarios ingleses. La bienvenida está completamente traducida para AR; los seis idiomas anteriores conservan su texto de identidad original en inglés.

La traducción recibió revisión cruzada entre agentes, incluida la correspondencia de condiciones comerciales, estado de desarrollo y certificación de los conceptos, datos legales, cifras, fechas, dirección y contactos. La revisión no equivale a aprobación por un traductor humano nativo ni a revisión jurídica. No se añadieron compromisos comerciales, prestaciones médicas ni hechos legales nuevos.

## Dirección, tipografía y contenido mixto

- El documento árabe declara `lang="ar" dir="rtl"`; los otros seis idiomas mantienen `dir="ltr"`.
- Propiedades lógicas de CSS adaptan alineación, márgenes, separaciones y bordes. Las flechas direccionales se reflejan; las imágenes y el logotipo conservan su orientación.
- Los campos de texto libre utilizan `dir="auto"`; los correos electrónicos mantienen LTR. `bdi` y aisladores Unicode LRI/PDI conservan el orden de marcas latinas, direcciones y fragmentos mixtos. El idioma del texto visible del logotipo está separado del de su etiqueta accesible.
- Noto Naskh Arabic se utiliza en títulos y Noto Sans Arabic en cuerpo e interfaz. Se ajustaron interlineado, espaciado y énfasis para escritura árabe, conservando Bodoni Moda y Manrope en los segmentos latinos. Las familias árabes preceden a las fuentes de sistema en la cadena de alternativas.
- Las rutas, enlaces canónicos, alternativas de idioma, metadatos y sitemap incluyen AR. El cambio de idioma conserva página, parámetros y ancla.

Las fuentes provienen del servicio oficial de Google Fonts y se sirven desde `public/fonts`: Noto Naskh Arabic pesa **94.032 bytes** y Noto Sans Arabic **165.960 bytes**. Se incluyen sus licencias SIL Open Font License. Las URLs originales y hashes SHA-256 constan en el [manifiesto de recursos](asset-manifest.md); la respuesta CSS de origen se conserva en `artifacts/arabic-google-fonts.css`. El navegador no necesita consultar Google Fonts durante la visita.

## Verificación local

| Comprobación | Resultado |
| --- | --- |
| Rutas de los siete idiomas | 49 respuestas HTTP 200: portada, Retreats, consulta privada y cuatro documentos legales por idioma |
| Documento y navegación | Idioma y dirección correctos, un título principal por página, siete enlaces en el selector, canónicos y alternativa AR correctos |
| Composición y regresión | 126 estados: AR a 320, 390, 768, 1024 y 1440 px y texto al 200% a 390 px; otros seis idiomas a 390 y 1440 px |
| Desbordamiento y JavaScript | Sin desbordamiento horizontal ni errores JavaScript en el recorrido |
| Fuentes realmente utilizadas | Chrome DevTools Protocol confirma Noto Naskh Arabic en el título y Noto Sans Arabic en el cuerpo árabe, junto a las fuentes latinas originales para sus caracteres |
| Bienvenida y cookies | Bienvenida árabe, aviso y ajustes comprobados; composición a 320, 390 y 1440 px |
| Página no encontrada | Respuesta HTTP 404 con contenido árabe y dirección RTL |
| AIR | Una sola imagen: la última suministrada; no está reflejada y conserva sus textos y estado de desarrollo |
| Formularios | Consultas privadas, Retreats y consulta privada: campos obligatorios, dirección del texto, errores, conservación de datos tras fallo y reinicio tras éxito |
| Idioma de las solicitudes | Las solicitudes de los tres formularios conservan `locale: ar` y la cabecera correspondiente |
| Teclado y cambio de idioma | Menú móvil y selector con Escape/restauración de foco; AR ↔ ES conserva ruta, parámetros y ancla y actualiza la dirección |
| Ajustes de cookies | Reapertura, foco del título y cierre con Escape/restauración de foco comprobados |
| Comprobaciones del proyecto | 30 pruebas aprobadas; lint y compilación de producción correctos. La compilación genera 56 páginas |

Las **seis solicitudes de contacto** de las pruebas funcionales se interceptaron y recibieron respuestas simuladas de error y éxito. No enviaron correo real ni crearon reservas. Estas comprobaciones demuestran el comportamiento de los formularios ante esas respuestas, no la recepción de un correo por el destinatario.

Evidencia reproducible:

- `artifacts/arabic-layout-2026-11-18.cjs`: recorrido de rutas, dirección, composición, fuentes y estados de bienvenida/cookies.
- `artifacts/arabic-layout-2026-11-18/report.json`: resultados y fuentes efectivamente utilizadas.
- `artifacts/arabic-layout-2026-11-18/`: capturas de portada, AIR, consulta, Retreats, bienvenida y cookies.
- `artifacts/arabic-flows-2026-11-18-report.json`: tres formularios, seis solicitudes simuladas, navegación, foco, cambio de idioma y ajustes de cookies.

## Límites conservados

No se añadieron programas, precios, pagos, enlaces de Stripe o Linktree ni la tarifa Come With a Friend. Esa fase continúa pendiente de la información definitiva y autorización específica de la usuaria. Yacht Retreats mantiene el horizonte de 2027 y las reservas cerradas. AERO ONE sigue presentado como concepto en desarrollo, no certificado ni comercialmente disponible; AERO SIGNATURE conserva su carácter futuro. Las condiciones del servicio independiente y remunerado Private Longevity Blueprint permanecen.

La implementación árabe no acredita por sí misma publicación, una revisión lingüística humana nativa ni entrega real de correo. La publicación debe registrarse por separado una vez completada.
