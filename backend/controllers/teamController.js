const Team = require('../models/teamModel');

const saveTeam = async (req, res) => {
    try{
        const { name } = req.body;

        const team = new Team({
            name
        });

        const savedTeam = await team.save();
        res.json(savedTeam);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    saveTeam
};