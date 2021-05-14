const {user} = require('../models/user');
const users = require('../services/userService');

const validateGmail = (email) => {
    const patternGmail = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
    return patternGmail.test(email)
}

const checkGmail = (email, users) => {
    return users.map((user) => user.email).includes(email);
}

const checkPhone = (phone, users) => {
    return users.map((user) => user.phoneNumber).includes(phone);
}
 
const validatePhone =  (phone) => {
    const patternPhone = /^\+(?:380|7)\d{9}$/;
    return patternPhone.test(phone)
}

const generateError = (message) => {
    return {error: true, message}
}

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    if (req.body.firstName &&
        req.body.lastName &&
        req.body.email && 
        req.body.phoneNumber && 
        req.body.password
        )
    {
        const data = users.getAll();
        if (!validateGmail(req.body.email)) {
            res.status(400).json(generateError('not valid email'));
            return null;
        }
        if (checkGmail(req.body.email, data)) {
            res.status(400).json(generateError('This email is already exist'));
            return null;
        }
        if (!validatePhone(req.body.phoneNumber)) {
            res.status(400).json(generateError('not valid telephone number'));
            return null;
        }
        if (checkPhone(req.body.phoneNumber, data)) {
            res.status(400).json(generateError('telephone number is already exist'));
            return null;
        }
        if (req.body.password.length < 3) {
            res.status(404).json(generateError('short password'))
            return null;
        }
        if (typeof req.body.password !== 'string') {
            res.status(404).json(generateError('password must be string'))
            return null;
        }
        next();
    }
    else {
        res.status(400).json(generateError('not enough properties to create user'))
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const data = users.getAll();
    if (req.body.email && !validateGmail(req.body.email)) {
        res.status(400).json(generateError('not valid email'));
        return null;
    }
    if (req.body.email && checkGmail(req.body.email, data)) {
        res.status(400).json(generateError('This email is already exist'));
        return null;
    }
    if (req.body.phoneNumber && !validatePhone(req.body.phoneNumber)) {
        res.status(400).json(generateError('not valid telephone number'));
        return null;
    }
    if (req.body.phoneNumber && checkPhone(req.body.phoneNumber, data)) {
        res.status(400).json(generateError('telephone number is already exist'));
        return null;
    }
    if (req.body.password && req.body.password.length < 3) {
        res.status(400).json(generateError('short password'))
        return null;
    }
    if (req.body.password && typeof req.body.password !== 'string') {
        res.status(400).json(generateError('password must be string'))
        return null;
    }
    next();
}

const propertyValid = (req, res, next) => {
    const isProperty = Object.keys(req.body).every((key) => key in user)
    if (isProperty) {
        next()
    }
    else {
        res.status(400).json(generateError('There is no such property'))
    };
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.propertyValid = propertyValid;