import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Memo } from "./entity/Memo"; // Chemin vers l'entité MEMO
import { Deplacement } from "./entity/Deplacement";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Admin",
    database: "MEMO",
    synchronize: true,
    logging: false,
    entities: [User, Memo, Deplacement],
    migrations: [],
    subscribers: [],
});
module.exports = { AppDataSource };
