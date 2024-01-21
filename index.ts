import {db} from "./db"
import * as schema from "./schema"


const result = await db.select().from(schema.movies);

console.log(result)