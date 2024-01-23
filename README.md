# Item Management

### Create migration:

```bash
bunx drizzle-kit generate:sqlite --schema ./schema.ts
```

### Start python sqlite web:

```bash
sqlite_web -H 192.168.1.17 -p 9000 sqlite.db
```

```bash
bunx drizzle-kit introspect:sqlite
```

```bash
bunx drizzle-kit push:sqlite
```

