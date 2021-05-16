const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('', function(req, res, next) {
    const users = UserService.getAll();
    if (users) {
        res.status(200).send(users);
    }
    else res.status(400).json({error: "true", message: "users not found"})
})

router.get('/:id', function(req, res, next) {
    const user = UserService.getOne(req.params.id);
    if (user) { 
        res.status(200).json(user);
    }
    else res.status(400).json({error: "true", message: "user not found"}) 
})

router.post('', responseMiddleware, createUserValid, function(req, res, next) {
    const user = UserService.addUser(req.body);
    if (user.error) return res.status(400).json(user)
    if (user) {
        res.status(200).json(user);
    }
    else res.status(400).json({error: "true", message: "can't add new user"})
})

router.put('/:id', responseMiddleware, updateUserValid, /*propertyValid,*/ function(req, res, next) {
    const user = UserService.update(req.params.id, req.body);
    if (user) {
        res.status(200).json(user)
    }
    else res.status(400).json({error: "true", message: "user not found"})
})

router.delete('/:id', function(req, res, next) {
    const user = UserService.delete(req.params.id);
    if (user) {
        res.status(200).send(user);
    }
    else res.status(404).json({error: "true", message: "user not found"}) 
})

module.exports = router;