const express = require('express');
const router = express.Router();
const model = require('../models/game');

const GAME_NOT_FOUND = { message: "Game not found." };

// /api/game
router
    .route('/')
    .get((req,res) => {
        model.find({}, (err, games) => {
            res.json(games);
        })
    })
    .post((req,res) => {

        let game = new model(req.body);
        game.save();
        res.status(201).send(game);
    });

// /api/game/:slug
router
    .use('/:slug', (req, res, next) => {
        model.findOne({slug: req.params.slug})
        .populate('systems')
        .exec( (err,game) => {
            if(err){
                res.status(500).send(err);
            } else {
                req.game = game;
                next();
            }
        });
    });

router
    .route('/:slug')
        .get( (req,res) => {
            if ( req.game ){
                res.json(req.game);
            } else {
                res.status(404).send(GAME_NOT_FOUND);
            }
        })
        .put( (req,res) => {
          if(req.game){
            req.game.title = req.body.title;
            req.game.save();
            res.json(req.game);
          } else {
            res.status(404).send(GAME_NOT_FOUND);
          }
        });

module.exports = router;