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

//Index ejs Route
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

//GET, view Form
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});
//Show ejs Specific id - Route
app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/show', { campground });
});

app.listen(3000, () => {
  console.log('LISTENING PORT 3000');
});
