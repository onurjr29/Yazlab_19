const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const {tcKimlik, email, password} = req.body;
        const user = await User.findOne({email});
        
        // tc kimlik kontrolu gelecek e devlet apisi ile yapilacak
        if(user) return res.status(400).json({message: 'Bu e-posta adresi zaten kayıtlı'});
        const newUser = await User.create({tcKimlik, email, password});
        res.status(201).json({message: 'Kayıt başarılı'});
    }catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !await bcrypt.compare(password, user.password)) return res.status(400).json({message: 'Geçersiz e-posta adresi veya şifre'});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}