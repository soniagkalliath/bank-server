const express = require('express') //import express (server creation step:1)
const app = express() //create express app (server creation step:2)
const session= require('express-session')
//for defining the default router
const dataService = require('./services/data.service')
app.use(express.json());
app.use(session({
    secret:'randomsecuringstring',  //to create session id 
    resave: false,      //force save wont be work ie save only when modify the data.
    saveUninitialized: false    // initialised only after setting the data

}))     //session enabled

const logMiddleware=(req,res,next)=>{
    console.log("Middleware")
    next()
    }
app.use(logMiddleware)


const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return {
          status: false,
          statusCode: 401,
          Message: 'Please Log in.',
          
        }
      }
      else{
        next()
      }
    
    }
app.use(authMiddleware)

app.get('/',(req,res)=>{
    res.status(401).send("Hello World")
})

app.get('/transactions',authMiddleware,(req,res)=>{
    const result = dataService.getTransaction()
    res.status(200).json(result)
})
//appname.verb(path,function)
app.post('/',(req,res)=>{
    res.send("POST Method")
})

app.post('/register',(req,res)=>{
   const result = dataService.register(req.body.name,req.body.accno,req.body.pin,req.body.pswd)
    res.status(result.statusCode).json(result)
})

app.post('/login',(req,res)=>{
    const result = dataService.login(req,req.body.accno,req.body.pswd)
    //req.session
     res.status(result.statusCode).json(result)
 })

 app.post('/deposit',authMiddleware,(req,res)=>{
  //   console.log(req.session.currentUser)
    const result = dataService.deposit(req.body.accno,req.body.pin,req.body.amount)
     res.status(result.statusCode).json(result)
 })

 app.post('/withdraw',authMiddleware,(req,res)=>{
    const result = dataService.withdraw(req.body.accno,req.body.pin,req.body.amount)
     res.status(result.statusCode).json(result)
 })
 
app.put('/',(req,res)=>{
    res.send("PUT Method")
})

app.patch('/',(req,res)=>{
    res.send("PATCH Method")
})

app.delete('/',(req,res)=>{
    res.send("DELETE Method")
})

//server start (when we run this js in terminal "node index.js") , open localhost:3000 in the browswer
//(server creation step:3)
app.listen(3000, ()=> {
    console.log("Server started at port 3000")
}) // server up

