const nedb = require('gray-nedb');
const nedb = require('gray-nedb');
const userDB = new nedb({ filename: './db/user.db', autoload: true });
const adminDB = new nedb({ filename: './db/admin.db', autoload: true });
const bcrypt = require('bcrypt');
const saltRounds = 10; // Define saltRounds


//---------------------------user---------------------//

class UserDAO {
    constructor(fullName, email, phoneNumber, isAdmin, userName, userId){
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
        this.isAdmin = isAdmin;
    }

    createUser() {
        return new Promise((resolve, reject) => {
            const entry = {
                userName: this.userName,
                fullName: this.fullName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                userId: this.userId,
                isAdmin: this.isAdmin,
            };
            userDB.insert(entry, function(err, newUser) {
                if (err){ 
                    reject(err);
                } else { 
                    resolve(newUser);
                }
            });
        });
    }

    updateUser(userId, updatedData) {
        userDB.update({_id: userId}, { $set: updatedData }, {}, function(err, numReplaced) {
            if (err){
                console.log('Error updating user: ', err);
            } else {
                console.log('User updated successfully');
            }
        });
    }

    removeUser(userId) {
        return new Promise((resolve, reject) => {
            userDB.remove({_id: userId}, {}, function(err, removeUser) {
                if (err){ 
                    reject(err);
                } else { 
                    console.log("User " + userId + " removed from system");
                    resolve(removeUser);
                }
            });
        });
    }

        // Get a user by ID
        getUserById(userId, cb) {
            userDB.find({_id: userId}, function(err, user) {
                if (err){ 
                    console.log('User not found');
                    return cb(err);
                }
                else {
                    if (user.length == 0){
                        console.log("please provide a valid ID");
                        return cb(null, null);
                    }
                    console.log("user:" + user)
                    return cb(null, user[0]);
                }
            });
    }
}

module.exports = UserDAO;   

//------------------------------Admin---------------------//

