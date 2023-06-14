import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app=express()

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

mongoose
.connect('mongodb://127.0.0.1/todolist2')

const itemSchema={
    nombre:String
}
const Item=mongoose.model('Item',itemSchema)

const item1=new Item({nombre:'texto de ejemplo 1'})
const item2=new Item({nombre:'texto de ejemplo 2'})
const item3=new Item({nombre:'texto de ejemplo 3'})

const defaultItems=[item1,item2,item3]

/* Item.insertMany(defaultItems)
    .then(function (){
        console.log("Salvado exitoso de default items en DB");  
    })
    .catch(function (err) {
        console.log(err);
    }) */





//A verificar
/* Item.insertMany(defaultItems,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Grabación sin errores');
    }

})
 */
//rutas
app.get('/',(req,res)=>{
    Item.find({})
    




    .then(function(foundItems){
        if(foundItems===0){
            Item.insertMany(defaultItems)
            console.log("Salvado exitoso de default items en DB");  
        }else{
            console.log(foundItems);
            res.render('list',{listTitle:'Hoy',newListItems:foundItems})
        }
        
    })
})

//app.post('/agregainfo')


app.post('/',(req,res)=>{
    const itemNombre=req.body.newTodo
    console.log(itemNombre);
    const item=new Item({
        nombre:itemNombre
    })
    item.save();
    res.redirect('/');
    //console.log(req.body.newTodo);

})

app.post('/delete',(req,res)=>{
    
    console.log(req.body.check)
    console.log('holaalal')
    const checkId=req.body.check
    Item.findByIdAndRemove(checkId)
    .then(function(error){
        if(error){
            console.log('Dato borrado')
            res.redirect('/')
        }
       
    })
    
})
    
app.listen(3030,()=>{
    console.log('Servidor en ejecución: OK!');
})