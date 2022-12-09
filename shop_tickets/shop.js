require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const { mongoClient } = require('./mongo');
const port = 3000
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get( "/api/tickets/:ticket_id", async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("Systems Unavailable");
  let ticket_id = parseInt(req.params.ticket_id);

}); 

app.post('/api/tickets', async (req,res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send('Systems Unavailable');

  const newTicket = {
    name: req.body.name,
    price: req.body.price,
    quantity: 1,
    ticket_id:uuid(),
    
  };
  await db.collection('Shop').insertOne(newTicket);

  return res.send(newTicket);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});