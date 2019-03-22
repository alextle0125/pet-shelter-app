module.exports = (mongoose) => {
	const SkillSchema = new mongoose.Schema({
		description: { type: String, required: [true, 'Skill description is required'], minlength: 3 },
	}, { timestamps: true });

	mongoose.model('Skill', SkillSchema); 
}