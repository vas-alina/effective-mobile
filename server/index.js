require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const controller = require("./controllers/controller")
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json())
//получить все
app.get('/leads', controller.getLeads);

//добавление
app.post('/lead', controller.addLead);

//отмена 
app.patch('/leads/:id/cancel', controller.cancelLeadById);

//завершение
app.patch('/leads/:id/done', controller.doneLeadById);

//Обращение в работе
app.patch('/leads/:id/work', controller.workOnLeadById);

//отменить все лиды в работе
app.patch('/leads/cancel-work', controller.cancelWorkLeads)


const start = async () => {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log('Connection to PostgreSQL has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();
