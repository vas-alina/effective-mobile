require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const controller = require("./controllers/controller")
const NodeCache = require('node-cache');
const PORT = process.env.PORT || 5000;
const app = express();

const MEMORY_LIMIT_MB = 500;

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json())
//получить все
app.get('/leads', async (req, res, next) => {
    const cachedLeads = cache.get('allLeads');
    if (cachedLeads) {
        console.log('Serving from cache');
        return res.json(cachedLeads);
    }
    try {
        const result = await controller.getLeads(req, res);
        cache.set('allLeads', result);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

const clearCache = () => cache.del('allLeads');

//добавление
app.post('/lead', async (req, res, next) => {
    clearCache();
    try {
        await controller.addLead(req, res);
    } catch (error) {
        next(error);
    }
});

//отмена 
app.patch('/leads/:id/cancel', async (req, res, next) => {
    clearCache();
    try {
        await controller.cancelLeadById(req, res);
    } catch (error) {
        next(error);
    }
});

//завершение
app.patch('/leads/:id/done', async (req, res, next) => {
    clearCache();
    try {
        await controller.doneLeadById(req, res);
    } catch (error) {
        next(error);
    }
});

//Обращение в работе
app.patch('/leads/:id/work', async (req, res, next) => {
    clearCache();
    try {
        await controller.workOnLeadById(req, res);
    } catch (error) {
        next(error);
    }
});

//отменить все лиды в работе
app.patch('/leads/cancel-work', async (req, res, next) => {
    clearCache();
    try {
        await controller.cancelWorkLeads(req, res);
    } catch (error) {
        next(error);
    }
});

const checkMemoryUsage = () => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory Usage: ${Math.round(used * 100) / 100} MB`);

    if (used > MEMORY_LIMIT_MB) {
        console.error('Memory limit exceeded. Shutting down to prevent leaks.');
        process.exit(1);
    }
};

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');

        await sequelize.sync();
        const server = app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        process.on('SIGINT', async () => {
            console.log('Shutting down gracefully...');

            try {
                await sequelize.close();
                console.log('Database connection closed.');

                server.close(() => {
                    console.log('Server closed.');
                    process.exit(0);
                });

            } catch (error) {
                console.error('Error during shutdown:', error);
                process.exit(1);
            }
        });

        if (global.gc) {
            setInterval(() => {
                global.gc();
                console.log('Garbage collection triggered');
            }, 60000); 
        } else {
            console.warn('Garbage collection is not exposed. Start the app with: node --expose-gc');
        }

        setInterval(checkMemoryUsage, 30000);

    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

start();

