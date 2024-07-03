const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

//GET /items - Get all items
router.get('/', (req, res) => {
    return res.json(items);
});

//POST /items - Add a new item
router.post('/', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    return res.status(201).json({ added: newItem});
});

//GET /items/:name - Get a single item
router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item) {
        return res.json(item);
    }
    return res.status(404).json({ error: "Item not found"});
});

//PATCH / items/:name - Update a single item
router.patch('/name:', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        return res.json({ updated: item});
    }
    return res.status(404).json({ error: "Item not found"});
});

//DELETE /items/:name - Delete a single item
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        return res.json({ message: "Deleted" });
    }
    return res.status(404).json({ error: "Item not found"});
});

module.exports = router;