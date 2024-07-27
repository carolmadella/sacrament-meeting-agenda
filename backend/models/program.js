const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: String,
  title: String,
  duration: Number,
});

const hymnSchema = new mongoose.Schema({
  title: String,
  number: Number,
});

const programSchema = new mongoose.Schema({
  date: Date,
  place: String,
  presiding: String,
  conducting: String,
  musicConductor: String,
  organist: String,
  openingPrayer: String,
  closingPrayer: String,
  speakers: [speakerSchema],
  hymns: [hymnSchema],
  announcements: String,
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;

