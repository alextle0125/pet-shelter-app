const petsController = require('../controllers/pets.js')
const skillsController = require('../controllers/skills.js')

module.exports = (app) => {
	app.get('/api/pets', petsController.allPets)
	app.get('/api/pets/:id', petsController.getPetDetails)
	app.get('/api/skills/:id', skillsController.getSkillDetails)
	app.post('/pets/add', petsController.createPet)
	app.put('/pets/:id/edit', petsController.updatePet)
	app.put('/pets/:id/like', petsController.incrementPetLike)
	app.delete('/pets/:id/adopt', petsController.adoptPet)
}
