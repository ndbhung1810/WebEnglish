const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');


exports.register = async (req, res) => { 
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if(isExist) {
        return res.status(400).json({ 
            message: 'Email already exists.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    var dateTimeStamp = parseInt(Date.now()/1000);

    const userData = {
        username: req.body.username,
        email: req.body.email,
        birthday:req.body.birthday,
        roleid:req.body.roleid,
        active:1,
        password: hashedPassword,
        createdat:dateTimeStamp,
        updatedat:dateTimeStamp,
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => { 
   



    const user = await AuthService.findUserByEmail(req.body.email); 
    console.log(user);
    if (user!=null) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        console.log(user.password);
        if (isMatched) {
            __idcreated = user.id;
            __roleId = user.roleid;
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
                user:user,
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl,
                id : __idcreated,
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Logged out successfully.' });
}


exports.getUsers = async (req, res) => { 
    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }


    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var query = req.query.query || "";

    var users = await AuthService.findAll(page,limit,query);
    var total = await AuthService.getTotal();

    return res.status(200).json({
        results: users.length,
        total: total,
        data : users,
        status : true
    });
}


exports.getUser = async (req, res) => { 

    var user = await AuthService.findByID(req.params.id);

    return res.status(200).json({
        data: user,
        status : true
    });
}


exports.updateUser = async (req, res) => {
    var dateTimeStamp = parseInt(Date.now() / 1000);
  
    const isExist = await AuthService.findUserByEmail(req.body.email);
  
    let hashedPassword = req.body.password;
    if (isExist.password !== req.body.password) {
      hashedPassword = await bcryptUtil.createHash(req.body.password);
    }
  
    const userData = {
      username: req.body.username,
      email: req.body.email,
      birthday: req.body.birthday,
      active: req.body.active,
      roleid: req.body.roleid,
      password: hashedPassword,
      createdat: req.body.createdat,
      updatedat: dateTimeStamp,
    };
  
    await AuthService.update(userData, req.params.id);
  
    const user = await AuthService.findByID(req.params.id);
  
    return res.json({
      data: user,
      message: "User updated successfully.",
      status: true,
    });
};

exports.update = async (req, res) => { 

    if(__roleId == 3) {
        return res.status(400).json({ 
            message: 'Unauthorized',
            status: false
        });
    }
    
    var dateTimeStamp = parseInt(Date.now()/1000);

    const isExist = await AuthService.findUserByEmail(req.body.email);

    let hashedPassword = req.body.password;
    if(isExist.password !== req.body.password) {
        hashedPassword = await bcryptUtil.createHash(req.body.password);
    }

    const userData = {
        username: req.body.username,
        email: req.body.email,
        birthday:req.body.birthday,
        active:req.body.active,
        roleid:req.body.roleid,
        password: hashedPassword,
        createdat:req.body.createdat,
        updatedat:dateTimeStamp,
    }
    
    await AuthService.update(userData,req.params.id);

    const user = await AuthService.findByID(req.params.id);
    
    return res.json({
        data: user,
        message: 'User updated successfully.',
        status : true
    });
}


exports.setActive = async (req, res) => { 
    var dateTimeStamp = parseInt(Date.now()/1000);

    const user = await AuthService.findByID(req.params.id);

    const userData = {
        ...user,
        active : !user["active"],
        updatedat:dateTimeStamp,
    }

    await AuthService.update(userData,req.params.id);
    
    return res.json({
        message: 'Update trạng thái thành công.',
        status : true
    });
}