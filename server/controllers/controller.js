const service = require('../services/service');

// получение всех обращений
async function getLeads(req, res) {

    try {
        const { date, startDate, endDate, sort } = req.query;

        const data = await service.getLeads({ date, startDate, endDate, sort });

        if (data.length === 0) {
            return res.status(200).json({ message: 'Обращений пока нет.' });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error('Ошибка при получении списка обращений:', error);
        res.status(500).json({ message: 'Произошла ошибка при получении обращений' });
    }
}
//добавление
async function addLead(req, res) {

    try {
        const { title, text } = req.body;
        const newLead = await service.addLead({ title, text });

        res.status(201).send({ data: newLead });
    } catch (error) {
        console.error('Error adding lead:', error);
        res.status(500).send({ error: 'Произошла ошибка при добавлении обращения' });
    }
};
//отмена
async function cancelLeadById(req, res) {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ message: 'Необходимо указать причину отмены.' });
    }

    try {
        const result = await service.cancelLeadById(id, reason);

        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }
        res.status(200).json({ message: 'Обращение отменено успешно', lead: result.lead });
    } catch (error) {
        console.error('Ошибка при отмене обращения:', error);
        res.status(500).json({ message: 'Произошла ошибка при отмене обращения.' });
    }
}
//завершение
async function doneLeadById(req, res) {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ message: 'Введите результат работы с обращением.' });
    }

    try {
        const result = await service.doneLeadById(id, reason);
        
        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }

        res.status(200).json({ message: 'Обращение успешно завершено', lead: result.lead });
    } catch (error) {
        console.error('Ошибка при обработке обращения:', error);
        res.status(500).json({ message: 'Произошла ошибка при обработке обращения.' });
    }
};
//в работе
async function workOnLeadById(req, res) {
    const { id } = req.params;
    const { result } = req.body;

    if (!result) {
        return res.status(400).json({ message: 'Необходимо указать результат обращения.' });
    }

    try {
        const resultService = await service.workOnLeadById(id, result);
        
        if (resultService.error) {
            return res.status(resultService.status).json({ message: resultService.message });
        }

        res.status(200).json({ message: 'Успешный ответ', lead: resultService.lead });
    } catch (error) {
        console.error('Ошибка при обработке обращения:', error);
        res.status(500).json({ message: 'Произошла ошибка при обработке обращения.' });
    }
};
//отменить все в работе 
async function cancelWorkLeads(req, res) {
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ message: 'Необходимо указать причину отмены' });
    }

    try {
        const resultService = await service.cancelWorkLeads(reason);

        if (resultService.error) {
            return res.status(resultService.status).json({ message: resultService.message });
        }

        res.status(200).json({ message: 'Все обращения в статусе "В работе" успешно отменены', leads: resultService.leads });
    } catch (error) {
        console.error('Ошибка при отмене обращений:', error);
        res.status(500).json({ message: 'Произошла ошибка при отмене обращений.' });
    }
};

module.exports = {
    getLeads,
    addLead,
    cancelLeadById,
    doneLeadById,
    workOnLeadById,
    cancelWorkLeads
};