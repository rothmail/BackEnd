import express, { Application, Request, Response} from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('<h1> Hello World! </h1>')
});

app.listen(3000, () => {
    console.log('Projeto rodando na porta 3000')
})