const { Schema, model } = require("mongoose");
const crypto = require("crypto")

const UserSchema = new Schema({
    fName: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    lName: {
        type: String,
        trim: true,
        required: true,
        max: 32,
      },
      email: {
        type: String,
        trim: true,
        required: [true,"add email"],
        unique: [true],
        lowercase: true,
      },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: [true,"user name already exist"],
        lowercase: true
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default:"Subscriber"
  },
  resetPasswordLink: {
    data: String,
    default:""
  },
}, { timestamps: true })

UserSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "")
  },
  encryptPassword: function (password) {
    if (!password) return "Something Went Wrong"
    
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
    } catch(err){
        return err
    }
  },
  authenticate: function (password) {
    return this.encryptPassword(password)===this.hashed_password
  }
}

UserSchema.virtual("password")
  .set(function (password) {
    // temporary variable called password
    this._password = password;

    // generate salt and save it in our database
    this.salt = this.makeSalt();

    // encrypt the password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

module.exports=model("User",UserSchema)