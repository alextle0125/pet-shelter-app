module.exports = (mongoose) => {
	const PetSchema = new mongoose.Schema({
		name: { type: String, required: [true, 'Pet name is required'], minlength: 3, unique: [true, 'Pet must have a unique name.'] },
		type: { type: String, required: [true, 'Pet type required'], minlength: 3 },
		description: { type: String, required: [true, 'Pet description is required'], minlength: 3 },
		skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
		likes: { type: Number, default: 0 }
	}, { timestamps: true });

	mongoose.model('Pet', PetSchema); 
}