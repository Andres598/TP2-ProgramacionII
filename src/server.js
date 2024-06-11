const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

const MONGODB_URI='mongodb+srv://LonginusS:horusitomigatito@cluster0.qkbf72y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
});

const Search = mongoose.model('Search', searchSchema);

app.post('/api/search', async (req, res) => {
  const { city, country, temperature, condition, conditionText, icon } = req.body;
  const search = new Search({ city, country, temperature, condition, conditionText, icon });
  try {
    await search.save();
    res.status(201).send(search);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});