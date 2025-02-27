import express from 'express';
import cors from 'cors';
import { Client } from 'pg';
import dotenv from 'dotenv';

// dotenv
dotenv.config();

// Express
const app = express();
app.use(cors());
app.use(express.json());

// Postgres
const client
  = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

client.connect();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const { rows } = await client.query('SELECT * FROM users');
    res.send(rows);
    });

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.send('User added');
    });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
