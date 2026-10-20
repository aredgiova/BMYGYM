# Configuración de consultas de proyectos

`POST /api/v1/contact` valida la consulta en el servidor y envía un correo de texto mediante la API de Resend. Admite clientes particulares y colaboradores profesionales, con mensajes en inglés, alemán, francés, español y ruso. No guarda consultas en el sistema de archivos ni imprime datos personales en logs. La respuesta de éxito confirma la aceptación por el proveedor de correo; la entrega final debe verificarse en Resend y en la bandeja destinataria.

## Activar el envío

1. Verificar la configuración de la cuenta y el dominio de envío en Resend, siguiendo su [documentación de dominios](https://resend.com/docs/dashboard/domains/introduction). Si aún no están configurados, crear la cuenta y aplicar los registros DNS indicados por el proveedor.
2. Verificar o crear una API key con permiso de envío para el dominio autorizado.
3. Configurar estas variables privadas en `.env.local` para desarrollo y en los secretos del proveedor de hosting para producción:

```dotenv
SITE_URL=http://localhost:3000
RESEND_API_KEY=re_REEMPLAZAR
ENQUIRY_FROM_EMAIL=website@bmygym.com
ENQUIRY_TO_EMAIL=hello@bmygym.com
```

`ENQUIRY_FROM_EMAIL` debe ser una dirección simple de un dominio verificado, sin nombre de presentación. `ENQUIRY_TO_EMAIL` es opcional y su valor por defecto es `hello@bmygym.com`. El destinatario nunca se toma del navegador. Las claves y el remitente no deben llevar prefijo `NEXT_PUBLIC_` ni incluirse en el repositorio.

En producción, sustituir `SITE_URL` por el origen público real, por ejemplo `https://bmygym.com`. Debe coincidir con el origen desde el que se abre el formulario; configurar la redirección entre el dominio con y sin `www`. Las previews de Vercel admiten adicionalmente su URL exacta cuando el servidor proporciona `VERCEL_ENV=preview` y `VERCEL_URL`: habilitar el acceso a las [variables de sistema de Vercel](https://vercel.com/docs/environment-variables/system-environment-variables). No se admiten otros dominios `*.vercel.app`. Para un alias de rama, un dominio de preview personalizado u otro hosting, configurar su URL concreta en `SITE_URL`. No se confía en `Host`, `X-Forwarded-Host` ni en un `Origin` proporcionado por el cliente para construir la lista de orígenes permitidos.

4. Reiniciar el servidor después de cambiar variables. Revisar el remitente y destinatario antes de realizar una prueba manual autorizada. El campo `Reply-To` conserva el correo del visitante, de manera que se puede responder desde la bandeja de entrada. El mensaje incluye el perfil del cliente, el tipo de proyecto y el código de idioma elegido en la web.

Sin credenciales, remitente o configuración de origen válidos, el endpoint devuelve `503` con la dirección de contacto. Nunca presenta un envío ficticio como exitoso.

## Contrato

```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "clientType": "Private Client",
  "locale": "en",
  "projectType": "Private Residence",
  "message": "I would like to discuss a private wellness space.",
  "privacy": true,
  "company": "Optional company",
  "location": "Optional location",
  "website": ""
}
```

- `fullName`: 2–120 caracteres; `email`: dirección válida de hasta 254 caracteres.
- `clientType`: obligatorio; `Private Client` o `Professional Partner`.
- `locale`: `en`, `de`, `fr`, `es` o `ru`. Si se omite, se guarda `en` para mantener compatibilidad. Un valor presente pero no admitido, vacío o de tipo incorrecto produce un error de validación.
- `message`: 20–5.000 caracteres; `company` y `location`: opcionales, máximo 160 caracteres cada uno.
- `projectType`: `Private Residence`, `Superyacht / Yacht`, `Luxury Hospitality`, `Private Aviation` u `Other Bespoke Project`.
- Las etiquetas de perfiles y proyectos se traducen en la interfaz; los valores del contrato conservan los identificadores anteriores.
- `privacy`: debe ser el booleano `true`.
- `website`: campo trampa opcional; debe estar vacío. Ocultarlo visualmente y excluirlo de la navegación por teclado y de los lectores de pantalla.
- Requiere `Content-Type: application/json` y `Origin` igual al origen configurado o a la URL exacta de preview autorizada. El cuerpo está limitado a 32 KiB, incluidos cuerpos enviados sin `Content-Length`. Este margen permite mensajes de hasta 5.000 caracteres cirílicos también cuando el JSON los representa como secuencias Unicode escapadas.

El formulario envía además `X-BMYGYM-Locale` con el código de idioma actual. La API utiliza esta cabecera para localizar errores que pueden ocurrir antes de leer el cuerpo, como origen rechazado, formato incorrecto, exceso de tamaño o JSON inválido. Una cabecera ausente o no reconocida usa inglés. Una vez leído el JSON, un `locale` válido del cuerpo selecciona los mensajes de validación y envío; un `locale` inválido se rechaza. Los mensajes proceden únicamente de los diccionarios del servidor, nunca de texto proporcionado por el cliente.

Respuestas: `{ success, data, message, error }`. Los errores de campo están en `error.fields`. Estados: `400` validación o JSON, `403` origen rechazado, `413` cuerpo demasiado grande, `415` formato no admitido, `502` proveedor rechazó el envío y `503` servicio no configurado o temporalmente no disponible. El proveedor tiene un tiempo máximo de espera de ocho segundos; los errores internos y claves no se devuelven al visitante.

La interfaz usa `noValidate` y `validateEnquiry` con el diccionario seleccionado para que las validaciones aparezcan en el idioma de la web, con independencia del idioma del navegador. Mantiene etiquetas visibles, relaciona los errores con los controles mediante ARIA y enfoca el primer campo que necesita corrección. Los mensajes de envío y resultado se anuncian en una región de estado. La API aplica la misma validación de nuevo antes de contactar con el proveedor.

## Verificación y publicación

`npm test` ejecuta actualmente 22 pruebas entre `tests/enquiry.test.ts` y `tests/i18n.test.ts`. Cubren validación, perfiles, los cinco idiomas, respuestas tempranas y entrega simulada de la API, rechazo de valores no admitidos, límites del cuerpo, integridad de diccionarios y rutas localizadas. Las pruebas de correo sustituyen la red con mocks y no envían correos reales:

```powershell
npm test
```

Antes de publicar esta revisión, verificar la configuración real del correo y los límites de solicitudes del WAF/hosting o de un almacén compartido. La validación de origen y el campo trampa reducen envíos desde otros sitios y automatización básica, pero no sustituyen un límite distribuido contra bots. Esta base no utiliza contadores en memoria que se perderían entre instancias serverless. También se deben definir la política de privacidad, la retención de consultas y el acceso del equipo al proveedor de correo. La publicación y cualquier prueba con correo real requieren la aprobación correspondiente; esta documentación no afirma que se hayan realizado.

Referencia del envío: [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email).
