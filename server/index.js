const express = require('express');
const cors = require('cors');

const app = express();

const accounts = require('./routes/api/accounts');
const recipes = require('./routes/api/recipes');
const search = require('./routes/api/search');

app.use(express.json());
app.use(cors());

app.use('/accounts', accounts)
app.use('/search', search)
app.use('/recipes', recipes)

const port = process.env.PORT || 4000;

app.listen(port, ()=>console.log(`server rodando na porta ${port}`));