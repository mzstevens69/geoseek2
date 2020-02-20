require('dotenv').config();
const server = require('./server')

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => console.log(`\n ** api on port: ${PORT} ** \n`));