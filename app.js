const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('Database Connected');
}
main().catch((err) => console.log('OH NO MONGO CONNECTION ERROR!!!', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makeCampground', async (req, res) => {
  const camp = new Campground({ title: 'My Backyard', description: 'Cheap Camping' });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log('LISTENING PORT 3000');
});
