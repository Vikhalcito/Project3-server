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

module.exports = router;