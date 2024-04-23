import express from 'express';


const app = express();
app.disable("x-powered-by");
const cors = require('cors');
app.use(cors());


const port = process.env.PORT || 4001
app.use(express.json())



app.listen(port, () => {
    console.log('Server Servido en la puerta ' + port)
})