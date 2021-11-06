const express = require('express');
const security = require('../security/verifier');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*PERSONAS*/

router.get('/estudiante_curso',security,(req,res)=>{
    console.log('get lista estudiante_curso')
    mysqlConnection.query('Select * from estudiante_curso',(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err);
            res.status(200).send('Error');
        }
    })
});

router.get('/estudiante_curso/:id', security,(req,res)=>{
    console.log('get estudiante_curso')
    mysqlConnection.query('Select * from estudiante_curso where id = ?', [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/estudiante_curso', security,(req,res)=>{
    console.log('Insert estudiante_curso')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into estudiante_curso (id_estudiante, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
    [emp.id_estudiante,emp.id_curso,emp.status,emp.fecha_inicio,emp.fecha_fin],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/estudiante_curso/:id', security,(req,res)=>{
    console.log('Update estudiante_curso')
    let emp=req.body;
    mysqlConnection.query('update estudiante_curso set id_estudiante = ?, id_curso = ?, status = ?, fecha_inicio = ?, fecha_fin = ? where id = ?',
    [emp.id_estudiante, emp.id_curso, emp.status, emp.fecha_inicio, emp.fecha_fin, req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.delete('/estudiante_curso/:id', security,(req,res)=>{
    console.log('Delete estudiante_curso')
    mysqlConnection.query('delete from estudiante_curso where id = ?',
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