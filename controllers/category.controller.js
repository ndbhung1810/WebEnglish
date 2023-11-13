const CategoryService = require('../services/category.service');

exports.create = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }

    var dateTimeStamp = parseInt(Date.now()/1000);

    const categoryData = {
        name: req.body.name,
        image: req.body.image,
        idcreated: global.__idcreated,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }
    
    const category = await CategoryService.createCategory(categoryData);
    return res.json({
        data: category,
        message: 'Category registered successfully.',
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

    const categoryData = {
        name: req.body.name,
        image: req.body.image,
        idcreated: global.__idcreated,
        createdat:req.body.createdat,
        updatedat:dateTimeStamp,
    }
    
    await CategoryService.updateCategory(categoryData,req.params.id);

    var category = await CategoryService.findByID(req.params.id);

    return res.json({
        data: category,
        message: 'Category updated successfully.',
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

    await CategoryService.deleteCategory(req.params.id);
    
    return res.json({
        message: 'Category delete successfully.',
        status : true
    });
}


exports.getCategories = async (req, res) => { 
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";

    var categories = await CategoryService.findAll(page,limit,query);

    var total = await CategoryService.getTotal();

    return res.status(200).json({
        results: categories.length,
        total: total,
        data : categories,
        status : true
    });
}


exports.getCategory = async (req, res) => { 

    var category = await CategoryService.findByID(req.params.id);

    return res.status(200).json({
        data: category,
        status : true
    });
}

