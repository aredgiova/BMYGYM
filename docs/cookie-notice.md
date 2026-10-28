# Aviso informativo de cookies

Implementación local del 28 de octubre de 2026. La solución propia y ligera informa del estado actual de BMYGYM: sin analítica, publicidad ni seguimiento opcional. No incorpora CMP, servicios externos ni nuevas dependencias. Cerrar el aviso recuerda su cierre y no otorga consentimiento a seguimiento.

## Contrato de experiencia

- Aviso no modal, fijo en la parte inferior, con título, explicación, enlace a la política del idioma actual y botón “Entendido” en español. No bloquea la página ni encierra el foco.
- Disponible en inglés, alemán, francés, español y ruso. El pie conserva el enlace a la política y ofrece “Cookie Settings” —“Configuración de cookies” en español— para reabrir el aviso.
- La primera aparición no mueve el foco. Al reabrir desde el pie, el título recibe foco; cerrar con el botón o con Escape dentro del aviso devuelve el foco al control de reapertura o, en el cierre inicial, al contenido principal.
- La página reserva el espacio inferior ocupado por el aviso. La composición se apila en pantallas estrechas y admite desplazamiento vertical si falta altura. Utiliza los colores y la tipografía existentes.
- Sin JavaScript, la política sigue disponible mediante su enlace normal; el aviso interactivo requiere JavaScript.

## Almacenamiento y mantenimiento

`src/components/privacy/cookie-notice.tsx` contiene el proveedor y el botón de reapertura; los estilos están en los bloques de cookies de `src/app/globals.css`. El texto del aviso está en `cookieNotice` de los cinco diccionarios `src/i18n/*-common.json`; el pie y la política deben describir el mismo comportamiento.

El cierre escribe en `localStorage` la clave `bmygym.cookie-notice.v1` con el registro `{ "version": 1, "dismissedAt": <milisegundos Unix> }`. Es una única clave por origen, compartida entre los cinco idiomas. No se crean cookies de la aplicación ni datos en `sessionStorage` para este aviso.

La preferencia es válida durante menos de 180 días desde el cierre. Al volver, los registros vencidos, malformados, con otra versión o con fechas inválidas o futuras se eliminan y el aviso reaparece. El borrado del almacenamiento también lo restaura. Los eventos de almacenamiento sincronizan el estado entre pestañas. Si el navegador bloquea el almacenamiento o agota la cuota, el cierre funciona en memoria para la página actual y no persiste tras recargar.

Mantener sincronizadas clave, versión y validación si se cambia el contrato; actualizar también los cinco textos y la política. Repetir las comprobaciones de vigencia, cambio de idioma, teclado, pestañas y fallos de almacenamiento. Si se incorporan servicios opcionales, se necesitan controles para aceptar, rechazar y modificar preferencias antes de cargar esos servicios, además de actualizar la política. Este aviso informativo no cubre esa futura función.

## Evidencia local

ESLint, TypeScript, la compilación y las 22 pruebas Node existentes pasaron. La compilación se ejecutó con `CIRCLE_NODE_TOTAL=2` para usar un worker por el límite de memoria de esta máquina, sin modificar la configuración del repositorio. El recorrido de navegador contra `http://127.0.0.1:3104` cubrió cinco idiomas y cuatro anchos (320, 375, 768 y 1440 px), interacción, recarga, vigencia, registros inválidos, pestañas y fallos de almacenamiento. La política también se comprobó sin JavaScript. No se observaron errores JavaScript, cookies ni peticiones externas. El contraste del texto del aviso se midió en 5,14:1.

La revisión independiente cerró sin hallazgos materiales:

| Criterio del revisor | Resultado | Hallazgos |
| --- | --- | --- |
| THESIS | PASS | Ninguno |
| OWN-WORLD | PASS | Ninguno |
| STORY | PASS | Ninguno |
| FIRST VIEWPORT | PASS | Ninguno |
| FORM | PASS | Ninguno |

Recorrido: `artifacts/cookie-qa-2026-10-28.cjs`. Informe: `artifacts/cookies-2026-10-28/report.json`; capturas en el mismo directorio. Las evidencias son locales y `artifacts/` no se versiona. Véanse [Validación](validation.md) y la [lista de publicación](launch-checklist.md). La subida al repositorio se acredita por el historial de Git; el despliegue, el hosting definitivo y el cumplimiento legal no quedan acreditados por estas comprobaciones locales.
