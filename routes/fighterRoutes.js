const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, propertyValid} = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get("", function(req, res, next) {
    const fighters = FighterService.getAll();
    if (fighters) {
        res.status(200).json(fighters);
    }
    else res.status(400).json({error: "true", message: "users not found"})
})

router.get("/:id", function(req, res, next) {
    const fighter = FighterService.getOne(req.params.id);
    if (fighter) { 
        res.status(200).json(fighter);
    }
    else res.status(400).json({error: "true", message: "id not found"})
})

router.post("", responseMiddleware, propertyValid, createFighterValid, function(req, res, next) {
    const fighter = FighterService.addFighter(req.body);
    if (fighter) { 
        res.status(200).json(fighter);
    }
    else res.status(400).json({error: "true", message: "couldn't add user"})
})

router.put('/:id', responseMiddleware, propertyValid, updateFighterValid, function(req, res, next) {
    const fighter = FighterService.update(req.params.id, req.body);
    if (fighter) { 
        res.status(200).json(fighter);
    }
    else res.status(400).json({error: "true", message: "id not found"})
})

router.delete('/:id', function(req, res, next) {
    const fighter = FighterService.delete(req.params.id);
    if (fighter) { 
        res.status(200).json(fighter);
    }
    else res.status(400).json({error: "true", message: "id not found"})
})

module.exports = router;