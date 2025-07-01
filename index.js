const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Khởi tạo Supabase client với khóa dịch vụ (chỉ dùng trên server)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

app.use(cors());
app.use(express.json());

// Serve file tĩnh từ thư mục public
app.use(express.static('public'));

// Route trang chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint để cung cấp SUPABASE_ANON_KEY cho client
app.get('/get-supabase-key', (req, res) => {
  res.send(process.env.SUPABASE_ANON_KEY);
});

// Đăng ký tài khoản
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ message: 'Đăng ký thành công', data });
});

// Đăng nhập
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ message: 'Đăng nhập thành công', data });
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy: http://localhost:${PORT}`);
});