const express=require('express')

const app = express();
const PORT = 3002;


app.use(express.json());

//in memory db for simplicity
const items={};

//Create item
app.post('/items',(req,res)=>{
    const {id, name}=req.body;
    if(items[id]) return res.status(409).send({message: 'Item already exists'});
    items[id]={id, name}
    res.status(201).send(items[id]);
});


//read item
app.get('/items/:id', (req,res)=>{
    const item = items[req.params.id];
    if(!item) return res.status(404).send({message:"item not found"})
        res.send(item)

});

//update item
app.put('/items/:id', (req,res)=>{
    const {id} = req.params;
    const {name}=req.body;
    if(!items[id]) return res.status(404).send({message: 'item not found'})
        items[id].name=name;
        res.send(items[id]);
})

//delete item
app.delete('/items/:id', (req,res)=>{
    const {id} = req.params;
    if(!items[id]) return res.status(404).send({message:'item not found'});
    delete items[id];
    res.status(204).send();
})

app.listen(PORT, ()=> console.log(`server running on http://localhost:${PORT}`))

module.exports=app


//to delete already pushed nodemodules from github.
//git rm -r --cached node_modules


//command to push code to our branch
// git push -f origin my_branch