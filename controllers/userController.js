import ErrorHandler from "../middlewares/error.js"
import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import {user} from "../models/userModel.js"


export const register = catchAsyncError(async(req,res,next)=>{
    try{
        const{name, email, phone, password, verificationMethod} = req.body;
        if(!name || !email || !phone ||!password || !verificationMethod){

        }
        function validatePhoneNumber(phone){
            const phoneRegex = /^+923\d{9}$/;
            return phoneRegex.test(phone);
        }

        if (!validatePhoneNumber(phone)){
            return next(new ErrorHandler("Invalid phone number.", 400));
        }

        const existingUser = await User.findOne({
            $or: [
                {
                    phone,
                    accountVerified: false
                },
                {
                    email,
                    accountVerified: false
                },
            ],
        });

        if (registrationAttemptByUser.length>3){
            return next(
                new ErrorHandler(
                    "you have exceded the maximum limit of attempts (3). Please try again after an hour", 400
                )
            )
        }

        const userData = {
            name,
            email,
            phone,
            password,
        };

        const user = await User.create(userData);
        const verificationCode = await user.generateVeriicationCode(verificationMethod, verificationCode,email,phone);

        res.status(200).json({
            success: true,
        });
    }catch(error){
        next(error);
    }
});