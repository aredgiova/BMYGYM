# Verificación de BMYGYM Retreats

11 de noviembre de 2026. Previsualización local: `http://127.0.0.1:3112/es/retreats`.

## Implementación

- Página editorial de Retreats dentro de la identidad existente: tipografía local, fondo marfil, controles sobrios y fotografías con su proporción íntegra. Valencia es el destino principal.
- Siete imágenes suministradas convertidas a WebP. La primera se precarga; las restantes usan carga diferida y tamaños responsivos de Next Image. Procedencia en `docs/retreats-assets.md`.
- Presentación independiente «Yacht Retreats — Coming 2027», con programas y precios propios todavía sin publicar. No contiene enlaces, formularios ni botones de reserva.
- Acceso directo desde los botones de Valencia a `#retreat-reservation`. Solicitud por el formulario existente y alternativa visible `hello@bmygym.com`.
- Copy, alternativas de imágenes y metadatos en EN, DE, ES, FR, RU e IT. Imagen social propia de Retreats. La preview sigue en `noindex, nofollow`.
- Fechas preferidas y validación del mensaje específicas para solicitudes; cliente y servidor coinciden. Ajuste de espaciado de privacidad italiana en este formulario.
- Eventos de navegación a Retreats/consulta privada y de acceso a la solicitud de reserva, condicionados al consentimiento analítico y habilitación del entorno.
- Corrección del ancho mínimo del pie y del texto de privacidad para evitar el desbordamiento detectado al ampliar el texto; se conserva el aspecto normal.

## Comprobaciones completadas

- `npm run lint`: correcto.
- `npm run typecheck`: correcto.
- `npm test`: 29/29.
- `npm run build`: correcto, 49 páginas generadas.
- `git diff --check`: sin errores de espacios.
- Seis rutas de Retreats responden 200 con idioma, canonical, siete alternativas lingüísticas e imagen social correctos.
- Una sola cabecera h1 por página; siete imágenes; enlaces interiores válidos; ninguna acción de reserva en el bloque Yacht Retreats.
- 24 combinaciones de idioma/ancho (320, 390, 768 y 1440 px), sin desbordamiento del documento. Texto al 200 % en 390 px también sin desbordamiento en los seis idiomas. El detector geométrico incluye el input trampa oculto; no es contenido visible ni desborda el documento.
- Formularios de los seis idiomas: validación obligatoria y de longitud, conservación de datos ante error, alternativa de correo y confirmación localizada con respuesta simulada. Payload con `intent: retreat` y el idioma correcto.
- Analítica probada con la habilitación del entorno aislada y el recurso de Google sustituido por una respuesta local: no carga antes del consentimiento; el CTA registra su evento; la revocación detiene el seguimiento.
- Sin errores de ejecución en navegador. Capturas de escritorio y móvil revisadas en una misma ronda.
- Detector visual: seis avisos consultivos de tamaños tipográficos específicos de esta página; ningún hallazgo obligatorio. Se conserva la familia tipográfica, la paleta y los componentes existentes.

Evidencia local en `artifacts/retreats-2026-11-11/report.json`, capturas de esa carpeta y script `artifacts/retreats-qa.cjs`. El script espera al foco de validación antes de rellenar para evitar carreras en la automatización.

## Pendientes para completar la oferta comercial

El usuario no ha facilitado todavía nombres, duración, contenido, fechas ni precios de los programas de Valencia, ni un enlace/proveedor de reserva. La búsqueda local y la búsqueda dirigida de BMYGYM en Drive no aportaron esos datos. La pregunta está planteada en el chat. Se muestra una invitación honesta a consultar esa información; no hay programas ni importes inventados.

La solicitud no es una reserva confirmada. El entorno local carece de configuración de entrega real; consultar `docs/contact-setup.md`. Las pruebas no enviaron correos ni realizaron reservas y no acreditan recogida real de eventos por Google. No se publicó ni se subió el sitio al repositorio remoto.

## Revisión independiente final

**FIX — presentación visual lista; oferta comercial todavía incompleta.**

| Hallazgo | Estado | Veredicto |
|---|---|---|
| Programas, precios y reserva directa de Valencia | Pendiente | Faltan datos confirmados y destino de reserva. La consulta actual es honesta. |
| Entrega real del formulario | Pendiente | Falta configurar y verificar el correo. Las pruebas simuladas no acreditan entrega. |
| Registro de validación | Resuelto | El documento existe y distingue pruebas, simulaciones y limitaciones. |
| Escalas tipográficas específicas | Resuelto | El brief documenta las variantes intencionales que originaban los seis avisos consultivos. |

No se requieren nuevos ajustes visuales por estos cuatro hallazgos. La página permanece como previsualización local, sin publicación ni afirmación de reserva confirmada.
