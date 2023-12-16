const express = require('express');
const router = express.Router();
const  Book  = require("../models/bookModels")


router.post('/', async (req, res)=>{
    try{
        if ( !req.body.title || !req.body.author || !req.body.publishYear)
        {
            console.log(req.body)
            return res.status(400).send({
                message: `send all requires fields: title , author, publishYear`
            })
            
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        };


        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}
);

router.get('/', async (req, res)=>{
    try{
      
        const book = await Book.find({});

        return res.status(200).json({
            count: book.length,
            data: book
        });

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}
);

router.get('/:id', async (req, res)=>{
try{
    
    const {id} = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);

}catch(err){
    console.log(err.message);
    res.status(500).send({message: err.message})
}
}
);

router.put('/:id', async (req, res)=>{
try{
    
    if ( !req.body.title || !req.body.author || !req.body.publishYear)
        {
            console.log(req.body)
            return res.status(400).send({
                message: `send all requires fields: title , author, publishYear`
            })
        }
    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id , req.body);
    if(!result){
        return res.status(404).send({message: 'Book not found'})
    }
    return res.status(200).send({message: 'Book Updated Sucessfully'})

}catch(err){
    console.log(err.message);
    res.status(500).send({message: err.message})
}
}
);

router.delete(':id', async (req, res)=>{
try{
    
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
        return res.status(404).send({message: 'Book not found'})
    }
    return res.status(200).send({message: 'Book Deleted Sucessfully'})
}catch(err){
    console.log(err.message);
    res.status(500).send({message: err.message})
}
}
);

 module.exports  = router; 