const Photo = require('../models/Photo'); //Fotoğraf modelini alıyoruz..
const fs = require('fs'); //Dosya işlemleri için kullanıyoruz.. 


exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}); //Veritabanından fotoğrafları bul ve getir..
    res.render('index', {
    photos,
  }); //--->render diyince yani index i işle anlamında..
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id); //Veritabanından fotoğrafı bul ve getir..
    res.render('photo', {
    photo,
    });
};

exports.createPhoto = async (req, res) => {
   const uploadDir ="public/uploads"; //Yükleme dizinini belirtiyoruz..

    if(!fs.existsSync(uploadDir)){ //Eğer yükleme dizini yoksa oluşturuyoruz..{
        fs.mkdirSync(uploadDir);}

    let uploadImage =req.files.image; //Dosya yükleme işlemi için kullanıyoruz..
    let uploadPath = __dirname +"/../public/uploads/" + uploadImage.name; //Dosyanın yükleneceği yolu belirtiyoruz..
    
    
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: uploadImage.name // Sadece dosya adını kaydedin, başında /uploads/ olmadan
        });
        res.redirect('/');
    });
};


exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id});
    photo.name = req.body.title; //Formdan gelen verileri alıyoruz..
    photo.description = req.body.description; //Formdan gelen verileri alıyoruz..
    photo.save(); //Veritabanına kaydediyoruz..

    res.redirect(`/photos/${req.params.id}`); //Yükleme işlemi tamamlandıktan sonra anasayfaya yönlendiriyoruz..
};

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id}); //Veritabanından fotoğrafı bul ve getir..
    let deletedImage = __dirname + '/../public/uploads/' +photo.image; //Silinecek fotoğrafın yolunu belirtiyoruz..
    fs.unlinkSync(deletedImage); //Silinecek fotoğrafı sil..
    await Photo.findByIdAndDelete(req.params.id); //Veritabanından fotoğrafı sil..
    res.redirect('/');
};