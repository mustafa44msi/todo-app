const task = require('../models/taskModel');

// tüm görevleri getir
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// yeni görev oluştur
exports.createTask = async (req, res) => {
    try {
        const newTask = new task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// görev güncelle
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true}
        )
        if (!updatedTask) return res.status(404).json({ message: 'Görev bulunamadı' });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// görev sil
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Görev bulunamadı' });
        res.status(200).json({ message: 'Görev silindi' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

    