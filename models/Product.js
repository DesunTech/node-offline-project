import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    desp: String,
    price: Number,
    audio_features: {
        headphone_jack: Boolean,
        microphone_jack: Boolean,
        num_of_speakers: Number,
        inbuit_speaker: String
    },
    dimensions: {
        width: String,
        height: String
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;
