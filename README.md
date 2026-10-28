# BMYGYM

Sitio de presentación de BMYGYM como creador e integrador de entornos de longevidad a medida para residencias, superyates, hospitality y aviación privada. Combina sus propios Signature Concepts con productos premium seleccionados de fabricantes especializados y se dirige tanto a clientes particulares como a colaboradores profesionales.

El inglés es el idioma principal; la interfaz, los contenidos, las páginas informativas y el formulario también están disponibles en alemán, francés, español y ruso. El Private Longevity Blueprint se presenta como una primera fase profesional mediante encargo formal y remunerado, con alcance, entregables y honorarios acordados antes de comenzar el diseño. AERO ONE utiliza la imagen facilitada y se identifica como un concepto en desarrollo, sin certificación ni disponibilidad comercial, sujeto a los requisitos aeronáuticos aplicables.

El código se mantiene en [aredgiova/BMYGYM](https://github.com/aredgiova/BMYGYM). Las instrucciones de despliegue de este documento describen la configuración que debe comprobarse antes de publicar esta revisión; no acreditan el estado actual del hosting ni una publicación de estos cambios.

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
| `npm test`          | Ejecutar las 22 pruebas de consultas, API, correo simulado y localización |
| `npm run build`     | Crear la compilación de producción                                       |
| `npm start`         | Servir una compilación de producción ya creada                           |

En integración continua, usar `npm ci` con el archivo de bloqueo versionado. Las pruebas automatizadas no envían correos reales. La compilación, revisión visual y prueba real de entrega deben verificarse por separado; esta documentación no acredita su aprobación.

## Arquitectura

- Next.js con App Router y ejecución Node.js; React para la interfaz.
- TypeScript con `strict: true` y alias `@/` para `src/`.
- Tailwind CSS y estilos globales para el sistema visual y la adaptación a distintos tamaños de pantalla.
- Componentes de servidor por defecto, con componentes de cliente para navegación móvil, selector de idioma, preferencias de cookies y formulario.
- Páginas bajo `src/app/[locale]/`; `src/proxy.ts` sirve el inglés en URLs sin prefijo. Los otros idiomas usan `/de`, `/fr`, `/es` y `/ru`, sin cambiar automáticamente el idioma del visitante.
- Diccionarios tipados `src/i18n/{idioma}-home.json` y `{idioma}-common.json`. `dictionaries.ts` carga el contenido de las páginas; `common.ts` proporciona los mensajes de API; `config.ts` define idiomas y rutas. Los nombres de marca se conservan y su significado se explica en el contexto de cada idioma.
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
| `/de`, `/fr`, `/es`, `/ru` | La misma experiencia en alemán, francés, español y ruso             |
| `/legal`               | Aviso legal y datos profesionales de Bojana Pesic                     |
| `/privacy`             | Política de privacidad y tratamiento de consultas                    |
| `/cookies`             | Política de cookies y funcionamiento actual                          |
| `/accessibility`       | Declaración de accesibilidad y canal de contacto                     |
| `GET /api/health`      | Estado básico del servidor; no comprueba la entrega de correo         |
| `POST /api/v1/contact` | Validación de la consulta y envío mediante Resend                     |

Las páginas `/legal`, `/privacy`, `/cookies` y `/accessibility` tienen equivalentes en los otros cuatro idiomas, por ejemplo `/de/privacy` o `/ru/legal`. Las URLs públicas del inglés permanecen sin `/en`; este segmento se usa para resolver las rutas internas. La navegación incluye un selector de los cinco idiomas.

Next.js también genera `robots.txt` y `sitemap.xml` según la configuración del sitio. Los metadatos incluyen idioma, URL canónica y alternativas lingüísticas. Las páginas informativas permanecen excluidas de indexación en sus metadatos.

## Variables de entorno

| Variable             | Configuración                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`           | URL pública del entorno. En desarrollo: `http://localhost:3000`. Se utiliza para el origen permitido del formulario y las URLs del sitio. |
| `ENABLE_INDEXING`    | `false` durante la revisión. Cambiar a `true` únicamente al aprobar producción; desarrollo y las previews de Vercel siguen excluidos.     |
| `RESEND_API_KEY`     | Clave privada del servicio de envío.                                                                                                      |
| `ENQUIRY_FROM_EMAIL` | Dirección remitente de un dominio verificado en Resend.                                                                                   |
| `ENQUIRY_TO_EMAIL`   | Bandeja que recibe las consultas; por defecto, `hello@bmygym.com`.                                                                        |

Guardar valores locales en `.env.local` y los de producción en las variables del proveedor de hosting. No usar el prefijo `NEXT_PUBLIC_` para credenciales ni incluir secretos en Git. Reiniciar el servidor después de cambiar la configuración.

El formulario requiere el perfil particular o profesional y el tipo de proyecto. Valida los campos en el idioma elegido, conserva el idioma para la respuesta y utiliza errores accesibles con foco en el primer campo que requiere corrección. La API valida de nuevo los datos y el origen, limita el cuerpo a 32 KiB y utiliza un campo trampa contra automatización básica. La confirmación indica aceptación por el proveedor; la recepción efectiva se comprueba en la bandeja y en Resend. El contrato, los mensajes y la configuración completa están en [Configuración de consultas](docs/contact-setup.md).

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
4. Revisar la preview en escritorio y móvil en los cinco idiomas. Verificar navegación, selector, formulario, páginas auxiliares y estados de error. Las pruebas simuladas no acreditan una entrega real de correo.
5. Completar la [lista de publicación](docs/launch-checklist.md), verificar el dominio y sus redirecciones, y obtener la aprobación final antes de publicar esta revisión.

Una conexión de hosting puede desplegar automáticamente al actualizar su rama configurada; comprobar este comportamiento antes de subir cambios. Mantener `ENABLE_INDEXING=false` en entornos de revisión. No se necesita `vercel.json` ni un servidor adicional para esta arquitectura.

## Contenido pendiente de aprobación

Las cuatro páginas legales incorporan los textos facilitados por BMYGYM el 28 de octubre de 2026, la titular Bojana Pesic y la dirección profesional de Avda. Primado Reig 129, Entlo. D, 46020 Valencia, España. Se retiraron los avisos provisionales y se actualizaron los cinco idiomas. La privacidad describe los campos reales del formulario, el idioma y la confirmación de lectura, el envío mediante Resend cuando está configurado y la ausencia de una base de datos de consultas en la aplicación. La política de cookies describe la configuración del código; esta revisión no acredita la configuración del hosting ni una publicación en producción. El contenido comercial y las traducciones deben recibir la aprobación editorial final de BMYGYM antes de publicar la revisión.

La nueva visualización de un entorno BMYGYM completo y una experiencia inmersiva quedan para una fase posterior, conforme al alcance solicitado.

Las imágenes son visualizaciones conceptuales, sin afirmaciones de instalaciones realizadas, productos fabricados o certificación aeronáutica. Su procedencia, tamaños y licencias tipográficas están en el [manifiesto de recursos](docs/asset-manifest.md).

Esta versión no carga analítica, publicidad, píxeles ni servicios opcionales de seguimiento. “Cookie Settings” permite consultar ese estado. Si se añaden servicios opcionales, se debe incorporar un sistema de consentimiento que permita aceptar, rechazar y cambiar preferencias antes de su carga, junto con la política correspondiente.
