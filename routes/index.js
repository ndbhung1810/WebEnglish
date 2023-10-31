const express = require('express');
const router = express.Router();
const multer = require("multer");

const AuthController = require('../controllers/auth.controller');
const CategoryController= require('../controllers/category.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const authValidate = require('../validatons/auth.validation');
const categoryValidate = require('../validatons/category.validation');
const validate = require('../utils/validator.util'); 


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

router.post('/uploadfile', upload.single('file'), (req, res, next) => {
    const file = req.file
    console.log(file)
    if (!file) {
        return res.json({
            message: 'File image is required'
        });
    }
    return res.json({
        url: __basedir + "/uploads/" + file.filename,
    });
});


//Authencation
router.post('/register', validate(authValidate.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(authValidate.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));


//Category
router.post('/category/create', AuthGuard, validate(categoryValidate.category), ErrorHandler(CategoryController.create));
router.put('/category/:id', AuthGuard, validate(categoryValidate.category), ErrorHandler(CategoryController.update));
router.delete('/category/:id', AuthGuard, ErrorHandler(CategoryController.delete));
router.get('/category/search', AuthGuard, ErrorHandler(CategoryController.getCategories));
router.get('/category/:id', AuthGuard, ErrorHandler(CategoryController.getCategory));


router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}));




module.exports = router;
