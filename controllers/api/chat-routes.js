const router = require('express').Router();
const { json } = require('sequelize/types');
const { User, Chat } = require('../../models');


router.get('/:id', (req, res) => {
    Chat.findOne({
        where: {
            id: req.body.id
        },
        include: {
            model: User,
            attributes: ['id']
        }
    }).then(chatData => {
        res.render(chatData);
    }).catch(err => {
        if (err) {
            console.log('no chat found', err);
        }
    })
});

router.post('/', (req, res) => {

});



