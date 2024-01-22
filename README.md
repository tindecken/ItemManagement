# Item Management

### Create migration:

```bash
bunx drizzle-kit generate:sqlite --schema ./schema.ts

bun run migrate.ts
```

### Start python sqlite web:

```bash
bunx drizzle-kit studio --host 0.0.0.0 --port 3000
```

```bash
bunx drizzle-kit introspect:sqlite
```
