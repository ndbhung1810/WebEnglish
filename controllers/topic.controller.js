const TopicService = require('../services/topic.service');

exports.create = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const topicData = {
        name: req.body.name,
        image: req.body.image,
        idcreated: __idcreated,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }
    
    const topic = await TopicService.createTopic(topicData);
    
    return res.json({
        data: topic,
        message: 'Topic registered successfully.',
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

    const topicData = {
        name: req.body.name,
        image: req.body.image,
        idcreated: __idcreated,
        createdat:req.body.createdat,
        updatedat:dateTimeStamp,
    }
    
    await TopicService.updateTopic(topicData,req.params.id);

    var topic = await TopicService.findByID(req.params.id);

    return res.json({
        data: topic,
        message: 'Topic updated successfully.',
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

    await TopicService.deleteTopic(req.params.id);

    return res.json({
        message: 'Topic delete successfully.',
        status : true
    });
}


exports.getTopics = async (req, res) => { 
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";

    var topics = await TopicService.findAll(page,limit,query);

    var total = await TopicService.getTotal();

    return res.status(200).json({
        results: topics.length,
        total: total,
        data : topics,
        status : true
    });
}


exports.getTopic = async (req, res) => { 

    var topic = await TopicService.findByID(req.params.id);

    return res.status(200).json({
        data: topic,
        status : true
    });
}

