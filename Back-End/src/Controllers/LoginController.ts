// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../database/Data-Source";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

export class LoginController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            // (Opcional) Gerar token JWT aqui se quiser autenticação segura

            return res.status(200).json({
                message: "Login bem-sucedido",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: "Erro no servidor." });
        }
    }
}
