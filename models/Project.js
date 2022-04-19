import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    private: {
        type: Boolean,
        default: true,
        required: true,
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
    active:{
        type: Boolean,
        default: true
    }
})

export default mongoose.models.Project || mongoose.model("Project", projectSchema);