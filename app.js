require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());

//routes
app.use('/api/tasks', taskRoutes);
app.use('/', viewRoutes);
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');

    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server çalışıyor: http://localhost:${process.env.PORT}`);

    });
}).catch((err) => {
    console.error('❌ MongoDB bağlantı hatası:', err);
});