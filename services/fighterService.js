const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        const fighters = FighterRepository.getAll();
        if (!fighters) {
            return null;
        }
        return fighters; 
    }
    search(id) {
        const fighter = FighterRepository.search(id);
        if (!fighter) {
            return null
        }
        return fighter;
    }
    addFighter(fighter) {
        if (fighter) {
            return FighterRepository.create(fighter)
        }
        else {
            return null
        }
    }
    update(id, data) {
        if (id && data) {
            return FighterRepository.update(id, data)
        }
        else return null
    }
    delete(id) {
        if (id) {
            return FighterRepository.delete(id)
        }
        else return null
    }
}

module.exports = new FighterService();