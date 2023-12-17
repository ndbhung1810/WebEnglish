const QuestionService = require('../services/question.service');
const TopicService = require('../services/topic.service');
const CategoryService = require('../services/category.service');
const AuthService = require('../services/auth.service');
const QuizService = require('../services/quiz.service');

exports.create = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const quizData = {
        name: req.body.name,
        idtopic:req.body.idtopic,
        idcategory:req.body.idcategory,
        idcreated: __idcreated,
        image:req.body.image,
        groupquestion:req.body.groupquestion,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }

    console.log(quizData)
    
    const quiz = await QuizService.createQuiz(quizData);


    var createdid = await AuthService.findUserById(quiz.idcreated);
    var idtopic = await TopicService.findByID(quiz.idtopic);
    var idcategory = await CategoryService.findByID(quiz.idcategory);

    quiz.dataValues.created=createdid
    quiz.dataValues.topic=idtopic
    quiz.dataValues.category=idcategory
    
    return res.json({
        data: quiz,
        message: 'Quiz registered successfully.',
        status : true
    });
}


exports.update = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const quizData = {
        name: req.body.name,
        idtopic:req.body.idtopic,
        idcategory:req.body.idcategory,
        idcreated: __idcreated,
        image:req.body.image,
        groupquestion:req.body.groupquestion,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }
    
    await QuizService.updateQuiz(quizData,req.params.id);

    var quiz = await QuizService.findByID(req.params.id);


    var createdid = await AuthService.findUserById(quiz.idcreated);
    var idtopic = await TopicService.findByID(quiz.idtopic);
    var idcategory = await CategoryService.findByID(quiz.idcategory);

    quiz.dataValues.created=createdid
    quiz.dataValues.topic=idtopic
    quiz.dataValues.category=idcategory

    return res.json({
        data: quiz,
        message: 'Quiz updated successfully.',
        status : true
    });
}

exports.delete = async (req, res) => { 
    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    await QuizService.deleteQuiz(req.params.id);

    return res.json({
        message: 'Quiz delete successfully.',
        status : true
    });
}


exports.getQuizs = async (req, res) => { 
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";
    var idcategory = req.query.idcategory || null;
    var idtopic = req.query.idtopic || null;

    var quizs = await QuizService.findAll(page,limit,query,idtopic,idcategory);

    quizs = await Promise.all(quizs.map(async (quiz) => {
        var created = await AuthService.findUserById(quiz.dataValues.idcreated);
        var topic = await TopicService.findByID(quiz.dataValues.idtopic);
        var category = await CategoryService.findByID(quiz.dataValues.idcategory);
        quiz.dataValues.created = created;
        quiz.dataValues.topic = topic;
        quiz.dataValues.category = category;

        var listQuestions =[];

        var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
        for (let index = 0; index < listQuestion.length; index++) {
            const question = await QuestionService.findByID(listQuestion[index]);
            listQuestions.push(question);
            
        }

        quiz.dataValues.listQuestions = listQuestions;

        return quiz;
    }));


    var total = await QuizService.getTotal();

    return res.status(200).json({
        results: quizs.length,
        total: total,
        data : quizs,
        status : true
    });
}



exports.getQuiz = async (req, res) => { 

    var quiz = await QuizService.findByID(req.params.id);

    var createdid = await AuthService.findUserById(quiz.idcreated);
    var idtopic = await TopicService.findByID(quiz.idtopic);
    var idcategory = await CategoryService.findByID(quiz.idcategory);

    quiz.dataValues.created=createdid
    quiz.dataValues.topic=idtopic
    quiz.dataValues.category=idcategory


    var listQuestions =[];

    var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
    for (let index = 0; index < listQuestion.length; index++) {
        const question = await QuestionService.findByID(listQuestion[index]);
        listQuestions.push(question);
        
    }

    quiz.dataValues.listQuestions = listQuestions;

    return res.status(200).json({
        data: quiz,
        status : true
    });
}
