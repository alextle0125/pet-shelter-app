const mongoose = require('mongoose'),
	  Pet = mongoose.model('Pet'),
	  Skill = mongoose.model('Skill')

module.exports = {
	allPets: (req, res) => {
		Pet.find({}, null, {sort: {type: 1}}, function (err, data){
			return res.json(data);
		});
	},
	getPetDetails: (req, res) => {
		Pet.findOne({_id: req.params.id}, function (err, pet){
			return res.json(pet);
		});
	},
	createPet: (req, res) => {
		let pet = new Pet({name: req.body.name, type: req.body.type, description: req.body.description});
		if(req.body.skill_1){
			let skill = new Skill({description: req.body.skill_1});
			skill.save();
			pet.skills.push(skill);
		}
		if(req.body.skill_2){
			let skill = new Skill({description: req.body.skill_2});
			skill.save();
			pet.skills.push(skill);
		}
		if(req.body.skill_3){
			let skill = new Skill({description: req.body.skill_3});
			skill.save();
			pet.skills.push(skill);
		}
		pet.save(function(err){
			if(err) {
				validation_data = {}
				for(let key in err.errors){
					validation_data[err.errors[key]] = err.errors[key].message;
				}
				if(err.code === 11000){
					validation_data['uniqueness'] = "Pet must have a unique name.";
				}
				validation_data['status'] = 401;
				return res.json(validation_data);				
			} else {
				return res.json({status: 200});
			}
		});
	},
	updatePet: (req, res) => {
		Pet.findOne({_id: req.params.id}, function (err, pet){
			pet.name = req.body.name;
			pet.type = req.body.type;
			pet.description = req.body.description;

			let skillCount = 0,
				skills = [];

			if(req.body.skill_1){
				skills.push(req.body.skill_1);
				skillCount++;
			}
			if(req.body.skill_2){
				skills.push(req.body.skill_2);
				skillCount++;
			}
			if(req.body.skill_3){
				skills.push(req.body.skill_3);
				skillCount++;
			}

			for(var i = 0; i < pet.skills.length; i++) {
				Skill.remove({_id: pet.skills[i]}, function(err, skill) {});
				pet.skills = [];
			}

			for(var i = 0; i < skills.length; i++) {
				let skill = new Skill({description: skills[i]});
				skill.save();
				pet.skills.push(skill);
			}

			pet.save(function(err){
				if(err) {
					validation_data = {}
					for(let key in err.errors) {
						validation_data[err.errors[key]] = err.errors[key].message;
					}
					validation_data['status'] = 401;
					return res.json(validation_data);				
				} else {
					return res.json({status: 200});
				}
			});
		});			
	},
	incrementPetLike: (req, res) => {
		Pet.findOne({_id: req.params.id}, function (err, pet){
			pet.likes++;
			pet.save();
			return res.json(pet);
		});		
	},
	adoptPet: (req, res) => {
		Pet.remove({_id: req.params.id}, function (err, product) {
			if(err) {
				err['status'] = 401;
				return res.json(err);
			} else {
				return res.json({status: 200});
			}
		});
	}
}