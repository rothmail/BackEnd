import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Coffee } from "../models/Coffee";

const coffeeRepository = AppDataSource.getRepository(Coffee);

export class CoffeeController {
    async list(req: Request, res: Response) {
        const Coffee = await coffeeRepository.find();
        res.json(Coffee);
        return
    }

    async create(req: Request, res: Response) {
        const { name, intensidade, preco } = req.body;

        if (!name || !intensidade || !preco) {
            res.status(400).json({ message: "Todos os campos são necessários!" })
            return
        }

        const Coffees = new Coffee(name, intensidade, preco)
        const newcoffee = await coffeeRepository.create(Coffees)
        await coffeeRepository.save(newcoffee)

        res.status(201).json({ message: "café criado com sucesso", coffee: newcoffee })
        return
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const coffee = await coffeeRepository.findOneBy({ id: Number(id) });

        if (!coffee) {
            res.status(404).json({ message: 'café não encontrado' });
            return
        }

        res.json(coffee);
        return
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, intensidade, preco } = req.body;

        const coffee = await coffeeRepository.findOneBy({ id: Number(id) });

        if (!coffee) {
            res.status(404).json({ message: 'café não encontrado' });
            return
        }

        coffee.name = name;
        coffee.intensidade = intensidade;
        coffee.preco = preco;

        await coffeeRepository.save(coffee);

        res.json(coffee);
        return
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const coffee = await coffeeRepository.findOneBy({ id: Number(id) });

        if (!coffee) {
            res.status(404).json({ message: 'café não encontrado' });
            return
        }

        await coffeeRepository.remove(coffee);

        res.status(204).send();
        return
    }
}