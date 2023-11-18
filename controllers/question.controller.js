const QuestionService = require('../services/question.service');
const TopicService = require('../services/topic.service');
const CategoryService = require('../services/category.service');
const AuthService = require('../services/auth.service');

exports.create = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const questionData = {
        name: req.body.name,
        idtopic:req.body.idtopic,
        idcategory:req.body.idcategory,
        idcreated: __idcreated,
        answera:req.body.answera,
        answerb:req.body.answerb,
        answerc:req.body.answerc,
        answerd:req.body.answerd,
        answer:req.body.answer,
        level:req.body.level,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }
    
    const question = await QuestionService.createQuestion(questionData);
    
    return res.json({
        data: question,
        message: 'Question registered successfully.',
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

    const questionData = {
        name: req.body.name,
        idtopic:req.body.idtopic,
        idcategory:req.body.idcategory,
        idcreated: __idcreated,
        answera:req.body.answera,
        answerb:req.body.answerb,
        answerc:req.body.answerc,
        answerd:req.body.answerd,
        answer:req.body.answer,
        level:req.body.level,
        createdat:req.body.createdat,
        updatedat:dateTimeStamp,
    }
    
    await QuestionService.updateQuestion(questionData,req.params.id);

    var question = await QuestionService.findByID(req.params.id);

    return res.json({
        data: question,
        message: 'Question updated successfully.',
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

    await QuestionService.deleteQuestion(req.params.id);

    return res.json({
        message: 'Question delete successfully.',
        status : true
    });
}


exports.getQuestions = async (req, res) => { 
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";
    var idcategory = req.query.idcategory || undefined;
    var idtopic = req.query.idtopic || undefined;

    var questions = await QuestionService.findAll(page,limit,query,idtopic,idcategory);

    questions = await Promise.all(questions.map(async (question) => {
        var created = await AuthService.findUserById(question.dataValues.idcreated);
        var topic = await TopicService.findByID(question.dataValues.idtopic);
        var category = await CategoryService.findByID(question.dataValues.idcategory);
        question.dataValues.created = created;
        question.dataValues.topic = topic;
        question.dataValues.category = category;
        return question;
    }));


    var total = await QuestionService.getTotal();

    return res.status(200).json({
        results: questions.length,
        total: total,
        data : questions,
        status : true
    });
}



exports.getQuestion = async (req, res) => { 

    var question = await QuestionService.findByID(req.params.id);

    var createdid = await AuthService.findUserById(question.idcreated);
    var idtopic = await TopicService.findByID(question.idtopic);
    var idcategory = await CategoryService.findByID(question.idcategory);

    question.dataValues.created=createdid
    question.dataValues.topic=idtopic
    question.dataValues.category=idcategory

    return res.status(200).json({
        data: question,
        status : true
    });
}
