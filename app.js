const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();

let contacts = [
    {
        id: v4(),
        name: 'Test',
        value: 'value',
        marked: false
    }
];

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(contacts);
    }, 500)
});

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false};
    contacts.push(contact);
    res.status(201).json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
    contacts = contacts.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Контакт был удален'})
});

app.put('/api/contacts/:id', (req, res) => {
    const idx = contacts.findIndex(c => c.id === req.params.id);
    contacts[idx] = req.body;
    res.status(200).json(contacts[idx])
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/index.html'));
})

app.listen(3000, () => {
    console.log(`Server has been started on port 3000...`);
})