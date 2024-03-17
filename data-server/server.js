import app from "./src/app.js"

const PORT = 3000;

const routes = {
    "/": "Dados aqui",
    "/veiculos": "lista de veiculos"
};

app.listen(PORT, () => {
    console.log("Servidor escutando")
});