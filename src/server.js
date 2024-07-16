import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

//conexión del server con mongoDB
const MONGODB_URI = 'aquí va la URI que conecta la app a tu base de datos';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected to database "weather"'))
  .catch(err => console.log(err));

//crea el objeto que enviará a la base de datos, en este caso el objeto es una busqueda en la app de clima
const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
}, { collection: 'historial' });

const Search = mongoose.model('Search', searchSchema);

//envía el cuerpo a la base de datos
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
