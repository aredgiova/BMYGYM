# Configuración de consultas y solicitudes

`POST /api/v1/contact` valida la solicitud en el servidor y envía un correo de texto mediante la API de Resend. Atiende Private Commissions, BMYGYM Retreats y solicitudes de consulta privada, con mensajes en inglés, alemán, español, francés, ruso e italiano (`en`, `de`, `es`, `fr`, `ru`, `it`). No guarda consultas en el sistema de archivos ni imprime datos personales en logs. La respuesta de éxito confirma la aceptación por el proveedor de correo; la entrega final debe verificarse en Resend y en la bandeja destinataria. No confirma una reserva, una cita ni la aceptación de un proyecto.

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

4. Reiniciar el servidor después de cambiar variables. Revisar el remitente y destinatario antes de realizar una prueba manual autorizada. El campo `Reply-To` conserva el correo del visitante, de manera que se puede responder desde la bandeja de entrada. El asunto distingue los tres tipos de solicitud. El cuerpo incluye `intent`, los datos de contacto, el idioma, el mensaje y el plazo opcional. Solo Private Commissions incluye además el perfil derivado, la categoría, la ubicación, la etapa y la empresa opcional.

Sin credenciales, remitente o configuración de origen válidos, el endpoint devuelve `503` con la dirección de contacto. Nunca presenta un envío ficticio como exitoso.

## Contrato de Private Commissions

El formulario principal presenta los ocho campos solicitados, en este orden: Full Name, Company / Organisation (opcional), Email Address, Project Category, Project Location, Project Stage, Brief Project Description y Expected Timeline (opcional). Incluye también la aceptación obligatoria de la política de privacidad. No pide presupuesto.

```json
{
  "intent": "private-commission",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "locale": "en",
  "projectType": "Private Residence",
  "location": "London, United Kingdom",
  "projectStage": "Concept",
  "message": "I would like to discuss a private wellness space.",
  "privacy": true,
  "company": "Optional company",
  "expectedTimeline": "Spring 2027",
  "website": ""
}
```

- `intent`: `private-commission`, `retreat` o `private-consultation`. Si se omite, se usa `private-commission`. Un valor presente vacío, no admitido o de tipo incorrecto se rechaza.
- `fullName`, `email` y `message`: obligatorios en los tres tipos de solicitud. El nombre admite 2–120 caracteres; el correo, una dirección válida de hasta 254 caracteres; el mensaje, 20–5.000 caracteres.
- `locale`: `en`, `de`, `es`, `fr`, `ru` o `it`. Si se omite, se guarda `en` para mantener compatibilidad. Un valor presente pero no admitido, vacío o de tipo incorrecto produce un error de validación.
- `projectType`: obligatorio para Private Commissions; `Private Residence`, `Luxury Hospitality`, `Superyacht`, `Private Aviation` o `Professional Partnership`.
- `location`: obligatoria para Private Commissions, 2–160 caracteres.
- `projectStage`: obligatorio para Private Commissions; `Concept`, `Planning`, `Development`, `Refit` u `Other`.
- `company`: opcional para Private Commissions, máximo 160 caracteres. `expectedTimeline`: opcional en los tres tipos de solicitud, máximo 160 caracteres. Los campos opcionales vacíos se omiten del resultado validado.
- `clientType` ya no es un campo del formulario ni un dato requerido del navegador. El servidor deriva `Professional Partner` de la categoría `Professional Partnership` y `Private Client` de las demás categorías. Un `clientType` enviado por el cliente se ignora.
- Las etiquetas de categorías y etapas se traducen en la interfaz; los valores del contrato conservan los identificadores anteriores. El servidor descarta campos ajenos al contrato, incluido cualquier presupuesto enviado.
- `privacy`: debe ser el booleano `true`.
- `website`: campo trampa opcional; debe estar vacío. Ocultarlo visualmente y excluirlo de la navegación por teclado y de los lectores de pantalla.
- Requiere `Content-Type: application/json` y `Origin` igual al origen configurado o a la URL exacta de preview autorizada. El cuerpo está limitado a 40 KiB (40.960 bytes), incluidos cuerpos enviados sin `Content-Length`. Este margen permite completar los campos hasta sus límites con texto cirílico, también cuando el JSON representa los caracteres como secuencias Unicode escapadas.

## Contratos de Retreats y consulta privada

Las páginas `/retreats` y `/private-consultation` tienen formularios independientes, disponibles también con los prefijos `/de`, `/es`, `/fr`, `/ru` e `/it`. Ambos exigen únicamente nombre, correo, mensaje y aceptación de privacidad; el plazo preferido es opcional. No solicitan categoría, ubicación, etapa, empresa ni presupuesto.

Solicitud sobre Retreats:

```json
{
  "intent": "retreat",
  "locale": "es",
  "fullName": "Ana García",
  "email": "ana@example.com",
  "message": "Me gustaría conocer los próximos destinos y las fechas disponibles.",
  "expectedTimeline": "Primavera de 2027",
  "privacy": true,
  "website": ""
}
```

Solicitud de consulta privada:

```json
{
  "intent": "private-consultation",
  "locale": "it",
  "fullName": "Giulia Rossi",
  "email": "giulia@example.com",
  "message": "Vorrei discutere un progetto per una residenza privata.",
  "privacy": true,
  "website": ""
}
```

Los correos usan los asuntos `BMYGYM Retreats · Enquiry` y `BMYGYM · Private consultation request`, respectivamente. No incluyen campos exclusivos de Private Commissions. Cada formulario muestra su confirmación localizada solo después de la aceptación por el proveedor: Retreats informa que los detalles y la disponibilidad se acuerdan directamente; la consulta privada requiere una revisión inicial y la confirmación posterior de la cita. No se publica disponibilidad inventada ni se registra una reserva automática.

## Idiomas, respuestas y accesibilidad

El formulario envía además `X-BMYGYM-Locale` con el código de idioma actual. La API utiliza esta cabecera para localizar errores que pueden ocurrir antes de leer el cuerpo, como origen rechazado, formato incorrecto, exceso de tamaño o JSON inválido. Una cabecera ausente o no reconocida usa inglés. Una vez leído el JSON, un `locale` válido del cuerpo selecciona los mensajes de validación y envío; un `locale` inválido se rechaza. Los mensajes proceden únicamente de los diccionarios del servidor, nunca de texto proporcionado por el cliente.

Respuestas: `{ success, data, message, error }`. Los errores de campo están en `error.fields`. Estados: `400` validación o JSON, `403` origen rechazado, `413` cuerpo demasiado grande, `415` formato no admitido, `502` proveedor rechazó el envío y `503` servicio no configurado o temporalmente no disponible. El proveedor tiene un tiempo máximo de espera de ocho segundos; los errores internos y claves no se devuelven al visitante.

La interfaz usa `noValidate` y `validateEnquiry` con el diccionario seleccionado para que las validaciones aparezcan en el idioma de la web, con independencia del idioma del navegador. Mantiene etiquetas visibles, relaciona los errores con los controles mediante ARIA y enfoca el primer campo que necesita corrección. Los mensajes de envío y resultado se anuncian en una región de estado. La API aplica la misma validación de nuevo antes de contactar con el proveedor.

## Verificación y publicación

`npm test` ejecuta actualmente 28 pruebas entre `tests/enquiry.test.ts` y `tests/i18n.test.ts`. Cubren las combinaciones de categoría y etapa, campos requeridos y opcionales, los tres valores de `intent`, las seis versiones de idioma, perfiles derivados, respuestas tempranas y entrega simulada de la API, asuntos y contenidos de las notificaciones, rechazo de valores no admitidos, límites del cuerpo, integridad de diccionarios y rutas localizadas. Las pruebas de correo sustituyen la red con mocks y no envían correos reales:

```powershell
npm test
```

En esta revisión no se ha comprobado la entrega real de correo. La comprobación local encontró `SITE_URL`, `RESEND_API_KEY` y `ENQUIRY_FROM_EMAIL` sin configurar; ese resultado no determina la configuración existente en el proveedor de hosting. La recepción efectiva queda pendiente de una prueba autorizada con la configuración real.

Antes de publicar esta revisión, verificar la configuración real del correo y los límites de solicitudes del WAF/hosting o de un almacén compartido. La validación de origen y el campo trampa reducen envíos desde otros sitios y automatización básica, pero no sustituyen un límite distribuido contra bots. Esta base no utiliza contadores en memoria que se perderían entre instancias serverless. También se deben definir la política de privacidad, la retención de consultas y el acceso del equipo al proveedor de correo. La publicación y cualquier prueba con correo real requieren la aprobación correspondiente; esta documentación no afirma que se hayan realizado.

Referencia del envío: [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email).
