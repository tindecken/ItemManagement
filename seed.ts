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
    password: await Bun.password.hash('rivaldo')
  },
  {
    userName: 'thaihoang85',
    name: 'Thai Hoang',
    email: 'thaihoang85@gmail.com.com',
    password: await Bun.password.hash('rivaldo')
  }
])

// project
await db.insert(schema.projects).values([
  {
    name: 'Tindeceken Project',
    description: 'Management items of Tindecken',
    createdByUserId: 1
  }
])

// userProjectRoleConfigure
await db.insert(schema.userProjectRoleConfigure).values([
  {
    userId: 1,
    projectId: 1,
    roleId: 1,
    isDefault: true,
  },
  {
    userId: 2,
    projectId: 1,
    roleId: 2,
    isDefault: false
  }
])

await db.insert(schema.containers).values([
  {
    name: 'Tindecken Container 1',
    description: 'Container 1',
    status: 'active',
    projectId: 1
  },
  {
    name: 'Tindecken Container 2',
    description: 'Container 2',
    status: 'active',
    projectId: 1
  }
])

await db.insert(schema.subContainers).values([
  {
    name: 'Sub Container 1',
    description: 'Sub Container 1',
    status: 'active',
    containerId: 1
  },
  {
    name: 'Sub Container 2',
    description: 'Sub Container 2',
    status: 'active',
    containerId: 1
  }
])

await db.insert(schema.items).values([
  {
    name: 'Item 1',
    description: 'Item 1',
    status: 'active',
    type: 'office',
    containerId: 1
  },
  {
    name: 'Item 2',
    description: 'Item 2',
    status: 'active',
    type: 'office',
    containerId: 1
  },
  {
    name: 'Item 3',
    description: 'Item 3',
    status: 'active',
    type: 'medecine',
    subContainerId: 1
  },
  {
    name: 'Item 4',
    description: 'Item 4',
    status: 'active',
    type: 'electric',
    subContainerId: 1
  },
  {
    name: 'Item 5',
    description: 'Item 5',
    status: 'active',
    type: 'office',
    subContainerId: 2
  },
  {
    name: 'Item 6',
    description: 'Item 6',
    status: 'active',
    type: 'computer',
    subContainerId: 2
  }

])

console.log(`Seeding complete.`);
