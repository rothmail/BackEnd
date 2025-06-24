import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Coffee } from "../models/Coffee";

const coffeeRepository = AppDataSource.getRepository(Coffee);

export class CoffeeController {
    // Listar cafés
    async list(req: Request, res: Response) {
        const Coffee = await coffeeRepository.find();
        res.json(Coffee);
        return
    }

    // Criar café
    async create(req: Request, res: Response) {
        const { name, tipo, preco } = req.body;

        if (!name || !tipo || !preco) {
            res.status(400).json({ message: "Todos os campos são necessários!" })
            return
        }

        const Coffees = new Coffee(name, tipo, preco)
        const newcoffee = await coffeeRepository.create(Coffees)
        await coffeeRepository.save(newcoffee)

        res.status(201).json({ message: "café criado com sucesso", coffee: newcoffee })
        return
    }

    // Buscar café por ID
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

    // Atualizar café
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, tipo, preco } = req.body;

        const coffee = await coffeeRepository.findOneBy({ id: Number(id) });

        if (!coffee) {
            res.status(404).json({ message: 'café não encontrado' });
            return
        }

        coffee.name = name;
        coffee.tipo = tipo;
        coffee.preco = preco;

        await coffeeRepository.save(coffee);

        res.json(coffee);
        return
    }

    // Deletar coffees
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