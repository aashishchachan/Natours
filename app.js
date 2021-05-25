const express = app.require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.status(200)
        .json({project: 'Natours', commit: 'initial'})
})

app.post('/', (req, res) =>{
    res.send("receiving post requests!");
})


app.listen(port, (req, res)=>{
    console.log(`listening at port ${port}`);
})

