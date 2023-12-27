const QuestionService = require("../services/question.service");
const TopicService = require("../services/topic.service");
const LessonService = require("../services/lesson.service");
const CategoryService = require("../services/category.service");
const AuthService = require("../services/auth.service");
const QuizService = require("../services/quiz.service");
const ScoreService = require('../services/score.service');

exports.create = async (req, res) => {
  if (__roleId == 3) {
    return res.status(400).json({
      message: "Unauthorized",
      status: false,
    });
  }

  var dateTimeStamp = parseInt(Date.now() / 1000);

  const quizData = {
    name: req.body.name,
    idtopic: req.body.idtopic,
    idcategory: req.body.idcategory,
    idcreated: __idcreated,
    image: req.body.image,
    groupquestion: req.body.groupquestion,
    createdat: dateTimeStamp,
    updatedat: dateTimeStamp,
  };

  console.log(quizData);

  const quiz = await QuizService.createQuiz(quizData);

  var createdid = await AuthService.findUserById(quiz.idcreated);
  var idtopic = await TopicService.findByID(quiz.idtopic);
  var idcategory = await CategoryService.findByID(quiz.idcategory);

  quiz.dataValues.created = createdid;
  quiz.dataValues.topic = idtopic;
  quiz.dataValues.category = idcategory;

  var listQuestions = [];

  var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
  for (let index = 0; index < listQuestion.length; index++) {
    const question = await QuestionService.findByID(listQuestion[index]);
    listQuestions.push(question);
  }

  quiz.dataValues.listQuestions = listQuestions;

  return res.json({
    data: quiz,
    message: "Quiz registered successfully.",
    status: true,
  });
};

exports.update = async (req, res) => {
  if (__roleId == 3) {
    return res.status(400).json({
      message: "Unauthorized",
      status: false,
    });
  }

  var dateTimeStamp = parseInt(Date.now() / 1000);

  const quizData = {
    name: req.body.name,
    idtopic: req.body.idtopic,
    idcategory: req.body.idcategory,
    idcreated: __idcreated,
    image: req.body.image,
    groupquestion: req.body.groupquestion,
    createdat: dateTimeStamp,
    updatedat: dateTimeStamp,
  };

  await QuizService.updateQuiz(quizData, req.params.id);

  var quiz = await QuizService.findByID(req.params.id);

  var createdid = await AuthService.findUserById(quiz.idcreated);
  var idtopic = await TopicService.findByID(quiz.idtopic);
  var idcategory = await CategoryService.findByID(quiz.idcategory);

  quiz.dataValues.created = createdid;
  quiz.dataValues.topic = idtopic;
  quiz.dataValues.category = idcategory;

  var listQuestions = [];

  var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
  for (let index = 0; index < listQuestion.length; index++) {
    const question = await QuestionService.findByID(listQuestion[index]);
    listQuestions.push(question);
  }

  quiz.dataValues.listQuestions = listQuestions;

  return res.json({
    data: quiz,
    message: "Quiz updated successfully.",
    status: true,
  });
};

exports.delete = async (req, res) => {
  if (__roleId == 3) {
    return res.status(400).json({
      message: "Unauthorized",
      status: false,
    });
  }

  await QuizService.deleteQuiz(req.params.id);

  return res.json({
    message: "Quiz delete successfully.",
    status: true,
  });
};

exports.getQuizs = async (req, res) => {
  var page = req.query.page || 1;
  var limit = req.query.limit || 10;
  var query = req.query.query || "";
  var idcategory = req.query.idcategory || null;
  var idtopic = req.query.idtopic || null;

  var quizs = await QuizService.findAll(
    page,
    limit,
    query,
    idtopic,
    idcategory
  );

  quizs = await Promise.all(
    quizs.map(async (quiz) => {
      var created = await AuthService.findUserById(quiz.dataValues.idcreated);
      var topic = await TopicService.findByID(quiz.dataValues.idtopic);
      var category = await CategoryService.findByID(quiz.dataValues.idcategory);
      quiz.dataValues.created = created;
      quiz.dataValues.topic = topic;
      quiz.dataValues.category = category;

      var listQuestions = [];

      var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
      for (let index = 0; index < listQuestion.length; index++) {
        const question = await QuestionService.findByID(listQuestion[index]);
        listQuestions.push(question);
      }

      quiz.dataValues.listQuestions = listQuestions;

      return quiz;
    })
  );

  var total = await QuizService.getTotal();

  return res.status(200).json({
    results: quizs.length,
    total: total,
    data: quizs,
    status: true,
  });
};

exports.getQuiz = async (req, res) => {
  var quiz = await QuizService.findByID(req.params.id);

  var createdid = (await AuthService.findUserById(quiz.idcreated)) || null;
  var idtopic = await TopicService.findByID(quiz.idtopic);
  var idcategory = await CategoryService.findByID(quiz.idcategory);

  quiz.dataValues.created = createdid;
  quiz.dataValues.topic = idtopic;
  quiz.dataValues.category = idcategory;

  var listQuestions = [];

  var listQuestion = JSON.parse(quiz.dataValues.groupquestion);
  for (let index = 0; index < listQuestion.length; index++) {
    const question = await QuestionService.findByID(listQuestion[index]);
    listQuestions.push(question);
  }

  quiz.dataValues.listQuestions = listQuestions;

  return res.status(200).json({
    data: quiz,
    status: true,
  });
};


exports.checkAnswerQuiz = async (req, res) => {
  var idquiz = req.body.idquiz;
  var iduser = req.body.iduser;
  var total = req.body.total;
  var list = req.body.list;

  var score = 0;
  await Promise.all(
    list.map(async (element) => {
      var question  =await QuestionService.findByID(element['id']);
      console.log(question.answer);
      if(question.answer == element['answer']) {
        score = score + 1;
      }
    })
  );

  var dateTimeStamp = parseInt(Date.now() / 1000);
  var dataScore = {
    idquiz : idquiz,
    iduser : iduser,
    total : total,
    score : score,
    historyanswer : JSON.stringify(list),
    updatedat: dateTimeStamp,
    createdat: dateTimeStamp
  }

  const scoretmp = await ScoreService.createScore(dataScore);

  return res.json({
    score: scoretmp,
    message: "Check answer is successfully",
    status: true,
  });

};



exports.getScoreByIDQuizz = async (req, res) => {
  var idquiz = req.params.id;
  var scores = await ScoreService.findScoreByQuizID(idquiz);

  scores = await Promise.all(
    scores.map(async (score) => {
      var user = await AuthService.findUserById(score.dataValues.iduser);
      score.dataValues.user = user;
      return score;
    })
  );
  
  return res.status(200).json({
    total: scores.length,
    data: scores.sort((a,b) => b.score - a.score ),
    status: true,
  });

};


exports.getScoreByIDUser = async (req, res) => {
  var iduser = req.params.iduser;
  var scores = await ScoreService.findScoreByUserID(iduser);

  scores = await Promise.all(
    scores.map(async (score) => {
      var quizz = await QuizService.findByID(score.dataValues.idquiz);
      score.dataValues.quizz = quizz;
      return score;
    })
  );
  
  return res.status(200).json({
    total: scores.length,
    data: scores,
    status: true,
  });

};


//DASHBOARD
exports.dashboard = async (req, res) => {
  var totalQuiz = await QuizService.getTotal();
  var totalQuestion = await QuestionService.getTotal();
  var totalUser = await AuthService.getTotal();
  var totalCategory = await CategoryService.getTotal();
  var totalLesson = await LessonService.getTotalAll();

  return res.status(200).json({
    totalQuiz: totalQuiz,
    totalQuestion: totalQuestion,
    totalUser: totalUser,
    totalCategory: totalCategory,
    totalLesson: totalLesson,
    status: true,
  });
};