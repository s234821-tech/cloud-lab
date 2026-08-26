import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // Câu 47: Gọi GET API lấy danh sách sinh viên từ Backend
  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi tải danh sách sinh viên:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 49: Gửi POST API tạo sinh viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents(); // Cập nhật lại danh sách sau khi thêm mới
    } catch (err) {
      console.error('Lỗi thêm sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản Lý Sinh Viên</h2>
      
      {/* Câu 48: Form nhập thông tin */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        <input 
          placeholder="MSSV" 
          value={formData.studentId} 
          onChange={e => setFormData({...formData, studentId: e.target.value})}
          required 
        />
        <input 
          placeholder="Họ tên" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          required 
        />
        <input 
          placeholder="Email" 
          type="email"
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})}
          required 
        />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Câu 47: Hiển thị danh sách */}
      <h3>Danh sách sinh viên:</h3>
      <ul>
        {students.map(s => (
          <li key={s._id}>{s.studentId} - {s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;