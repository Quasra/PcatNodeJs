const Photo = require("../models/Photo"); //--> models klasöründeki photo.js dosyasını çağırdık.

exports.getAboutPage =   (req, res) => {
    res.render("about");
     //--->render diyince yani about işle anlamında.. 
};

exports.getAddPage = (req, res) => {
    res.render("add"); //--->render diyince yani add i işle anlamında.. 
};

exports.getEditPage = async (req, res) =>{

    const photo = await Photo.findOne({_id: req.params.id});
    res.render('edit',{
        photo,
    });
}
