const mongoose = require('mongoose'),
    crypto = require('crypto'),
    shortId = require('shortid'),
    userSchema = new mongoose.Schema({
        username: {
            type: String,
            max: 32,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
            required: true
        },
        name: {
            type: String,
            max: 32,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true
        },
        profile: {
            type: String,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        about: {
            type: String,
        },
        role: {
            type: Number,
            trim: true
        },
        photo: {
            type: Buffer,
            contentType: String
        },
        resetPasswordLink: {
            type: String,
            default: ''
        }
    }, { timestamp: true })

// const User = mongoose.model('User', userSchema);
userSchema.virtual('password')
    .set(function (password) {

        this._password = password;

        this.salt = this.makeSalt();

        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainText) {
        this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

const User = mongoose.model('User', userSchema);

const createUser = async (data) => {
    try {
        let user = await User.findOne({email:data.email});
        if(user) {
            return null;
        }
        data.username = shortId.generate();
        data.profile = process.env.CLIENT_URL + '/profile/' + data.username;
        user = new User(data);
        return user.save();
        
    } catch (error) {
        return error
    }
}

module.exports = {
    createUser
}
