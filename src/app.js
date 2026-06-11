import express from 'express'
import cors from 'cors'
import router from './routes/router.js'

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(router)

// Rotas de Exemplo
app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionando corretamente!' });
});

// Exporta o app para ser utilizado no servidor
export default  app;
