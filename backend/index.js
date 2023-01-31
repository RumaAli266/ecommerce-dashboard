import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import connectDB from './db/connectdb.js'
import User from './model/User.js'
import Product from './model/Product.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || '5000'
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL)

import multer from 'multer'

const upload = multer({ dest: 'uploads/'})
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
//define route
app.post('/register', async (req, res)=>{
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password
    res.send(result)
})

//route for login
app.post("/login", async (req, res)=>{
    if(req.body.password && req.body.email){
        console.log(User)
        let user = await User.findOne(req.body).select("-password");
        console.log(user)   
        if(user){
            res.send(user)
        }else{
            res.send({result:"No User Found!"})
        }
    }else{
        res.send({result:"No email and password found!"})
    }
})

//route for add product
app.post('/add-product', upload.single('photo'), async(req, res)=>{
    console.log(req.file, req.body, 'line no 57')
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    const photo = req.file.path
    const company = req.body.company

    let product = new Product({name: name, price: price, category: category, photo: photo, company: company})
    console.log(product)
    let result = await product.save()
    res.send(result)
})




//route for get products
app.get('/products', async (req, res)=>{
    let products = await Product.find();
    if(products.length > 0){
        res.send(products)
    }else{
        res.send({result: "No Product found"})
    }
})

app.get("/", ((req, res)=>{
    res.send('app is working')
}))


//route for delete product 
app.delete("/product/:id", ((req, res)=>{
    const result = Product.deleteOne({_id: req.params._id})
    console.log('backend0', result)
    res.send(result);

}))


app.listen(port, ()=>{
    console.log(`Server listeninnng at http://localhost:${port}`)
})