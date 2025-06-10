import express,{Application} from "express"
import UserRoutes from "./Routers/UserRoutes"
import { AppDataSource } from "./DataBase/Data-Source";

const app : Application = express();

app.use(express.json())


AppDataSource.initialize()
    .then(() => {
        app.use(express.json());

        app.use('/api', UserRoutes);

        app.listen(3000, () => console.log('🔥Server rodando na porta 3000🔥'));
    })
    .catch((error) => console.log(error));