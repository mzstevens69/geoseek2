require('dotenv').config();

const server = require('./server')
//sets port dynamically
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`\n ** api on port: ${PORT} ** \n`));