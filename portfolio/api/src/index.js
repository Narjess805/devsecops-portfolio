const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.ip,
  message: { success: false, message: 'Trop de requêtes, réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', contactLimiter);

app.post('/api/contact', async (req, res, next) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.issues });
  }
  const { name, email, message } = result.data;
  try {
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(200).json({ success: true, message: 'Message received' });
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'devsecops-api' });
});

app.get('/api/boom', (req, res, next) => {
  next(new Error('Erreur volontaire pour tester le handler centralisé'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Erreur interne' : err.message,
  });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => console.log(`API listening on ${PORT}`));
}
module.exports = app;
