const express= require('express')
const app= express()
const port = process.env.PORT || 3025
const path=require('path')
const view_path=path.join(__dirname,'../template/')
const hbs= require('hbs')
const bodyParser= require('body-parser')


app.listen(port, () => {
    console.log(`Running in PORT: ${port}`)
})

app.set('view engine', 'hbs')
app.set('views', view_path);

app.get("/myapp",(req,res)=>{
    res.render("views.hbs")
})