const mongoose = require('mongoose'),
	  Skill = mongoose.model('Skill')

module.exports = {
	getSkillDetails: (req, res) => {
		Skill.findOne({_id: req.params.id}, function (err, skill){
			return res.json(skill);
		});
	}
}