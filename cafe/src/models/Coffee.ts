import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

@Entity('livro')
export class Coffee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    tipo: string;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    preco: number;

    constructor(name: string, tipo: string, preco: number) {
        this.name = name;
        this.tipo = tipo;
        this.preco = preco;
    }
}
