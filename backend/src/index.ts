import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security middleware to set various HTTP headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // HTTP request logger
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Limit each IP to 100 requests per windowMs

// Routes
app.use('/api/tasks', tasksRouter);
app.get('/health', (_req, res): void => { res.status(200).json({ status: 'ok' }); });

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
