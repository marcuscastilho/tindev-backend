
const dev = require('../models/devModel');

module.exports = {
    async store(req, res){
        console.log(req.params.devId);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await dev.findById(user);
        const targetDev = await dev.findById(devId);
        
        if (!targetDev){
            return res.status(400).json({
                error: 'Dev not exists'
            });
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Deu Match!');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
}