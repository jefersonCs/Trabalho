// src/models/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity('Login')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    private _previousPassword?: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password !== this._previousPassword) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
    setPreviousPassword(password: string) {
        this._previousPassword = password;
    }
}