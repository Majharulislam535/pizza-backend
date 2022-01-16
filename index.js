const express = require("express");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqi4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello world");
})

async function run() {
    try {
        await client.connect();
        const database = client.db("Pizza");
        const pizzaCollection = database.collection("pizzaCollection");
        // create a document to insert

        app.get('/pizza', async (req, res) => {
            const cursor = pizzaCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/pizza/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await pizzaCollection.findOne(query);
            res.json(result);

        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log("listen to port", port);
})