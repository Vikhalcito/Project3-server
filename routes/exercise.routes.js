const express = require ("express");
const router = express.Router();
const mongoose = require("mongoose");

const Exercise = require("../models/Exercise.model");

//GET /api/exercises => Ruta para renderizar todos los ejercicios

router.get("/exercises", (req, res, next) => {
    Exercise.find()
    .then((allExercises) => res.json(allExercises))
    .catch((err) => res.json(err));
})

//GET /api/exercises/:exerciseId => Ruta para renderizar en exercise en especifico

router.get("/exercises/:exerciseId", (req, res, next) => {

    const {exerciseId} = req.params

    Exercise.findById(exerciseId)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.json(err));
})


//POST /api/exercises => Ruta para crear/añadir exercises

router.post("/exercises", (req, res, next) => {
    const {name, description, category, difficulty, videoUrl} = req.body;
    
    Exercise.create({name, description, category, difficulty, videoUrl})
    .then((newExercise) => {
        res.status(201).json(newExercise);
    })
    .catch((err) => {
        console.error("Error al crear el exercise", err);
        res.status(500).json({error: "Failed to create exercise"});
    })
})

//PUT /api/exercises/:exerciseId => Editar un exercise en especifico

router.put("/exercises/:exerciseId", (req, res, next) => {
    
    const {exerciseId} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(exerciseId)) {
        res.status(400).json({message: "Specified id is not valid"})
        return;
    }

    Exercise.findByIdAndUpdate(exerciseId, req.body, {new: true})
    .then((updatedExercise) => res.json(updatedExercise))
    .catch((err) => res.json(err));
});

//DELETE /api/exercises/:exerciseId => Elimina/borra un exercise en especifico.

router.delete("/exercises/:exerciseId", (req, res, next) => {
    
    const {exerciseId} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(exerciseId)) {
        res.status(400).json({message: "Specified id is not valid"})
        return;
    }

    Exercise.findByIdAndDelete(exerciseId)
    .then(() => res.json({ message: `Task with ${taskId} is removed successfully.` }))
    .catch((err) => res.json(err))
})

module.exports = router;