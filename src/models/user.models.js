import mongoose,{schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crpto from "crypto";
const userschema = new mongoose.Schema(
    {
        avtar: {
            type: {
                url: String,
                localpath: String,

            },
            default:{
                url: `https://placehold.co/200x200`,
                localpath: "",
            }
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true,
            index:true,
        },
        FullName: {
            type: String,
            required: true,
            trim:true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        isEmailVerified: {  
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String,
            default: null
        },
        forgotPasswordToken: {
            type: String,
            default: null
        },
        forgotPasswordTokenExpiry: {
            type: Date,
            default: null
        },
        emailVerificationToken :{
            type: String, 
        },
        emailVerificationExpiry:{
            type: Date,
        }
        
    },{
        timestamps:true,
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
   
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
)
}
userSchema.methods.generateTemporaryToken=function(){
    const unHashedToken=crypto.randomBytes(20).toString("hex")
    const HashedToken=crypto
                      .creatHash("SHA256")
                      .update(unHashedToken)
                      .digest("hex")

    const tokenExpiry=Date.now()+ (20*60*1000)    
    return{unHashedToken,HashedToken,tokenExpiry}                  
}


export const User = mongoose.model("User",userschema);