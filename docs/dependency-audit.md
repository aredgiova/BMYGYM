# Dependency audit — 16 October 2026

The initial dependency install was checked with `npm audit --json` and `npm audit --omit=dev --json`.

- Production dependencies: **0 known vulnerabilities reported**.
- Full dependency tree: **5 high-severity records**, all from one underlying development-tool dependency issue. They are not five separate vulnerabilities in the application.

## Development dependency finding

Dependency chain:

```text
eslint-config-next@16.4.2
└── @next/eslint-plugin-next@16.4.2
    └── fast-glob
        └── micromatch
            └── braces@3.0.3
```

Advisory: [GHSA-vfj7-8cjw-p6xm — braces stack-exhaustion denial of service through deeply nested patterns](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The reported affected range is `braces <=3.0.3`. At verification, the latest published `braces` version was `3.0.3`; there was no patched release available to install.

This chain is part of lint tooling and is absent from the production dependency audit. Project lint patterns are maintained in source; the website does not accept user-supplied glob patterns for this tooling. The finding remains open and is not suppressed.

The automated `npm audit fix --force` recommendation downgrades `eslint-config-next` to `14.2.35`, which does not match the Next.js 16 application. It was not applied. Recheck the advisory and update the compatible Next.js lint dependency tree once an upstream fix is available, then rerun lint, TypeScript, tests, build, and both audits.

## Toolchain compatibility notice

ESLint `9.39.5` produces an upstream end-of-support notice. The current React and accessibility plugins used by `eslint-config-next@16.4.2` accept ESLint 9 but do not yet declare compatibility with ESLint 10. TypeScript `6.0.3` is pinned because the current `typescript-eslint` peer range is `>=4.8.4 <6.1.0`; TypeScript 7 is outside that range. These are deliberate compatibility pins, recorded in `package-lock.json`; dependency peer checks were not bypassed.
