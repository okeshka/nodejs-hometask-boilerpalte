const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    getAll() {
        const users = UserRepository.getAll();
        if (!users) {
            return null;
        }
        return users; 
    }
    search(id) {
        const item = UserRepository.getOne(id);
        if(!item) {
            return null;
        }
        return item;
    }
    addUser(user) {
        if (user) {
            return UserRepository.create(user)
        }
        else {
            return null
        }
    }
    update(id, data) {
        if (id && data) {
            return UserRepository.update(id, data)
        }
        else return null
    }
    delete(id) {
        if (id) {
            return UserRepository.delete(id)
        }
        else return null
    }
}

module.exports = new UserService();