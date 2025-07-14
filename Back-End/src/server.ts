import express,{Application} from "express"
import UserRoutes from "./routes/UserRoutes"
import  AppDataSource from "./database/Data-Source";
import cors from "cors";

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5502', 'http://127.0.0.1:5502']
}))

AppDataSource.initialize()
    .then(() => {
        app.use(express.json());

        app.use('/api', UserRoutes);

        app.listen(3000, () => console.log('🔥Server rodando na porta 3000🔥'));
    })
    .catch((error) => console.log(error));