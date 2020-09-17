const express = require('express') //import express (server creation step:1)
const app = express() //create express app (server creation step:2)
//for defining the default router
const dataService = require('./services/data.service')
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(401).send("Hello World")
})

app.get('/transactions',(req,res)=>{
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
    const result = dataService.login(req.body.accno,req.body.pswd)
     res.status(result.statusCode).json(result)
 })

 app.post('/deposit',(req,res)=>{
    const result = dataService.deposit(req.body.accno,req.body.pin,req.body.amount)
     res.status(result.statusCode).json(result)
 })

 app.post('/withdraw',(req,res)=>{
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

