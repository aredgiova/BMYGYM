# Lista de publicación de BMYGYM

Usar esta lista antes de abrir el sitio al público. El despliegue y la activación del envío requieren su configuración real; una preview y las pruebas simuladas no verifican por sí solas la entrega del correo.

## Marca y contenido

- [ ] Aprobar el contenido en inglés, las llamadas a la acción y la descripción del servicio de pago Private Longevity Blueprint.
- [ ] Recibir e integrar el logotipo oficial y el arte final de AERO ONE, con sus variantes necesarias.
- [ ] Revisar el uso de las imágenes como visualizaciones conceptuales y sus textos alternativos; no atribuir instalaciones ejecutadas ni certificaciones no acreditadas.
- [ ] Confirmar los datos de contacto públicos y el destinatario de las consultas.

## Información legal y privacidad

- [x] Integrar titular y dirección profesional facilitados: Bojana Pesic, Avda. Primado Reig 129, Entlo. D, 46020 Valencia, España.
- [x] Sustituir los cuatro textos provisionales por los documentos facilitados con fecha 28 de octubre de 2026 y sus traducciones; conservar los enlaces del pie y retirar los avisos de borrador.
- [x] Implementar localmente el [aviso informativo propio de cookies](cookie-notice.md) en cinco idiomas, con política enlazada, cierre recordado durante 180 días y reapertura desde el pie; el cierre no consiente seguimiento.
- [x] Verificar el aviso en la compilación local: 20 combinaciones de idioma/ancho, teclado, recarga, vigencia, sincronización entre pestañas y almacenamiento no disponible; resultados en [Validación](validation.md).
- [ ] Confirmar en la operación real la gestión y retención de consultas, acceso del equipo, acuerdos con proveedores y transferencias descritos en la política de privacidad.
- [ ] Comprobar las cookies y los servicios del hosting definitivo. La aplicación actual no carga seguimiento opcional; las comprobaciones locales no acreditan la infraestructura publicada.
- [ ] Si se incorpora analítica, publicidad o contenido externo con seguimiento, bloquearlo hasta obtener la elección del visitante y permitir rechazar o cambiar preferencias posteriormente.

## Correo y protección del formulario

- [ ] Seguir [Configuración de consultas](contact-setup.md) y verificar en Resend el dominio del remitente.
- [ ] Configurar `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` y `ENQUIRY_TO_EMAIL` como variables privadas; confirmar la bandeja de destino.
- [ ] Configurar `SITE_URL` con el origen exacto del entorno y comprobar la redirección entre `www` y el dominio sin `www`.
- [ ] Añadir límites de solicitudes en el WAF/hosting o mediante un almacén compartido. El control de origen y el campo trampa no sustituyen una protección distribuida contra abuso.
- [ ] Realizar una prueba de correo real autorizada de extremo a extremo: formulario, aceptación del proveedor, recepción y respuesta mediante `Reply-To`.
- [ ] Verificar errores de validación, fallo del proveedor y ausencia de configuración; nunca mostrar como enviado un correo no aceptado.
- [ ] Confirmar que los registros no exponen secretos ni el contenido personal de las consultas.

## Calidad y revisión visual

- [ ] Ejecutar `npm ci`, `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`; guardar los resultados del código que se publicará.
- [ ] Iniciar la compilación con `npm start` y revisar todas las páginas y `GET /api/health`.
- [ ] Aprobar la versión final de escritorio y móvil, incluidos anchos de 320, 375, 768, 1024 y 1440 píxeles.
- [ ] Comprobar enlaces, navegación por anclas, menú móvil, estados del formulario y ausencia de desbordamiento horizontal.
- [ ] Revisar navegación por teclado, foco visible, cierre del menú con Escape, etiquetas, mensajes accesibles, contraste y preferencia de movimiento reducido.
- [ ] Comprobar carga de imágenes y fuentes locales, errores del navegador y comportamiento con conexión lenta.

## Dominio, migración y despliegue

- [ ] Crear o seleccionar el repositorio GitHub, configurar el remoto y comprobar que ningún secreto se incluye en el historial.
- [ ] Importar el repositorio en Vercel como Next.js con Node.js 22.x y configurar variables separadas para preview y producción.
- [ ] Revisar las previews con `ENABLE_INDEXING=false`; mantener los borradores fuera de buscadores.
- [ ] Definir el dominio canónico, DNS y redirecciones de dominio; comprobar HTTPS.
- [ ] Obtener el inventario de URLs del sitio Wix anterior y acordar sus destinos. El sitio anterior no pudo verificarse mediante la consulta web realizada; el mapa de redirecciones sigue pendiente.
- [ ] Implementar y comprobar las redirecciones de las URLs antiguas antes de sustituir el sitio existente.
- [ ] Revisar títulos, descripciones, URL canónica, imagen social, `robots.txt` y `sitemap.xml` en producción.
- [ ] Obtener la aprobación final de contenido, diseño y publicación; activar `ENABLE_INDEXING=true` en producción cuando corresponda.
- [ ] Publicar, comprobar el dominio y el formulario de nuevo, y conservar una versión anterior recuperable.

Referencias: [README](../README.md), [configuración del correo](contact-setup.md), [aviso de cookies](cookie-notice.md) y [manifiesto de recursos](asset-manifest.md).
