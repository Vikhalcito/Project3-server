const express = require("express");
const router = express.Router();
const mongoose = require ("mongoose");

const Routine = require("../models/Routine.model");
const Exercise = require("../models/Exercise.model");

//POST  /api/routines => para Crear una nueva rutina
router.post("/routines", (req, res, next) => {

    const {name, category, description, difficulty, exercises} = req.body
    
    const newRoutine = new Routine({name, category, description, difficulty, exercises});

    newRoutine.save()
    .then((savedRoutine) => res.status(201).json(savedRoutine))
    .catch((err) => res.status(400).json({message: "Failed to create new Routine"}))
})

//GET /api/routines => para Obtener todas las rutinas desde la BD
router.get("/routines", (req, res, next) => {

    Routine.find()
    .populate("exercises")
    .then((allRoutines)=> res.status(201).json(allRoutines))
    .catch((err) => res.status(400).json({message: "There are no Routines to show"}))
})

//GET /api/routines/:routineId => para Obtener una Rutina en especifico
router.get("/routines/:routineId", (req, res, next) => {
    
    const {routineId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(routineId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
    }
    
    Routine.findById(routineId)
    .populate("exercises")
    .then((routine) => res.json(routine))
    .catch((err) => res.status(400).json({message: "Invalid Id or couldnt find the specific routine"}))
    
})

//PUT /api/routines/:routineId => para Editar una rutina en especifico
router.put("/routines/:routineId", (req, res, next) => {
    
    const {routineId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(routineId)) {
            res.status(400).json({message: "Specified id is not valid"})
            return;
        }

    Routine.findByIdAndUpdate(routineId, req.body, {new:true})
    .then((updatedRoutine) => res.json(updatedRoutine))
    .catch((err) => res.status(400).json({message: "Failed to update Routine"}));
})

//DELETE /api/routines/:routineId => para borrar una rutina en especifico.
router.delete("/routines/:routineId", (req, res, next) => {
    
    const {routineId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(routineId)) {
            res.status(400).json({message: "Specified id is not valid"})
            return;
        }
    
    Routine.findByIdAndDelete(routineId)
    .then(() =>
        res.json({message: "Routine successfully removed!" })
    )
    .catch((err) => res.json(err))

})

module.exports = router;