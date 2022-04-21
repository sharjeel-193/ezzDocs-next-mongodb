import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    updatedAt:{
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    active:{
        type: Boolean,
        default: true
    }
}, {minimize: false})

export default mongoose.models.Document || mongoose.model("Document", documentSchema);