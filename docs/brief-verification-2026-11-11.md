# Verificación de las notas de BMYGYM — 11 de noviembre de 2026

Auditoría de la implementación local frente al listado original de 15 puntos, realizada a petición del usuario después de preparar la vista previa. Se inspeccionaron el código, los cambios respecto al commit `ad0896b` y la aplicación en `http://127.0.0.1:3112`. Esta revisión no modificó el sitio ni publicó cambios.

Se consideran también las aclaraciones posteriores: las páginas de Retreats y consultas debían crearse y el usuario todavía no dispone de destinos, fechas o disponibilidad. Por tanto, su alcance actual es solicitar información o una consulta pendiente de confirmación individual.

## Resultado por punto

| Nota | Estado | Resultado comprobado |
| --- | --- | --- |
| 1. Identidad y pop-up | Implementado | Composición, textos de marca, tipografías y colores conservados. Cierre recordado durante 180 días. Comprobado a 320, 390 y 1440 px y en horizontal a 844 × 390; en horizontal admite desplazamiento vertical interno. |
| 2. Hero | Implementado | Frase, descripción, línea pequeña y CTA coinciden con la nota; el botón lleva a `#enquiry`. Imagen original conservada. |
| 3. Filosofía | Implementado | Párrafos completos y frase “BMYGYM doesn’t sell equipment. BMYGYM creates environments.” destacados en la sección existente. |
| 4. Private Clients / Professional Partners | Implementado | Ambas categorías conservan sus imágenes e incluyen los tres bloques solicitados. La colaboración con especialistas y fabricantes europeos independientes está explícita en Filosofía. |
| 5. Land / Sea / Air | Implementado | Tres categorías independientes con las imágenes y textos solicitados. AERO ONE identificado como concepto en desarrollo sin certificación ni disponibilidad comercial. |
| 6. Signature Concepts | Textos implementados; selección pendiente | Título, subtítulo e introducción actualizados. Se conservaron Fitness Wall, Recovery Capsule, AERO ONE y el AERO SIGNATURE preexistente. ORVÉA™, AURÉLIA™ y LUMERA™ no se han incorporado ni renombrado: la nota exige revisarlos juntos antes. |
| 7. Private Longevity Blueprint | Implementado | Servicio profesional remunerado e independiente, tres fases y advertencia sobre acuerdo separado para implementar. Sin tarifas públicas. |
| 8. Private Commissions | Interfaz implementada; envío pendiente | Ocho campos en el orden pedido, categorías y etapas exactas, empresa/plazo opcionales y sin presupuesto. Confirmación exacta y validación localizadas. En esta preview el servidor devuelve 503 por falta de origen permitido; tampoco se acreditó configuración/recepción de correo real. |
| 9. Fundadora | Implementado | Fotografía, nombre y “Founder, BMYGYM” conservados discretamente. Sin nueva biografía ni repetición de CEO. LinkedIn era opcional y no se inventó un enlace. |
| 10. Retreats | Implementado según aclaración | Página separada, acceso desde cabecera/pie y formulario de solicitud. No hay disponibilidad ni reservas instantáneas inventadas. La entrega de sus solicitudes depende de la misma configuración de correo pendiente. |
| 11. Idiomas | Implementado; pequeños ajustes de redacción | EN · DE · ES · FR · RU · IT. 42 rutas localizadas responden 200. Diccionarios completos y cambio de idioma conserva ruta, query y ancla. Hay detalles menores descritos abajo; no se atribuye revisión humana nativa. |
| 12. Estética | Conservada | Sin cambios en `public/`, fuentes o paleta. Adaptaciones de texto/formularios dentro del diseño existente. Sin tienda, descuentos, precios o temporizadores. |
| 13. SEO, Google y editorial | Parcial | Metadatos, canonical/hreflang, sitemap condicionado y código de Analytics preparados. Preview correctamente excluida de indexación. Search Console y recepción real de eventos pendientes; no se detecta token de verificación en esta preview. Blog aplazado conforme a prioridad 4. Faltan eventos para clics de navegación hacia Retreats y consulta privada. |
| 14. Evolución futura | Alcance respetado | No hay membresía, cuotas o formulario del Private Longevity Circle. Blog, nuevos vídeos y recorrido virtual permanecen para después. |
| 15. Revisión técnica | Revisada con pendientes | Pruebas de textos, campos, idioma, navegación, responsive normal y rendimiento local realizadas. Pendientes de activación externa y detalles de accesibilidad/seguimiento enumerados a continuación. |

## Ajustes concretos detectados

### P2 — Desbordamiento con texto ampliado al 200 %

A 390 px y con el tamaño raíz del texto duplicado, el documento ocupa aproximadamente 536 px en los seis idiomas. El logotipo del pie y los mínimos de la cuadrícula propagan el ancho extra; algunos elementos del formulario también exceden ligeramente el ancho disponible. Esto obliga a desplazarse horizontalmente al usar texto grande. No se reproduce con tamaño normal a 320, 390, 768 o 1440 px.

Evidencia: `src/app/globals.css:1218`, `src/app/globals.css:1939`, `src/app/globals.css:1951`; `artifacts/notes-review-2026-11-11/zoom-overflow.json` y `text-200-percent.png`. Recomendación: ajustar mínimos de cuadrículas y comportamiento del wordmark/contacto bajo texto ampliado, manteniendo la apariencia normal. Es una comprobación de ampliación tipográfica, no una certificación WCAG completa. Comando sugerido: `$impeccable adapt`.

### P2 — Medición incompleta de accesos a reservas

`src/components/privacy/analytics.tsx:75` reconoce enlaces a `#enquiry` y `mailto:hello@bmygym.com`. No reconoce los accesos a `/retreats` y `/private-consultation` de cabecera/pie. Los envíos exitosos sí distinguen las tres intenciones. Recomendación: incorporar eventos específicos para ambos accesos, condicionados al consentimiento y sin datos personales. Comando sugerido: `$impeccable harden`.

### P3 — Textos compartidos demasiado orientados a proyectos

Retreats utiliza la validación de longitud de mensaje que pide describir un “proyecto”, aunque se trata de una consulta sobre un retiro. En italiano, el placeholder del plazo habla de fecha de finalización. Recomendación: mensajes y ejemplos específicos para cada solicitud. Evidencia: `src/features/booking/request-form.tsx:62`, `src/i18n/es-common.json:111`, `src/i18n/it-common.json:80`. Comando sugerido: `$impeccable clarify`.

### P3 — Espacio en la frase italiana de privacidad

La combinación de `Ho letto l’` y el espacio insertado antes del enlace produce `Ho letto l’ Informativa`. Corregir la composición translatable sin afectar los otros idiomas. Evidencia: `src/i18n/it-common.json:82`, `src/features/enquiry/enquiry-form.tsx:371`, `src/features/booking/request-form.tsx:134`. Comando sugerido: `$impeccable clarify`.

Tras los ajustes, una pasada acotada de `$impeccable polish` puede confirmar que se conserva la presentación original.

## Activación y decisiones pendientes

- **Correo:** configurar origen permitido (`SITE_URL`) y credenciales/remitente de Resend en el entorno correspondiente, y comprobar recepción real en el correo empresarial. El POST de auditoría usó únicamente `{}` y fue rechazado antes de poder enviar un correo. Las pruebas con proveedor simulado no acreditan entrega real.
- **Google:** completar/verificar propiedad en Search Console y recepción de eventos en Analytics. `noindex`, robots bloqueado y sitemap vacío son apropiados para esta preview, no un error a corregir antes de aprobar publicación. La ausencia de etiqueta HTML no demuestra por sí sola ausencia de verificación DNS externa.
- **Conceptos:** revisar cuáles se presentan públicamente y la correspondencia de los nombres ORVÉA™, AURÉLIA™, LUMERA™ con las imágenes existentes; decidir también la permanencia del AERO SIGNATURE heredado.
- **Retreats y consultas:** la falta de fechas/destinos está confirmada por el usuario; las páginas funcionan como solicitudes pendientes de respuesta, no como agenda de reservas.

## Evidencia técnica de esta revisión

- `npm test`: 28/28 pruebas aprobadas.
- Comparación de 15 textos representativos renderizados contra el brief: coinciden ignorando mayúsculas y saltos de línea tipográficos. Además se inspeccionaron los demás párrafos y su conexión al JSX.
- Ocho campos y cinco opciones en cada selector de categoría/etapa comprobados en el navegador.
- 24 combinaciones idioma/ancho normales sin desbordamiento; seis pruebas de texto al 200 % reproducen el problema descrito.
- Pop-up revisado en 24 combinaciones de idioma/tamaño, incluidos móviles en horizontal.
- Menú móvil, Escape y conservación del perfil profesional en enlaces de idioma comprobados.
- 42 rutas: inicio, dos páginas de solicitudes y cuatro páginas legales × seis idiomas; HTTP 200 y `lang` correcto.
- Sin errores JavaScript observados durante el recorrido.
- Detector de Impeccable: 49 avisos orientativos sobre colores/tamaños no reflejados exactamente en DESIGN.md; cero hallazgos no orientativos. No son 49 fallos visuales ni motivo para alterar la estética pedida. La comparación con la base confirma la conservación de recursos y sistema visual.
- Rendimiento de una navegación local de retorno sin pop-up: escritorio sin limitación, LCP 0,172 s, CLS 0; móvil simulado con 1,6 Mbps, latencia 150 ms y CPU ×4, LCP 1,112 s, CLS 0,0027, carga 2,19 s, aproximadamente 342 kB transferidos. Son mediciones locales puntuales, no resultados de usuarios reales ni verificación del hosting público.

Valoración técnica orientativa: accesibilidad 3/4, rendimiento 3/4, responsive 3/4, coherencia de tema 4/4 e integridad 3/4; total 16/20. El tema claro fijo es intencionado. La valoración no sustituye los pendientes funcionales anteriores ni una evaluación formal de accesibilidad.

Archivos de evidencia local: `artifacts/notes-review-2026-11-11.cjs`, `artifacts/notes-review-2026-11-11/report.json`, `artifacts/notes-zoom-diagnosis.cjs` y `artifacts/notes-review-detector.json`. `artifacts/` está excluida de Git.
