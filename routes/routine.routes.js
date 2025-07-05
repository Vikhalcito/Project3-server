const express = require("express");
const router = express.Router();
const mongoose = require ("mongoose");

const Routine = require("../models/Routine.model");
const Exercise = require("../models/Exercise.model");
const User = require("../models/User.model")

const {isAuthenticated} = require("../middleware/jwt.middleware")

//POST  /api/routines => para Crear una nueva rutina
router.post("/routines", isAuthenticated, async (req, res, next) => {
  try {
    const { name, category, description, difficulty, exercises } = req.body;

    // crear la rutina
    const routine = await Routine.create({
      name,
      category,
      description,
      difficulty,
      exercises,
    });

    // vincularla al usuario autenticado
    const updatedUser = await User.findByIdAndUpdate(
      req.payload._id,       //poner aqui _id en lugar de id              
      { $addToSet: { routines: routine._id } },
      { new: true }
    );

    if (!updatedUser) {
      // el id del token no existe en la BD
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Usuario actualizado →", updatedUser.routines);
    return res.status(201).json(routine);
  } catch (err) {
    next(err); 
  }
});

//GET /api/routines => para Obtener todas las rutinas desde la BD
router.get("/routines", isAuthenticated, async (req, res, next) => {
  try {
    // 1️⃣  comprueba que el middleware puso _id
    const { _id } = req.payload || {};
    if (!_id) return res.status(401).json({ message: "Token sin _id" });

    console.log("ID desde token:", _id);

    // buscar al usuario y popula sus rutinas
    const user = await User.findById(_id).populate("routines");
    if (!user) return res.status(404).json({ message: "User not found" });

    //console.log("Routines encontradas:", user.routines);
    return res.status(200).json(user.routines);               // ✔️ 200 OK
  } catch (err) {
    console.error("Error en GET /routines →", err);           // 🕵️‍♂️
    next(err);                                                // delega
  }
});

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
router.delete("/routines/:routineId", isAuthenticated, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { _id: userId } = req.payload;

    // Verificar propiedad igual que antes
    const owner = await User.findOne({ _id: userId, routines: routineId });
    if (!owner)
      return res.status(403).json({ message: "Sin permiso para borrar esta rutina" });

    // Eliminar la rutina
    const deletedRoutine = await Routine.findByIdAndDelete(routineId);
    if (!deletedRoutine)
      return res.status(404).json({ message: "Routine not found" });

    // Quitar referencia en el usuario
    await User.findByIdAndUpdate(
      userId,
      { $pull: { routines: routineId } },
      { new: true }
    );

    // 204 = No Content (éxito sin body)
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;