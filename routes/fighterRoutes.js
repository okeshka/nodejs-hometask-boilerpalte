const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, propertyValid} = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get("", function(req, res, next) {
    const fighters = FighterService.getAll();
    res.status(200).json(fighters);
})

router.get("/:id", function(req, res, next) {
    const fighter = FighterService.getOne(req.params.id);
    res.status(200).json(fighter);
})

router.post("", responseMiddleware, propertyValid, createFighterValid, function(req, res, next) {
    const fighter = FighterService.addFighter(req.body);
    res.status(200).json(fighter);
})

router.put('/:id', responseMiddleware, propertyValid, updateFighterValid, function(req, res, next) {
    const fighter = FighterService.update(req.params.id, req.body);
    res.status(200).json(fighter);
})

router.delete('/:id', function(req, res, next) {
    const fighter = FighterService.delete(req.params.id);
    res.status(200).json(fighter);
})

module.exports = router;