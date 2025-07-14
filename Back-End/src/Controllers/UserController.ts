import { Request, Response } from 'express';
import  AppDataSource  from '../database/Data-Source';
import { User } from '../models/User';
import bcrypt from  "bcryptjs"

const userRepository = AppDataSource.getRepository(User);


export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            res.status(400).json({ message: "Todos so campos são necessários!"})
            return;
        }

        try {
            const existUser = await userRepository.findOneBy({ email })

            if(existUser) {
                res.status(409).json({ message: "Este e-mail já está em uso!" })
                return
            }

            const user = new User(name, email, password)
            const newUser = await userRepository.create(user)
            await userRepository.save(newUser)

            res.status(200).json({ message: "Usuário criado com sucesso!", usuario: newUser  })
            return;
        } catch(erro) {
            if (erro instanceof Error) {
                res.status(500).json({ message: "Erro inesperado,tente novamente mais tarde." })
                console.error(erro);
                return;
            }
        }



    }
}