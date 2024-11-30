import express from 'express';
import cors from 'cors';
import embedRoutes from './routes/embed';

const api = express();

// Middleware
api.use(cors());
api.use(express.json());

// Routes
api.use('/api/embed', embedRoutes);

// Error handling
api.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

export default api;