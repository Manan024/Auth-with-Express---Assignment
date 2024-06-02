import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [1, "Name must be at least 5 characters long"],
      maxLength: [500, "Name must be less than 50 characters "],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Please enter a valid email address",
      ],
    },

    username: {
      type: String,
      required: [true, "userName is required"],
      select: false,
    },
    password: {
      type: String,
      required: [true, "Email is required"],
      select: false,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.methods = {
  generateAuthToken: async function () {
    return await JWT.sign(
      {
        id: this._id,
        email: this.email,
      },
      "SECRET",
      {
        expiresIn: "24h",
      }
    );
  },
  comparePassword: async function (textpassword) {
    return await bcrypt.compare(textpassword, this.password);
  },
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
