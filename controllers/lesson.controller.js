const LessonService = require('../services/lesson.service');

exports.create = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const lessonData = {
        name: req.body.name,
        image: req.body.image,
        sound: req.body.sound,
        idtopic: req.body.idtopic,
        idcreated: __idcreated,
        idshared: __idcreated,
        createdat: dateTimeStamp,
        updatedat: dateTimeStamp,
    }
    
    const lesson = await LessonService.createLesson(lessonData);
    
    return res.json({
        data: lesson,
        message: 'Lesson registered successfully.',
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

    

    const lessonData = {
        name: req.body.name,
        image: req.body.image,
        sound: req.body.sound,
        idtopic: req.body.idtopic,
        idcreated: __idcreated,
        idshared: __idcreated,
        createdat:req.body.createdat,
        updatedat: dateTimeStamp,
    }
    
    await LessonService.updateLesson(lessonData,req.params.id);

    var lesson = await LessonService.findByID(req.params.id);

    return res.json({
        data: lesson,
        message: 'Lesson updated successfully.',
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

    await LessonService.deleteLesson(req.params.id);

    return res.json({
        message: 'Lesson delete successfully.',
        status : true
    });
}


exports.getLessons = async (req, res) => { 
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";
    var idtopic = req.query.idtopic || -1;

    if(idtopic == null || idtopic == undefined) {
        return res.status(400).json({ 
            message: 'Topic not exits',
            status: false
        });
    }



    var lessons = await LessonService.findAll(page,limit,query,idtopic);

    var total = await LessonService.getTotal(idtopic);

    return res.status(200).json({
        results: lessons.length,
        total: total,
        data : lessons,
        status : true
    });
}


exports.getLesson = async (req, res) => { 

    var lesson = await LessonService.findByID(req.params.id);

    return res.status(200).json({
        data: lesson,
        status : true
    });
}

