import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String, required: true, trim: true},
    price:{type: String, required: true, trim: true},
    category:{type: String, required: true, trim: true},
    photo:{type: String},
    userId:{type: String, trim: true},
    company:{type: String, required: true, trim: true},
    
})

const ProductModel = mongoose.model("products", productSchema)


export default ProductModel