const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    minLength: 6,
    maxLength: 250,
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "mail is required"],
    validate: {
      validator: function (value) {
        return /^.+@.+\.com$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password ke liye bhi bole kya ab"],
    minLength: 5,
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
          value
        );
      },
      message: (props) =>
        `Password should contain at least 8 letters(atleast one number, one smallcase and uppercase alphabets)`,
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
