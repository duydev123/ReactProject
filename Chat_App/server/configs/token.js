import jwt from 'jsonwebtoken'
import  dotenv from 'dotenv';
dotenv.config();

export const GenerateToken = async ({user_id}) => {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        console.log("Secret not valid" );
    }
    console.log(secret);
    const token = jwt.sign({user_id} , secret, {expiresIn: '1h'});
    return token;
}