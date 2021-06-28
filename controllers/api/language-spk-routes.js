const router = require('express').Router();
const LangSpk = require('../../models');

// Get all Languages Spoken /api/langspk
router.get('/', (req, res) => {
    LangSpk.findAll({})
    .then(langSpkDbData => res.json(langSpkDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get Single Language Spoken /api/langspk/:id
router.get('/:id', (req, res) => {
    LangSpk.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(langSpkDbData => res.json(langSpkDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create New Spoken Language /api/langspk
router.post('/', (req, res) => {
    LangSpk.create({
        lang_name: req.body.lang_name
    })
    .then(langSpkDbData => res.json(langSpkDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Update Language Spoken /api/langspk/:id
// Delete Language Spoken /api/langspk/:id

module.exports = router;