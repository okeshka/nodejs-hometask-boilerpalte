const { BaseRepository } = require('./baseRepository');
const { user } = require('../models/user'); 

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }
    
    create(data) {
        const isProperty = Object.keys(data).every((key) => key in user);
        if (!isProperty) {
            return {error: 'true', message: 'no such property ha-ha'};
        }
        const {email, phoneNumber} = data;
        if (this.dbContext.map((user) => user.email).includes(email) ||  
        this.dbContext.map((user) => user.phoneNumber).includes(phoneNumber)) 
        return {error: 'true', message: 'email or telephone exist ha-ha'};
        super.create(data);
    }
}

exports.UserRepository = new UserRepository();