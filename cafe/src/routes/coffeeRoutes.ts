import { Router } from 'express';
import { CoffeeController } from '../controller/coffeeController';

const routes = Router();
const coffeeController = new CoffeeController();

routes.get('/coffee', coffeeController.list);
routes.post('/coffee', coffeeController.create);
routes.get('/coffee/:id', coffeeController.show);
routes.put('/coffee/:id', coffeeController.update);
routes.delete('/coffee/:id', coffeeController.delete);

export default routes;