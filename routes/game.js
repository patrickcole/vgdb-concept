const express = require('express');
const router = express.Router();
const model = require('../models/game');

/**
 * Path: /api/game
 * Description: The main games path for retrieving all games
 * or creating a new game entry via POST
**/
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

/**
 * Path: /api/game/:slug
 * Description: Middleware to check for an existing entry
 * via a query and provide subsequent feedback for errors or
 * non-existent entries. If entry is found, next() function
 * is invoked and execution moves on in the router.
 */
router
    .use('/:slug', (req, res, next) => {

        let query = model.where({ slug: req.params.slug });
        query.findOne( (err, game) => {

            if ( err ){

                res.status(500).send(err);
            } else if ( !game ) {

                res.status(404).send({ message: "Game not found." });
            } else {

                /**
                 * Note: A game entry, when requested via GET, will have multiple
                 * linked documents such as systems that also need to be populated.
                 * This is to ensure that all relavent data has been linked to an entry.
                 * 
                 * For this reason, on a GET method request the query needs to populate
                 * additional information for systems before sending the game entry to the 
                 * next method.
                **/

                if ( req.method == "GET" ){

                    // Obtain systems information in addition to game data for final output:
                    query
                        .populate('systems')
                        .exec( ( err, gameFullEntry ) => {

                            console.log( gameFullEntry );

                            if ( err ){

                                res.status(500).send(err);
                            } else {

                                req.game = gameFullEntry;
                                next();
                            }
                        });
                } else {

                    // Only send over game entry for PUT, DELETE commands:
                    req.game = game;
                    next();
                }
            }
        })
    });

/**
 * Path: /api/game/:slug
 * Description: Handles all aspects of an existing game entry.
 * This includes getting an individual game via its slug entry
 * as well as updating and deleting of a game entry.
 * Note: These methods assume that a valid game entry is being
 * passed along in the request object.
 */
router
    .route('/:slug')
        .get( (req,res) => {

            res.json(req.game);
        })
        .put( (req,res) => {
            
            req.game.slug = req.game.slug;
            req.game.title = req.body.title;
            req.game.save();
            res.json(req.game);
        })
        .delete( (req,res) => {

            req.game.remove( err => {
                
                if( err ){
                    
                    res.status(500).send(err)
                } else {
                    
                    res.status(200).send({ message: 'Game was removed.'});
                }
            });
        });

module.exports = router;