const express = require('express');
const app = express()

const routes = require('./routes/route');
const { connect_M_DB } = require('./databases/db')

const port = process.env.API_PORT;

connect_M_DB(process.env.MONGOOSE_URL);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
});

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({ error: "No such page exists!" });
});


