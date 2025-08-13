import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: String,
    actions: Array,
}, {timestamps: true});

const Role = mongoose.model('Role', RoleSchema);

export default Role;