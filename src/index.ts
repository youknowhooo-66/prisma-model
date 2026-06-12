import express from 'express';
import router from './routes';
import { requestAuditMiddleware } from './middlewares/audit.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestAuditMiddleware);

// Routes
app.use('/api', router);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PrisModel API (Exercise 1 & 2)' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
