import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// Flag para saber se estamos em produção
const isProduction = process.env.NODE_ENV === "production";

// Variáveis para configuração da conexão
let dataSourceOptions: DataSourceOptions;

if (isProduction) {
    
    // Em produção (ex: Render), usa a variável DATABASE_URL

    dataSourceOptions = {
        type: "sqlite",                     
        entities: ["./dist/models/*.js"],      
        migrations: ["./dist/migrations/*.js"],
        synchronize: false,                    
        logging: false,    
        database:"database.sql"                   
    };
} else {

    // Em desenvolvimento (local), usa variáveis separadas
    
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    dataSourceOptions = {
        type: "mysql",
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: ["./src/models/*.ts"],
        migrations: ["./src/migrations/*.ts"],
        synchronize: true,
        logging: true,
    };
}

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;