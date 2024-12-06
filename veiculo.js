const express = require('express');
const route = express.Router();

let veiculos = [
    { id: 1, nome: 'Jeep Renegade', fabricante: 'Jeep', ano: 2020, combustivel: 'Gasolina', cor: 'Preto', preco: 120000 },
    { id: 2, nome: 'Hilux', fabricante: 'Toyota', ano: 2021, combustivel: 'Diesel', cor: 'Branco', preco: 250000 },
    { id: 3, nome: 'Fiat Toro', fabricante: 'Fiat', ano: 2019, combustivel: 'Flex', cor: 'Vermelho', preco: 130000 },
    { id: 4, nome: 'Amarok', fabricante: 'Volkswagen', ano: 2022, combustivel: 'Diesel', cor: 'Cinza', preco: 280000 },
    { id: 5, nome: 'Ford Ranger', fabricante: 'Ford', ano: 2021, combustivel: 'Diesel', cor: 'Azul', preco: 270000 }
];

// Rota GET - Página Web com listagem de veículos
route.get('/', (req, res) => {
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

// Rota POST - Adicionar um novo veículo
route.post('/veiculo/', (req, res) => {
    const { nome, fabricante, ano, combustivel, cor, preco } = req.body;
    const id = veiculos.length + 1;
    const novoVeiculo = { id, nome, fabricante, ano, combustivel, cor, preco };
    veiculos.push(novoVeiculo);
    res.status(201).json(novoVeiculo);
});

// Rota PUT - Atualizar o preço de um veículo
route.put('/veiculo/', (req, res) => {
    const { id, preco } = req.body;
    const veiculo = veiculos.find(v => v.id === id);
    if (!veiculo) {
        return res.status(404).send('Veículo não encontrado!');
    }
    veiculo.preco = preco;
    res.status(200).send('Preço do veículo atualizado com sucesso.');
});

// Rota DELETE - Excluir um veículo
route.delete('/veiculo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    veiculos = veiculos.filter(v => v.id !== id);
    res.status(202).send(`O veículo de ID ${id} foi excluído com sucesso.`);
});

module.exports = route;
