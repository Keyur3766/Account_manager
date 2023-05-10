const jwt = require("jsonwebtoken");
const db = require("../models");

const users = db.User;
// const users = [
//     {
//         id: 1,
//         username: 'admin',
//         password: 'password123'
//     }
// ];


const Authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwtToken;
        // if (!token) {
        //     throw new Error('No JWT token found');
        // }
        console.log(token);
        const verifyToken =  jwt.verify(token, "secretkey");

        const rootUser = await users.findOne(
            {
                where: 
                {
                    id: verifyToken.sub, 
                    token: token 
                }
            }
        );
        
        if(!rootUser){
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.UserId = rootUser.id;

        // console.log(rootUser);
        // jwt.verify(token, "secretkey", (err, user) => {
        //     if (err) return res.sendStatus(403);
        //     req.user = user;
        //     next();
        // });

        next();
    }
    catch(error){
        console.log(error);
        res.status(401).send("Unauthorized user");
    }
}    

module.exports = Authenticate;