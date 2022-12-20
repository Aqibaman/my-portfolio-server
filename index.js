const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tbyvndu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const projectCollection = client.db('myPortfolio').collection('projects');
    try {
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectCollection.find(query);
            const services = await cursor.sort({ _id: -1 }).toArray();
            res.send(services);
        });
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await projectCollection.findOne(query);
            res.send(service);
        });
    }
    finally {

    }
}

run().catch(e => console.error(e))



app.get('/', (req, res) => {
    res.send('My Portfolio server is running')
})

app.listen(port, () => {
    console.log(`My Portfolio server running on ${port}`);
})