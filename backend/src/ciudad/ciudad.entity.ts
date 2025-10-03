import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Atleta } from '../atleta/atleta.entity';

@Entity('ciudades')
export class Ciudad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Atleta, (atleta) => atleta.ciudad)
    atletas: Atleta[];
}