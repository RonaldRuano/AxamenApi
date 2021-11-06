const express = require('express');
const security = require('../security/verifier');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*Cursos*/

router.get('/cursos',security,(req,res)=>{
    console.log('get lista cursos')
    mysqlConnection.query('Select * from curso',(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err);
            res.status(200).send('Error');
        }
    })
});

router.get('/cursos/:id', security,(req,res)=>{
    console.log('get curso')
    mysqlConnection.query('Select * from curso where id = ?', [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/cursos', security,(req,res)=>{
    console.log('Insert curso')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into curso (nombre, descripcion) values (?,?)',
    [emp.nombre,emp.descripcion],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/cursos/:id', security,(req,res)=>{
    console.log('Update curso')
    let emp=req.body;
    mysqlConnection.query('update curso set nombre = ?, descripcion = ? where id = ?',
    [emp.nombre, emp.descripcion, req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.delete('/cursos/:id', security,(req,res)=>{
    console.log('Delete curso')
    mysqlConnection.query('delete from curso where id = ?',
    [req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;