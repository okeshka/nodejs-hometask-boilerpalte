const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, propertyValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('', function(req, res, next) {
    const users = UserService.getAll();
    res.status(200).send(users);
})

router.get('/:id', function(req, res, next) {
    const user = UserService.search(req.params.id);
    res.status(200).send(user);
})

router.post('', responseMiddleware, createUserValid, propertyValid, function(req, res, next) {
    if ("id" in req.body) res.status(400).json({error: true, message: "id detected"})
    const user = UserService.addUser(req.body);
    res.status(200).send(user);
})

router.put('/:id', responseMiddleware, updateUserValid, propertyValid, function(req, res, next) {
    const user = UserService.update(req.params.id, req.body);
    res.status(200).send(user);
})

router.delete('/:id', function(req, res, next) {
    const user = UserService.delete(req.params.id);
    res.status(200).send(user);
})




module.exports = router;