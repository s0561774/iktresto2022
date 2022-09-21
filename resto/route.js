const Post = require('./models/reservation');
const express = require('express');
//const upload = require('../middleware/upload');
const router = express.Router()


router.get('/', (req, res)=>{
    res.render('pages/index')
});

router.get('/about', (req, res)=>{
    res.render('pages/about')
});

router.get('/admin/reservation', async (req, res)=>{
    

    const allPost = await Post.find();
    console.log(allPost);
    res.render('admins/reservation',  {list: allPost})
});


router.get('/menu', (req, res)=>{
    res.render('pages/menu')
});

router.get('/reservation', (req, res)=>{
    res.render('pages/reservation')
});
   
router.get('/team', (req, res)=>{
    res.sendFile(__dirname + '/views/pages/team.html')

});
router.get('/special-dishes', (req, res)=>{
    res.sendFile(__dirname + '/views/pages/special-dishes.html')

});



router.post('/reservation',async (req, res) => {
    const newPost = new Post({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        datetimepicker: req.body.datetimepicker,
        time: req.body.time,
        selectPerson: req.body.selectPerson, 
        message: req.body.message
        
    })
    console.log(newPost);
    await newPost.save(function(err){
        if(err)
        {
            console.log(err)
        }
    });
    console.log(newPost);
   res.redirect('/reservation');
// res.sendStatus(201);
 //   res.redirect('/');
});


router.get('/posts/:id', async(req, res) => {
    try{
        const post = await Post.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(post)
    }catch{
            res.status(404);
            res.send({
                error: "Post does not exist!"
            });
    }
});

/*
router.patch('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })

        if (req.body.name) {
            post.title = req.body.name
        }

        if (req.body.description) {
            post.location = req.body.description
        }

        if (req.body.price) {
            post.image_id = req.body.price
        }

        await Post.updateOne({ _id: req.params.id }, post);
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});

router.delete('/posts/:id', async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});
*/
module.exports = router;



