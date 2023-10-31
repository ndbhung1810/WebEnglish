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
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
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