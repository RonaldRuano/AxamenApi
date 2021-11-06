const express = require('express');
const security = require('../security/verifier');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*PERSONAS*/

router.get('/curso_docente',security,(req,res)=>{
    console.log('get lista curso_docente')
    mysqlConnection.query('Select * from curso_docente',(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err);
            res.status(200).send('Error');
        }
    })
});

router.get('/curso_docente/:id', security,(req,res)=>{
    console.log('get curso_docente')
    mysqlConnection.query('Select * from curso_docente where id = ?', [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/curso_docente', security,(req,res)=>{
    console.log('Insert curso_docente')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into curso_docente (id_docente, id_curso, status, fecha_inicio, fecha_fin) values (?,?,?,?,?)',
    [emp.id_docente,emp.id_curso,emp.status,emp.fecha_inicio,emp.fecha_fin],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/curso_docente/:id', security,(req,res)=>{
    console.log('Update estudiante_curso')
    let emp=req.body;
    mysqlConnection.query('update curso_docente set id_docente = ?, id_curso = ?, status = ?, fecha_inicio = ?, fecha_fin = ? where id = ?',
    [emp.id_docente, emp.id_curso, emp.status, emp.fecha_inicio, emp.fecha_fin, req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.delete('/curso_docente/:id', security,(req,res)=>{
    console.log('Delete estudiante_curso')
    mysqlConnection.query('delete from curso_docente where id = ?',
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