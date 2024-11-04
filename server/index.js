const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const UserModel = require ('./models/Users')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://navishkapunchihewa66:P1EfGT7KBTy9uaPX@mern.kovps.mongodb.net/?retryWrites=true&w=majority&appName=Mern")

app.get('/' ,(req,res) =>{
    UserModel.find({}) 
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id' ,(req,res) =>{
   const id = req.params.id;y
   UserModel.findById({_id:id})
   .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id" ,(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        
          name: req.body.name, 
          email: req.body.email,
          age: req.body.age
        
         })

    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id' ,(req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
     .catch(err => res.json(err))
 })
 

app.post("/createUser", async (req, res) => {
    try {
        const { name, email, age } = req.body; // Extract data from request body

        // Create a new instance of the model
        const newUser = new UserModel({ name, email, age });

        // Save the user data in MongoDB asynchronously
        const savedUser = await newUser.save();

        // Send a success response with the saved user
        res.status(201).json({ message: 'User saved successfully!', user: savedUser });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: 'Error saving user', error });
        console.log(error);
    }
});


app.listen(3001,() =>{
    console.log("Server Is Runnig ")
})
-