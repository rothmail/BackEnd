import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

@Entity('coffee')
export class Coffee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    intensidade: string;

    @Column({ type: "decimal", precision: 6, scale: 2 })
    preco: number;

    constructor(name: string, intensidade: string, preco: number) {
        this.name = name;
        this.intensidade = intensidade;
        this.preco = preco;
    }
}