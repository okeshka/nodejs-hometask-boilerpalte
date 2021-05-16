const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        const fighters = FighterRepository.getAll();
        if (fighters) {
            return fighters;
        }
        return null; 
    }
    getOne(id) {
        if (id) {
            const fighter = FighterRepository.getOne(id);
            if (fighter) return fighter;
        }
        return null
    }
    addFighter(fighter) {
        if (fighter) {
            const newFighter = FighterRepository.create(fighter);
            if (newFighter) return newFighter;
        }
        return null
    }
    update(id, data) {
        if (id && data) {
            const fighterUpdate = FighterRepository.update(id, data);
            if (fighterUpdate) return fighterUpdate;
        }
        return null
    }
    delete(id) {
        if (id) {
            const fighter = FighterRepository.delete(id);
            if (fighter) return fighterl
        }
        return null
    }
}

module.exports = new FighterService();