const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const CategoryController= require('../controllers/category.controller');
const TopicController= require('../controllers/topic.controller');
const LessonController= require('../controllers/lesson.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const authValidate = require('../validatons/auth.validation');
const categoryValidate = require('../validatons/category.validation');
const topicValidate = require('../validatons/topic.validation');
const lessonValidate = require('../validatons/lesson.validation');
const validate = require('../utils/validator.util'); 




//Authencation
router.post('/register', validate(authValidate.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(authValidate.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));
router.get('/user/search', AuthGuard, ErrorHandler(AuthController.getUsers));
router.get('/user/:id', AuthGuard, ErrorHandler(AuthController.getUser));
router.put('/user/:id', AuthGuard, ErrorHandler(AuthController.update));
router.put('/user/active/:id', AuthGuard, ErrorHandler(AuthController.setActive));


//Category
router.post('/category/create', AuthGuard, validate(categoryValidate.category), ErrorHandler(CategoryController.create));
router.put('/category/:id', AuthGuard, validate(categoryValidate.category), ErrorHandler(CategoryController.update));
router.delete('/category/:id', AuthGuard, ErrorHandler(CategoryController.delete));
router.get('/category/search', AuthGuard, ErrorHandler(CategoryController.getCategories));
router.get('/category/:id', AuthGuard, ErrorHandler(CategoryController.getCategory));


//Topic
router.post('/topic/create', AuthGuard, validate(topicValidate.topic), ErrorHandler(TopicController.create));
router.put('/topic/:id', AuthGuard, validate(topicValidate.topic), ErrorHandler(TopicController.update));
router.delete('/topic/:id', AuthGuard, ErrorHandler(TopicController.delete));
router.get('/topic/search', AuthGuard, ErrorHandler(TopicController.getTopics));
router.get('/topic/:id', AuthGuard, ErrorHandler(TopicController.getTopic));


//Lesson
router.post('/lesson/create', AuthGuard, validate(lessonValidate.lesson), ErrorHandler(LessonController.create));
router.put('/lesson/:id', AuthGuard, validate(lessonValidate.lesson), ErrorHandler(LessonController.update));
router.delete('/lesson/:id', AuthGuard, ErrorHandler(LessonController.delete));
router.get('/lesson/search', AuthGuard, ErrorHandler(LessonController.getLessons));
router.get('/lesson/:id', AuthGuard, ErrorHandler(LessonController.getLesson));


router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}));




module.exports = router;
