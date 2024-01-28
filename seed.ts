import { db } from "./db";
import * as schema from "./schema";

// roles
await db.insert(schema.roles).values([
  {
    code: 'ADMIN',
    name: 'admin',
  },
  {
    code: 'VIEW',
    name: 'view only',
  }
])

// user
await db.insert(schema.users).values([
  {
    userName: 'tindecken',
    name: 'Tindecken',
    email: 'tindecken@gmail.com.com',
    password: await Bun.password.hash('rivaldo'),
    createdDate: new Date()
  },
  {
    userName: 'thaihoang85',
    name: 'Thai Hoang',
    email: 'thaihoang85@gmail.com.com',
    password: await Bun.password.hash('rivaldo'),
    createdDate: new Date()
  }
])
console.log(`Seeding complete.`);
