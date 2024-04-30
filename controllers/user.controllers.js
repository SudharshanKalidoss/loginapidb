const db = require('../db');
const passwordValidator = require('password-validator');
const validator = require('validator');

const passwordSchema = new passwordValidator();

passwordSchema 
    .is().min(8)
    .is().max(50)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

function isValidEmail(email){
    return validator.isEmail(email);
}

async function registerUser(req,res){
    const {username , password} = req.body;

    if(!isValidEmail(username)){
        return res.status(400).json({error:"Please enter a valid mail id"})
    }

    if(!passwordSchema.validate(password)){
        return res.status(400).json({error:"Enter a pasword with our password stadards"})
    }
    try{
        await db.query('INSERT INTO users (username,password) VALUES (?,?)',[username,password]);
        return res.status(201).json({message:"user created Successfully"});
    }catch(error){
        return res.status(400).json({error:"User creation failed"});
    }

    // db.query('INSERT INTO users (username ,password) VALUES (?,?)',[username , password],(err,result)=>{
    //     if(err){
    //         return res.status(400).json({error:"user creation failed"});
    //     }
    //     return res.status(201).json({message:"User created successfully"});
    // });

}

async function loginUser(req,res){
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({error:"Please fill all required space"});
    }

    try{
        const [rows, fields] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if(rows ===0){
            return res.status(400).json({error:"invalid username or password"});
        }
        return res.status(201).json({messaeg:"Logged in successfully"});
    }catch(error){
        return res.status(500).json({error:"Authentication failed"});
    }

    // db.query('SELECT * FROM users WHERE username =? AND password=?',[username,password],(err,result)=>{
    //     if(err){
    //         return res.status(500).json({error :"Authentication failed"});
    //     }
    //     if(result.length === 0){
    //         return res.status(400).json({error:"Invalid username of password"});
    //     }
    //     res.json({message:"Login successfull"});
    // });
}

module.exports = {registerUser , loginUser};
