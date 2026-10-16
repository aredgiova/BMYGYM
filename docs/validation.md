# Validación de la primera versión

Comprobaciones realizadas el 16 de octubre de 2026 en Windows, Node.js 22.15.0 y Microsoft Edge mediante Playwright.

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Compilación de producción correcta; páginas estáticas y dos Route Handlers Node.js |
| `npm run lint` | Sin errores ni advertencias de lint |
| `npm run typecheck` | Sin errores TypeScript |
| `npm test` | 15 pruebas aprobadas; proveedor de correo simulado |
| Anchos 320, 375, 768, 1024 y 1440 px | Sin desbordamientos, una H1 y ninguna imagen rota |
| Navegación móvil | Abrir, cerrar, Escape y enlaces de sección correctos |
| Cookie Settings móvil | Desplegable sin desbordamiento horizontal |
| Rutas principales y documentos | HTTP 200; URL inexistente HTTP 404 |
| `/api/health` | Respuesta exacta requerida |
| Correo sin configurar | HTTP 503 y contacto alternativo; no confirma un envío inexistente |
| Formulario en navegador | Conserva datos tras fallo; asocia errores con campos; limpia errores al editar; reinicia tras éxito simulado |
| Revisión visual independiente | Aprobada para esta primera versión local; correcciones resueltas |
| Consola de navegador | Sin errores de ejecución de página |

Las capturas de revisión se encuentran localmente en `artifacts/desktop-home.png`, `artifacts/mobile-home.png` y las capturas completas de esa carpeta. `artifacts/` está excluida de Git. El resumen mecánico se conserva localmente en `artifacts/qa-results.json`.

La revisión visual final resolvió contraste de texto pequeño, identificación de visualizaciones conceptuales en móvil, nitidez del hero móvil, conflicto con una utilidad tipográfica de Tailwind, flechas de una lista que sugerían enlaces y desbordamiento del panel de cookies.

No se enviaron correos reales. La entrega efectiva requiere credenciales, remitente verificado y una prueba autorizada. No se publicaron cambios ni se conectó el dominio.

`npm audit --omit=dev` no reportó vulnerabilidades de producción. La advertencia pendiente del árbol de herramientas de desarrollo se detalla en [dependency-audit.md](dependency-audit.md). Node.js 22.15 emite un aviso experimental al ejecutar TypeScript directamente en las pruebas; no afecta al build de Next.js.
