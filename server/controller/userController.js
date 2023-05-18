import User from '../model/user.js';
import bcrypt from 'bcryptjs';

export const getUsers = async(req, res)=> {
    try{
        const user = await User.find();
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json({error : err.message});
    }
}

export const registerUser = async(req, res) => {
    try{
        console.log(req.body)
        const {name, password, address} = req.body
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name: name,
            password: hashedPassword,
            address : address,
            image: req.file.originalname
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

export const updateUser =(req, res) => {
    return new Promise(async(resolve, reject)=> {
        const {name, address} = req.body
        console.log(req.file)
        console.log(req.body)
        const {id} = req.params
        const updatedUser = await User.updateOne({_id: id}, {
            $set: {
                name: name,
                address: address,
                image: req.file.originalname
            }
        })

        res.status(200).json(updatedUser)
    })
}

export const deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.deleteOne({_id: id})
        console.log(user)
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json({error: err.message})
    }
    
}

export const getOneUser = async(req, res)=> {
    try{
        const {id} = req.params;
        const user = await User.findOne({_id: id});
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json({error: err.message})
    }
}

