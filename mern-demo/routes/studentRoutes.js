const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Câu 36. API GET: Lấy danh sách sinh viên
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Câu 37. API POST: Thêm sinh viên mới
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo sinh viên', error: error.message });
  }
});

// Câu 38. API PUT: Cập nhật sinh viên theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// Câu 39. API DELETE: Xóa sinh viên theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ message: 'Xóa sinh viên thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa sinh viên', error: error.message });
  }
});

module.exports = router;