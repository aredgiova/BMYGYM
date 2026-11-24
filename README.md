# BMYGYM

Sitio de presentación de BMYGYM como creador e integrador de entornos de longevidad a medida para residencias, superyates, hospitality y aviación privada. Combina sus propios Signature Concepts con productos premium seleccionados de fabricantes especializados y se dirige tanto a clientes particulares como a colaboradores profesionales.

La revisión del 18 de noviembre de 2026 conserva la estructura, las imágenes y la identidad visual del sitio. El inglés sigue siendo el idioma principal; la interfaz, los contenidos, las páginas informativas y los formularios están disponibles en siete idiomas, en este orden: EN · DE · ES · FR · RU · IT · AR. La versión árabe usa lectura de derecha a izquierda y fuentes árabes locales. El Private Longevity Blueprint se presenta como un servicio profesional independiente y remunerado, con tres etapas de desarrollo conceptual; su ejecución posterior requiere un acuerdo separado. AERO ONE conserva únicamente la última imagen facilitada y se identifica como un concepto en desarrollo, sin certificación ni disponibilidad comercial, sujeto a los requisitos aeronáuticos aplicables.

Private Commissions, BMYGYM Retreats y las solicitudes de consulta privada tienen recorridos de contacto separados. Las nuevas páginas de Retreats y consulta permiten solicitar información o coordinación de una reserva; no publican fechas, disponibilidad, precios ni confirmaciones automáticas de reserva.

El código se mantiene en [aredgiova/BMYGYM](https://github.com/aredgiova/BMYGYM), con `main` como rama de publicación. El correo local permanece sin configurar y las pruebas automatizadas no comprueban entregas reales. Las instrucciones de despliegue de este documento describen la configuración que debe comprobarse al publicar; no acreditan por sí solas el estado actual del hosting. El alcance y la validación del árabe se documentan en [Implementación árabe](docs/arabic-implementation-2026-11-18.md).

## Desarrollo local

Requiere Node.js 22.x y npm. Desde la raíz del proyecto:

```powershell
npm install
Copy-Item .env.example .env.local
```

En `.env.local`, establecer `SITE_URL=http://localhost:3000` y mantener `ENABLE_INDEXING=false`. Después:

```powershell
npm run dev
```

Abrir [localhost:3000](http://localhost:3000). El sitio puede visualizarse sin credenciales de correo; en ese caso, el formulario comunica que el envío no está disponible y ofrece el contacto directo.

| Comando             | Uso                                                                      |
| ------------------- | ------------------------------------------------------------------------ |
| `npm install`       | Instalar las dependencias del proyecto                                   |
| `npm run dev`       | Iniciar el servidor de desarrollo                                        |
| `npm run lint`      | Comprobar las reglas de ESLint, sin advertencias permitidas              |
| `npm run typecheck` | Generar tipos de rutas y comprobar TypeScript                            |
| `npm test`          | Ejecutar las 32 pruebas de consultas, reservas, API, correo simulado, localización y datos estructurados |
| `npm run build`     | Crear la compilación de producción                                       |
| `npm start`         | Servir una compilación de producción ya creada                           |

En integración continua, usar `npm ci` con el archivo de bloqueo versionado. Las pruebas automatizadas no envían correos reales. La compilación, revisión visual y prueba real de entrega deben verificarse por separado; esta documentación no acredita su aprobación.

## Arquitectura

- Next.js con App Router y ejecución Node.js; React para la interfaz.
- TypeScript con `strict: true` y alias `@/` para `src/`.
- Tailwind CSS y estilos globales para el sistema visual y la adaptación a distintos tamaños de pantalla.
- Componentes de servidor por defecto, con componentes de cliente para navegación móvil, selector de idioma, presentación de bienvenida, consentimiento de analítica y formularios.
- Páginas bajo `src/app/[locale]/`; `src/proxy.ts` sirve el inglés en URLs sin prefijo. Los otros idiomas usan `/de`, `/es`, `/fr`, `/ru`, `/it` y `/ar`, sin cambiar automáticamente el idioma del visitante.
- Diccionarios tipados `src/i18n/{idioma}-home.json`, `{idioma}-common.json` y `{idioma}-booking.json`. `dictionaries.ts` carga el contenido principal; `common.ts` proporciona mensajes de API; `booking.ts` proporciona los textos de solicitudes de Retreats y consultas privadas; `config.ts` define idiomas y rutas. Los nombres de marca existentes se conservan hasta su revisión editorial.
- Sharp para la optimización de imágenes. Las imágenes conceptuales se entregan desde `public/images/`; Bodoni Moda y Manrope se sirven localmente desde `public/fonts/`.
- La API de Resend se invoca con `fetch` del servidor; las claves y la configuración de correo permanecen privadas.

Las dependencias de aplicación se limitan a Next.js, React, React DOM y Sharp. TypeScript, ESLint, Tailwind y PostCSS cubren desarrollo, validación y estilos. Esta fase no necesita PostgreSQL, Prisma, autenticación ni un servidor independiente: las consultas se envían por correo y no se guardan en una base de datos de la aplicación.

```text
src/app/[locale]/        Inicio, páginas informativas y metadatos por idioma
src/app/api/             Endpoints de salud y consultas
src/proxy.ts             Resolución de las URLs sin prefijo al inglés
src/components/          Navegación, pie, composición legal y elementos compartidos
src/features/home/       Secciones de la página principal
src/features/enquiry/    Sección y formulario de consulta
src/features/booking/    Páginas y solicitudes de Retreats y consultas privadas
src/config/              Configuración pública del sitio e indexación
src/i18n/                Diccionarios, tipos, idioma y enlaces localizados
src/services/            Integración privada con el proveedor de correo
src/validations/         Validación de las consultas
public/images/           Imágenes optimizadas del proyecto
public/fonts/            Fuentes locales y licencias
tests/                   Pruebas de validación, API, correo simulado e idiomas
docs/                    Guías de configuración, recursos y publicación
```

## Rutas

| Ruta                   | Contenido                                                             |
| ---------------------- | --------------------------------------------------------------------- |
| `/`                    | Inicio, filosofía, entornos, Blueprint, proceso, conceptos y consulta |
| `/de`, `/es`, `/fr`, `/ru`, `/it`, `/ar` | La misma experiencia en alemán, español, francés, ruso, italiano y árabe |
| `/retreats`             | BMYGYM Retreats y solicitud de información o reserva                  |
| `/private-consultation` | Solicitud de consulta privada, pendiente de coordinación             |
| `/legal`               | Aviso legal y datos profesionales de Bojana Pesic                     |
| `/privacy`             | Política de privacidad y tratamiento de consultas                    |
| `/cookies`             | Política de cookies y funcionamiento actual                          |
| `/accessibility`       | Declaración de accesibilidad y canal de contacto                     |
| `GET /api/health`      | Estado básico del servidor; no comprueba la entrega de correo         |
| `POST /api/v1/contact` | Validación de la consulta y envío mediante Resend                     |

Las seis páginas auxiliares tienen equivalentes en los otros seis idiomas, por ejemplo `/de/privacy`, `/ru/legal`, `/es/retreats` o `/ar/private-consultation`. Las URLs públicas del inglés permanecen sin `/en`; este segmento se usa para resolver las rutas internas. La navegación ofrece los siete idiomas y conserva la página, la consulta y el ancla al cambiar de idioma.

Next.js también genera `robots.txt` y `sitemap.xml` según la configuración del sitio. Los metadatos incluyen idioma, URL canónica y alternativas lingüísticas. El sitemap incorpora inicio, Retreats y consultas privadas en los siete idiomas cuando se habilita la indexación; las cuatro páginas legales permanecen excluidas de indexación en sus metadatos.

## Variables de entorno

| Variable             | Configuración                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`           | URL pública del entorno. En desarrollo: `http://localhost:3000`. Se utiliza para el origen permitido del formulario y las URLs del sitio. |
| `ENABLE_INDEXING`    | `false` durante la revisión. Cambiar a `true` únicamente al aprobar producción; desarrollo y las previews de Vercel siguen excluidos.     |
| `GOOGLE_SITE_VERIFICATION` | Token opcional de verificación HTML facilitado por Google Search Console. Vacío hasta disponer del token real; añadirlo no acredita por sí solo la verificación de propiedad. |
| `RESEND_API_KEY`     | Clave privada del servicio de envío.                                                                                                      |
| `ENQUIRY_FROM_EMAIL` | Dirección remitente de un dominio verificado en Resend.                                                                                   |
| `ENQUIRY_TO_EMAIL`   | Bandeja que recibe las consultas; por defecto, `hello@bmygym.com`.                                                                        |

Guardar valores locales en `.env.local` y los de producción en las variables del proveedor de hosting. No usar el prefijo `NEXT_PUBLIC_` para credenciales ni incluir secretos en Git. Reiniciar el servidor después de cambiar la configuración.

El formulario de Private Commissions requiere nombre completo, correo electrónico, categoría, ubicación, fase y descripción breve del proyecto, además de confirmar la lectura de la política de privacidad. Empresa u organización y plazo previsto son opcionales; no solicita presupuesto. Las categorías son residencia privada, hospitalidad de lujo, superyate, aviación privada y colaboración profesional. Las fases son concepto, planificación, desarrollo, reforma y otra.

Los formularios independientes de Retreats y consulta privada requieren nombre, correo electrónico, mensaje y confirmación de lectura de la política de privacidad; las fechas o el plazo preferidos son opcionales. La API distingue los tres tipos de solicitud y los identifica en el correo enviado al negocio. Una solicitud de reserva no confirma una fecha ni una plaza.

Todos los formularios validan en el idioma elegido y utilizan errores accesibles con foco en el primer campo que requiere corrección. La API valida de nuevo los datos y el origen, limita el cuerpo a 40 KiB y utiliza un campo trampa contra automatización básica. La respuesta de éxito requiere aceptación por el proveedor; la recepción efectiva se comprueba en la bandeja y en Resend. El entorno local actual no dispone de configuración de correo y las pruebas usan respuestas simuladas, sin envíos reales. El contrato, los mensajes y la configuración completa están en [Configuración de consultas](docs/contact-setup.md).

## Consentimiento, bienvenida y medición

El aviso permite aceptar Google Analytics o continuar solo con preferencias esenciales, y guarda la elección durante 180 días en `localStorage` con la clave `bmygym.cookie-consent.v2`. Cookie Settings, en el pie de página, permite cambiar o retirar el consentimiento. La presentación de bienvenida conserva su composición y recuerda su cierre durante 180 días mediante `bmygym.welcome.v1`.

Se mantiene el identificador de Google Analytics existente, `G-5ZH4R52182`. La biblioteca solo se carga con consentimiento afirmativo y `isIndexingEnabled=true`: requiere `ENABLE_INDEXING=true`, ejecución de producción y, en Vercel, entorno Production. No se carga en desarrollo ni en previews de Vercel. La medición contempla visitas, interés en los botones de contacto y solicitudes confirmadas por el proveedor; los eventos propios no incluyen nombres, correos ni contenido de formularios. La revocación desactiva la medición posterior y elimina las cookies de Analytics accesibles para el sitio.

El soporte del token `GOOGLE_SITE_VERIFICATION` está preparado, pero esta revisión no verifica la propiedad en Search Console ni confirma la indexación o la recepción de eventos en la cuenta de Analytics. El comportamiento del aviso se documenta en [Consentimiento de cookies](docs/cookie-notice.md); las comprobaciones locales, en [Validación](docs/validation.md).

La [revisión SEO del 24 de noviembre de 2026](docs/seo-search-console.md) detectó inicialmente un bloqueo de indexación y un sitemap vacío en producción. El código incorpora datos estructurados `Organization` y `WebSite` en las siete portadas. La guía recoge la activación en Vercel, las comprobaciones y el procedimiento de Search Console; la propiedad de la cuenta y el envío del sitemap requieren verificación independiente en Google.

## Preparar la publicación

1. Comprobar la conexión del repositorio [aredgiova/BMYGYM](https://github.com/aredgiova/BMYGYM) con el hosting y la rama configurada para producción. El workflow incluido comprueba lint, TypeScript, pruebas y compilación en cada push a `main` y en los pull requests.
2. Si el destino es Vercel, revisar la configuración existente o configurar un proyecto de revisión con estos valores:

   | Opción | Valor |
   | --- | --- |
   | Framework Preset | Next.js |
   | Root Directory | Raíz del repositorio (`.`) |
   | Node.js Version | 22.x |
   | Install Command | `npm ci` |
   | Build Command | `npm run build` |
   | Output Directory | Valor predeterminado de Next.js |
   | Production Branch | `main` |

3. Configurar las variables por entorno. `SITE_URL` define el dominio canónico; la API también admite el origen exacto de `VERCEL_URL` cuando Vercel identifica el entorno como preview. Para otros hosts de revisión, usar su origen concreto en `SITE_URL`.
4. Revisar la preview en escritorio y móvil en los seis idiomas. Verificar navegación, selector, bienvenida, consentimiento, los tres formularios, páginas auxiliares y estados de error. Las pruebas simuladas no acreditan una entrega real de correo.
5. Completar la [lista de publicación](docs/launch-checklist.md), verificar el dominio y sus redirecciones, y obtener la aprobación final antes de publicar esta revisión.

Una conexión de hosting puede desplegar automáticamente al actualizar su rama configurada; comprobar este comportamiento antes de subir cambios. Mantener `ENABLE_INDEXING=false` en entornos de revisión. No se necesita `vercel.json` ni un servidor adicional para esta arquitectura.

## Contenido pendiente de aprobación

Las cuatro páginas legales conservan los textos facilitados por BMYGYM, la titular Bojana Pesic y la dirección profesional de Avda. Primado Reig 129, Entlo. D, 46020 Valencia, España. La actualización del 11 de noviembre de 2026 adapta la privacidad a los formularios y la política de cookies al consentimiento de analítica en los seis idiomas. Las consultas se envían mediante Resend cuando está configurado y no se guardan en una base de datos de la aplicación. El contenido comercial, las traducciones y la vista previa deben recibir la aprobación editorial final de BMYGYM antes de publicar.

Se conservan los nombres e imágenes actuales de Signature Concepts hasta revisar con BMYGYM qué conceptos están preparados para presentarse públicamente. No se han sustituido nombres ni incorporado nuevos productos, precios o carrito. El blog editorial, nuevos vídeos, la experiencia inmersiva y Private Longevity Circle quedan para una fase posterior; no se ha publicado contenido editorial ni se ha creado un recorrido de membresía.

Las imágenes son visualizaciones conceptuales, sin afirmaciones de instalaciones realizadas, productos fabricados o certificación aeronáutica. Su procedencia, tamaños y licencias tipográficas están en el [manifiesto de recursos](docs/asset-manifest.md).
