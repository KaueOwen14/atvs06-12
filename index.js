const express = require('express');
const app = express();
const veiculoRoute = require('./routes/veiculo');

const port = 8080;
const hostname = '127.0.0.1';

// Middleware para manipular JSON
app.use(express.json());
let veiculos = [
    { id: 1, nome: 'Jeep Renegade', fabricante: 'Jeep', ano: 2020, combustivel: 'Gasolina', cor: 'Preto', preco: 120000 },
    { id: 2, nome: 'Hilux', fabricante: 'Toyota', ano: 2021, combustivel: 'Diesel', cor: 'Branco', preco: 250000 },
    { id: 3, nome: 'Fiat Toro', fabricante: 'Fiat', ano: 2019, combustivel: 'Gasolina', cor: 'Vermelho', preco: 130000 },
    { id: 4, nome: 'Amarok', fabricante: 'Volkswagen', ano: 2022, combustivel: 'Diesel', cor: 'Cinza', preco: 280000 },
    { id: 5, nome: 'Ford Ranger', fabricante: 'Ford', ano: 2021, combustivel: 'Diesel', cor: 'Azul', preco: 270000 }
];
app.get('/', (req, res) => {
    let html = `
        <h1>Garagem de Veículos</h1>
        <p>Bem-vindo à melhor garagem de veículos!</p>
        <p>Endereço: Rua dos Automóveis, 123, Centro</p>
        <ul>
            ${veiculos.map(v => `
                <li>
                    <strong>${v.nome}</strong> - ${v.fabricante}, ${v.ano}, ${v.combustivel}, ${v.cor}, R$ ${v.preco}
                </li>
            `).join('')}
        </ul>
    `;
    res.status(200).send(html);
});

app.use('/veiculo', veiculoRoute);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em: http://${hostname}:${port}`);
});
