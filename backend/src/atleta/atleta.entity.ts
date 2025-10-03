import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Ciudad } from '../ciudad/ciudad.entity';

@Entity('atletas')
export class Atleta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    dni: number;

    @Column()
    nombre: string;

    @Column()
    tiempo: string;

    @Column()
    posicion: number;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.atletas, { eager: true})
    ciudad: Ciudad
}