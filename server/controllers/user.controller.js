const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const User = require("../models/user.model")
require("dotenv").config()

const transport = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: process.env.SENDINBLUE_EMAIL_PORT,
    auth: {
        user: process.env.SENDINBLUE_USER_NAME,
        pass: process.env.SENDINBLUE_PASSWORD
    }
})

exports.signUp = (req, res)=>{
    const {
        fName,
        lName,
        email,
        password,
        userName
    } = req.body
    User.findOne({ email: email }, (err,user) => {
        if (err) {
            return res.status(401).json({
                error:"Something went wrong!!"
            })
        }
        if (user) {
            return res.status(400).json({
                error:"Email already exists!!"
            })
        }

        const token=jwt.sign({
            fName,
            lName,
            email,
            password,
            userName
        }, process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: "2m" }
        )
        const activateLink=`${process.env.CLIENT_URL}/auth/activate/${token}`
        const emailData = {
            to: [
                {
                   address: email,
                   name:fName,
                },
            ],
            from: {
                address: process.env.EMAIL_FROM,
                name:"Soak India"
            },
            subject: "Account Activation Link",
            html: `
            <div>
            <h1>Please use the following link to activate the account</h1>
            <a href="${activateLink}" target="_blank">
                ${activateLink}
            </a>
            <hr />
            <p>This email contains sensitive information</p>
            <a href="${process.env.CLIENT_URL}" target="_blank">
                ${process.env.CLIENT_URL}
            </a>
            </div>
            `
        }
        transport.sendMail(emailData, (err, info) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
      
            return res.json({
                message: `Email has been successfully sent to ${email}. Follow the instructions in the email to activate your account.`,
            })
        })
    })
}

exports.activateAccount = (req, res) => {
    const { token } = req.body;
  
    if (token) {
      return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
        if (err) {
          return res.status(401).json({
            error: "The link has expired.",
          });
        }
  
          const {
              fName,
              lName,
              email,
              password,
              userName
          } = jwt.decode(token);
  
          const newUser = new User({
            fName,
            lName,
            email,
            password,
            userName,
            
          });
  
        User.findOne({ email:email },(err, user) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
  
          if (user) {
            return res.status(400).json({
              error: "The account has already been activated.",
            });
          }
  
          newUser.save((err, userData) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
  
            res.json({
              message: `Hey ${fName}, welcome to the app!!`,
            });
          });
        });
      });
    }
  
    return res.status(401).json({
      error: "The token is invalid",
    });
};
  
exports.signIn = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with the email specified doesn't exist.",
        });
      }
  
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Password is incorrect",
        });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      const { _id, fName, lName, role, email } = user;
  
      return res.json({
        token,
        user: {
          _id,
          fName,
          lName,
          role,
          email,
        },
        message: "Signed in successfully",
      });
    });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exist.",
      });
    }

    const token = jwt.sign({ _id: user._id, fName: user.fName }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    const link = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset Link",
      html: `
        <h1>Please use the following link to reset your password:</h1>
        <a href="${link}" target="_blank">${link}</a>
      `,
    };

    return user.updateOne({ resetPasswordLink: token }).exec((err, success) => {
      if (err) {
        return res.status(400).json({
          error: "There was an error in saving the reset password link",
        });
      }

      transport
        .sendMail(emailData)
        .then(() => {
          return res.json({
            message: `Email has been successfully sent to ${email}`,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "There was an error in sending the email.",
          });
        });
    });
  });
};
  