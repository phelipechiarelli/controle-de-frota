import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

const veiculos = [
    {
        "id": Math.floor(Math.random() * 1000000),
        "placa": "LLU8093",
        "chassi": "8gEPb2uYw3Xv21956",
        "renavam": "09785274964",
        "modelo": "Logan Privilege 1.6 16v",
        "marca": "Renault",
        "ano": 2008
    },
    {
        "id": Math.floor(Math.random() * 1000000),
        "placa": "LLX8155",
        "chassi": "8gEPb2uYw3Xv21956",
        "renavam": "09785274964",
        "modelo": "Polo GTI",
        "marca": "Volkswagen",
        "ano": 2017
    },
    {
        "id": Math.floor(Math.random() * 1000000),
        "placa": "ALX1575",
        "chassi": "8gEPb2uYw3Xv21956",
        "renavam": "09785274964",
        "modelo": "Dolphin",
        "marca": "BYD",
        "ano": 2024
    }
]

function buscarVeiculo(id) {
    return veiculos.findIndex(veiculo => {
        return veiculo.id === Number(id);
    })
}

app.get("/veiculos", (req, res) => {
    res.status(200).json(veiculos);
});

app.get("/veiculos/:id", (req, res) => {
    const index = buscarVeiculo(req.params.id);
    res.status(200).json(veiculos[index]);
});

app.post("/veiculos", (req, res) => {
    veiculos.push(req.body);
    res.status(201);
});

app.put("/veiculos/:id", (req, res) => {
    const index = buscarVeiculo(req.params.id);
    veiculos[index] = req.body;
});

app.delete("/veiculos/:id", (req, res) => {
    const index = buscarVeiculo(req.params.id);
    veiculos.splice(index, 1);
});

export default app