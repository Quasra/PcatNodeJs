const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');

//create schema
const PhotoSchema = new Schema({
  name: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  //Fotoğraf yüklediğimiz de tarih türünden oluştur ve her oluşturduğumuzda o tarihi baz al..
});

const Photo = mongoose.model('Photo', PhotoSchema);
//connect DB
module.exports = Photo;
