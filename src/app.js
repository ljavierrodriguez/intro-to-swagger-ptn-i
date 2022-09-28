const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const PORT = process.env.PORT || 9000

const swaggerDocument = require('./docs/swagger.json');
//const spec = require('./docs/spec');

const contacts = [
    {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        phone: '+1 5555 55 55'
    },
    {
        id: 2,
        name: 'Jane',
        lastname: 'Doe',
        phone: '+1 5555 55 11'
    }
];

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }))

app.get('/api/contacts', (req, res) => {
    return res.json(contacts)
})


app.get('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    let contact = contacts.find((contact) => contact.id === parseInt(id))
    if (contact) return res.status(200).json(contact)
    return res.status(404).json({})
})

app.post('/api/contacts/store', (req, res) => {
    const { name, lastname, phone } = req.body;
    const contact = {
        id: contacts[contacts.length - 1].id + 1, 
        name, 
        lastname, 
        phone
    }
    contacts.push(contact)
    return res.status(201).json(contact)
})

app.listen(PORT, () => console.log('Server running on PORT 9000'));