const { fighter } = require('../models/fighter');
const fighters = require('../services/fighterService');

const generateError = (message) => {
    return {error: true, message}
}

const checkName = (name, fighters) => {
    return fighters.map((fighter) => fighter.name).includes(name);
}
const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    if (req.body.power &&
        req.body.defense &&
        req.body.name)
    {   
        const data = fighters.getAll();
        if (typeof req.body.power !== 'number' || req.body.power <= 1 || req.body.power >= 100) {
            res.status(400).json(generateError('not valid power of fighter'));
            return null;
        }
        if (checkName(req.body.name, data)) {
            res.status(400).json(generateError('This name is already exist'));
            return null;
        }
        if (req.body.defense !== 'number' || req.body.defense <= 1 || req.body.defense >= 10) {
            res.status(400).json(generateError('not valid defence of fighter'));
            return null;
        }
        if (req.body.health && (req.body.health <= 80 || req.body.health >= 100)) { 
            res.status(400).json(generateError('not valid health of fighter'));
            return null;
        }
        if (!req.body.health) req.body.health = 100;
        
        next();
    }
    else {
        res.status(404).json(generateError('not enough properties to create fighter'))
    }
}


const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update   
        const data = fighters.getAll();
        if (req.body.power && (typeof req.body.power !== 'number'|| req.body.power <= 1 || req.body.power >= 100)) {
            res.status(400).json(generateError('not valid power of fighter'));
            return null;
        }
        if (req.body.name && checkName(req.body.name, data)) {
            res.status(400).json(generateError('This name is already exist'));
            return null;
        }
        if (req.body.defense && (req.body.defense !== 'number' || req.body.defense <= 1 || req.body.defense >= 10)) {
            res.status(400).json(generateError('not valid defence of fighter'));
            return null;
        }
        if (req.body.health && (req.body.health <= 80 || req.body.health >= 100)) { 
            res.status(400).json(generateError('not valid health of fighter'));
            return null;
        }
        next();   
}
const propertyValid = (req, res, next) => {
    const isProperty = Object.keys(req.body).every((key) => key in fighter)
    if (isProperty) {
        next()
    }
    else {
        res.status(400).json(generateError('There is no such property'))
    };
}
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.propertyValid = propertyValid;