const User = require('../../../models/User');
const Group = require('../../../models/Group');
const Company = require('../../../models/Company');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    //register user
    register: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password, company} = req.body;

        try {
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg:'User already exists'});
            };
            let co = await Company.findOne({name});
            if(co){
                return res.status(400).json({msg:'Company already exists'});
            };
            co = new Company({
                name: `${company}`
            })
            await co.save();
            user = new User({
                name,
                email,
                password,
                company,
                owner: co._id,
                group: 'Admin',
                isAdmin: true
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            grp = new Group({
                name:'Admin',
                company:co.name,
                owner:co._id
            })
            await grp.save()

            const payload = {
                user: {
                    id: user.id,
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:360000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            } );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    },

    //add new user
    add: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password, company, owner, group, isAdmin} = req.body;

        try {
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg:'User already exists'});
            };
            user = new User({
                name,
                email,
                password,
                company,
                owner,
                group,
                isAdmin
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            return res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    },

    //logout user, end session
    logout:(req, res) => {
        req.session.destroy();
        console.log('logout ', req.session);
        req.logout();
        return res.json({message:'Logged out'});
    }
}