const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    getAll() {
        const users = UserRepository.getAll();
        if (users) {
            return users;
        }
        return null; 
    }
    getOne(id) {
        if (id) {
            const user = UserRepository.getOne(id);
            if(user) {
                return user;
            }
        }   
        return null;
    }
    addUser(user) {
        if (user) {
            //if (this.unvalidateProperty(user)) return {error: true, message: "email or telephone is exist. Please try again"}
            const newUser = UserRepository.create(user);
            if (newUser) return newUser;
        }
        return null;
    }
    update(id, data) {
        if (id && data) {
            const updateUser = UserRepository.update(id, data);
            if (updateUser) return updateUser;
        }
        return null
    }
    delete(id) {
        if (id) {
            const user = UserRepository.delete(id);
            if (user) return user; 
        }
        return null
    }
    /*
     unvalidateProperty({email, phoneNumber}) {
        const users = this.getAll();
        return users.map((user) => user.email).includes(email) ||  
        users.map((user) => user.phoneNumber).includes(phoneNumber); 
     }
    */

}

module.exports = new UserService();