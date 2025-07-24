const express = require('express');
const router = express.Router();
const task = require('../models/taskModel')

//Ana Sayfa
router.get('/',async(req,res) =>{
    const tasks = await task.find();
    res.render('index', { tasks });
})

module.exports = router