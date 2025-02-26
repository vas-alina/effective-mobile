const { Op } = require('sequelize');
const { Lead } = require("../models/models");
//получение обращений
function getLeads({ date, startDate, endDate, sort }) {
    const whereConditions = {};

    if (date) {
        whereConditions.createdAt = {
            [Op.between]: [
                new Date(`${date}T00:00:00`),
                new Date(`${date}T23:59:59`)
            ]
        };
    }

    if (startDate && endDate) {
        whereConditions.createdAt = {
            [Op.between]: [
                new Date(`${startDate}T00:00:00`),
                new Date(`${endDate}T23:59:59`)
            ]
        };
    }

    return Lead.findAll({
        where: whereConditions,
        order: [['createdAt', sort || 'ASC']]
    });
};

//добавление обращения
function addLead(lead) {

    return Lead.create(lead);
};
//отмена
async function cancelLeadById(id, reason) {

    try {
        const lead = await Lead.findByPk(id);

        if (!lead) {
            return { error: true, status: 404, message: 'Обращение не найдено.' };
        }

        lead.status = 'cancel';
        lead.leadResult = reason;

        await lead.save();

        return { error: false, lead };
    } catch (error) {
        console.error('Ошибка при отмене обращения:', error);
        return { error: true, status: 500, message: 'Произошла ошибка при отмене обращения.' };
    }
};
//завершение
async function doneLeadById(id, reason) {

    try {
        const lead = await Lead.findByPk(id);

        if (!lead) {
            return { error: true, status: 404, message: 'Обращение не найдено.' };
        }

        lead.status = 'done';
        lead.leadResult = reason;

        await lead.save();

        return { error: false, lead };
    } catch (error) {
        console.error('Ошибка при обработке обращения:', error);
        return { error: true, status: 500, message: 'Произошла ошибка при обработке обращения.' };
    }
};
//в работе 
async function workOnLeadById(id, result) {

    try {
        const lead = await Lead.findByPk(id);

        if (!lead) {
            return { error: true, status: 404, message: 'Обращение не найдено.' };
        }

        lead.status = 'work';
        lead.leadResult = result;

        await lead.save();

        return { error: false, lead };
    } catch (error) {
        console.error('Ошибка при обработке обращения:', error);
        return { error: true, status: 500, message: 'Произошла ошибка при обработке обращения.' };
    }
};
//отменить все в работе
async function cancelWorkLeads(reason) {
    try {
        const leads = await Lead.findAll({ where: { status: 'work' } });

        if (leads.length === 0) {
            return { error: true, status: 404, message: 'Нет обращений в работе.' };
        }

        for (const lead of leads) {
            lead.status = 'cancel';
            lead.leadResult = reason;
            await lead.save();
        }

        return { error: false, leads };
    } catch (error) {
        console.error('Ошибка при отмене обращений:', error);
        return { error: true, status: 500, message: 'Произошла ошибка при отмене обращений.' };
    }
};


module.exports = {
    addLead,
    getLeads,
    cancelLeadById, 
    doneLeadById,
    workOnLeadById,
    cancelWorkLeads
}