# BMYGYM

Sitio de presentación de BMYGYM, estudio de entornos de bienestar y longevidad a medida para residencias, yates, hospitalidad y aviación privada. La primera versión presenta la marca en inglés y permite solicitar una conversación privada.

El repositorio comenzó vacío. Esta base implementa la estructura, el contenido inicial, las imágenes facilitadas y una integración de correo configurable. El código se mantiene en [aredgiova/BMYGYM](https://github.com/aredgiova/BMYGYM). El despliegue en Vercel está pendiente de autorización.

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
| `npm test`          | Ejecutar las pruebas del formulario y del envío con respuestas simuladas |
| `npm run build`     | Crear la compilación de producción                                       |
| `npm start`         | Servir una compilación de producción ya creada                           |

En integración continua, usar `npm ci` con el archivo de bloqueo versionado. Las pruebas automatizadas no envían correos reales. La compilación, revisión visual y prueba real de entrega deben verificarse por separado; esta documentación no acredita su aprobación.

## Arquitectura

- Next.js con App Router y ejecución Node.js; React para la interfaz.
- TypeScript con `strict: true` y alias `@/` para `src/`.
- Tailwind CSS y estilos globales para el sistema visual y la adaptación a distintos tamaños de pantalla.
- Componentes de servidor por defecto. `Header` y `EnquiryForm` son los componentes de cliente para la navegación móvil y el formulario.
- Sharp para la optimización de imágenes. Las imágenes conceptuales se entregan desde `public/images/`; Bodoni Moda y Manrope se sirven localmente desde `public/fonts/`.
- La API de Resend se invoca con `fetch` del servidor; las claves y la configuración de correo permanecen privadas.

Las dependencias de aplicación se limitan a Next.js, React, React DOM y Sharp. TypeScript, ESLint, Tailwind y PostCSS cubren desarrollo, validación y estilos. Esta fase no necesita PostgreSQL, Prisma, autenticación ni un servidor independiente: las consultas se envían por correo y no se guardan en una base de datos de la aplicación.

```text
src/app/                 Páginas, metadatos y endpoints
src/components/          Navegación, pie, composición legal y elementos compartidos
src/features/home/       Secciones de la página principal
src/features/enquiry/    Sección y formulario de consulta
src/config/              Configuración pública del sitio e indexación
src/services/            Integración privada con el proveedor de correo
src/validations/         Validación de las consultas
public/images/           Imágenes optimizadas del proyecto
public/fonts/            Fuentes locales y licencias
tests/                   Pruebas de validación, API y correo simulado
docs/                    Guías de configuración, recursos y publicación
```

## Rutas

| Ruta                   | Contenido                                                             |
| ---------------------- | --------------------------------------------------------------------- |
| `/`                    | Inicio, filosofía, entornos, Blueprint, proceso, conceptos y consulta |
| `/legal`               | Borrador explícito del aviso legal                                    |
| `/privacy`             | Borrador explícito de la política de privacidad                       |
| `/cookies`             | Borrador explícito de la política de cookies y estado actual          |
| `/accessibility`       | Información de accesibilidad y canal de contacto                      |
| `GET /api/health`      | Estado básico del servidor; no comprueba la entrega de correo         |
| `POST /api/v1/contact` | Validación de la consulta y envío mediante Resend                     |

Next.js también genera `robots.txt` y `sitemap.xml` según la configuración del sitio. Los borradores legales permanecen excluidos de indexación en sus metadatos.

## Variables de entorno

| Variable             | Configuración                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`           | URL pública del entorno. En desarrollo: `http://localhost:3000`. Se utiliza para el origen permitido del formulario y las URLs del sitio. |
| `ENABLE_INDEXING`    | `false` durante la revisión. Cambiar a `true` únicamente al aprobar producción; desarrollo y las previews de Vercel siguen excluidos.     |
| `RESEND_API_KEY`     | Clave privada del servicio de envío.                                                                                                      |
| `ENQUIRY_FROM_EMAIL` | Dirección remitente de un dominio verificado en Resend.                                                                                   |
| `ENQUIRY_TO_EMAIL`   | Bandeja que recibe las consultas; por defecto, `hello@bmygym.com`.                                                                        |

Guardar valores locales en `.env.local` y los de producción en las variables del proveedor de hosting. No usar el prefijo `NEXT_PUBLIC_` para credenciales ni incluir secretos en Git. Reiniciar el servidor después de cambiar la configuración.

El formulario valida el origen y los campos, limita el cuerpo de la solicitud y utiliza un campo trampa contra automatización básica. La confirmación indica aceptación por el proveedor; la recepción efectiva se comprueba en la bandeja y en Resend. El contrato, los errores y la configuración completa están en [Configuración de consultas](docs/contact-setup.md).

## Preparar GitHub y Vercel

1. Usar el repositorio [aredgiova/BMYGYM](https://github.com/aredgiova/BMYGYM), con `main` como rama de producción. GitHub Actions comprueba lint, TypeScript, pruebas y compilación en cada push a `main` y en los pull requests.
2. Cuando se autorice el despliegue, importar el repositorio en Vercel con estos valores:

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
4. Revisar la preview en escritorio y móvil. Verificar el formulario, las páginas auxiliares y los estados de error.
5. Completar la [lista de publicación](docs/launch-checklist.md), configurar el dominio y sus redirecciones, y autorizar el despliegue definitivo.

Subir código a GitHub no activa un despliegue por sí solo: este proyecto aún no se ha importado ni conectado a Vercel. Mantener `ENABLE_INDEXING=false` mientras el contenido esté en revisión. No se necesita `vercel.json` ni un servidor adicional.

## Contenido pendiente de aprobación

Los textos legales son borradores identificados. Faltan la entidad o titular legal, identificación fiscal y registral aplicable, dirección, tratamiento de datos, retención de consultas y revisión de los textos definitivos. También están pendientes el arte final de AERO ONE y los archivos oficiales del logotipo.

Las imágenes son visualizaciones conceptuales, sin afirmaciones de instalaciones realizadas, productos fabricados o certificación aeronáutica. Su procedencia, tamaños y licencias tipográficas están en el [manifiesto de recursos](docs/asset-manifest.md).

Esta versión no carga analítica, publicidad, píxeles ni servicios opcionales de seguimiento. “Cookie Settings” permite consultar ese estado. Si se añaden servicios opcionales, se debe incorporar un sistema de consentimiento que permita aceptar, rechazar y cambiar preferencias antes de su carga, junto con la política correspondiente.
