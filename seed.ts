import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.users).values([
  {
    userName: 'tindecken',
    name: 'Thaihoang',
    email: 'tindecken@gmail.com.com',
    password: await Bun.password.hash('rivaldo')
  }
]);


console.log(`Seeding complete.`);
