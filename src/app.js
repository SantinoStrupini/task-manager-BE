require('dotenv').config();
require('./mongo')
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const pathModule = require('path');
const fs = require('fs')
const YAML = require('yaml')
const mainRouter = require('./routes/mainRoutes')
const app = express();

const path = pathModule.resolve(__dirname, 'swagger', 'swagger.yaml');
console.log('Path to Swagger YAML:', path);
const file = fs.readFileSync(path, 'utf-8');
const swaggerDocument = YAML.parse(file)
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', mainRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});