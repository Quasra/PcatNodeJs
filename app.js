const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload"); //Dosya yükleme işlemi için kullanıyoruz..
const methodOverride = require('method-override',{
    methods: ['POST', 'GET'] }); //PUT ve DELETE işlemleri için kullanıyoruz..
const path = require('path'); //Dosya yollarını ayarlamak için kullanıyoruz..
const app = express();
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers'); //Controller dosyamızı dahil ettik..
const pageController = require('./controllers/pageController'); //Controller dosyamızı dahil ettik..


//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db");

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); //Formdan gelen verileri almak için kullanıyoruz..
app.use(express.json());
app.use(fileUpload()); //Dosya yükleme işlemleri için kullanıyoruz..
app.use(methodOverride('_method'));



//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto); //Veritabanından fotoğrafı bul ve getir..
app.post('/photos', photoController.createPhoto); //POST işlemi için kullanıyoruz..
app.put('/photos/:id', photoController.updatePhoto); //PUT işlemi için kullanıyoruz..
app.delete('/photos/:id', photoController.deletePhoto); //DELETE işlemi için kullanıyoruz..

app.get('/about',pageController.getAboutPage); //Hakkında sayfasını getiriyoruz..
app.get('/add', pageController.getAddPage); //Ekle sayfasını getiriyoruz..
app.get('/photos/edit/:id', pageController.getEditPage); //Düzenle sayfasını getiriyoruz..


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});


