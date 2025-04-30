import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:{
        type: String,
        minLength: [8,"password must have at least 8 characters."],
        maxlength:[32, "Password can't have more than 32 characters."],
    },
    phone: String,
    accountVerified:{type: Boolean, default: false},
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

export const User = mongoose.model("User", userSchema);