const express = require('express');
const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'vgdb';
const port = 3000;

const app = express();
const GameModel = require('./models/game');
const SystemModel = require('./models/system');

const router = express.Router();
router.get('/', (req,res) => {
    res.json({ message: 'Welcome to the Internet Video Game Database' });
});

mongoose.connect(`mongodb://${server}/${database}`)
    .then( () => {
        console.log('MongoDB Connection Successful');
    })
    .catch( (err) => {
        console.error('MongoDB Connection Error: ' + err);
    });

app.use('/api', router);

const SystemRoute = require('./routes/system');
app.use('/api/system', SystemRoute);

app.listen(port);


/*
SystemModel.remove()
    .then( res => {
        console.log('removed all systems')
    })
    .catch( err => {
        console.error('error in removing systems');
    })
*/
/*
GameModel
    .findOneAndRemove(
        {
            slug: 'mortal-kombat'
        }
    )
    .then( response => {

        console.log( response )
    })
    .catch( err => {

        console.error( err );
    });
*/

/* Get Games Example
GameModel.find({}, (err, games) => {

    console.log( games );
})
*/

/*
SystemModel.find({}, (err, systems) => {

    console.log( systems );
});
*/

/*
let snesSystem = new SystemModel({
    slug: "snes",
    title: "Super Nintendo Entertainment System"
});

let genesisSystem = new SystemModel({
    slug: "genesis",
    title: "SEGA Genesis"
});

snesSystem.save()
    .then( (doc) => {
        console.log('snes system saved');
    })
    .catch( (err) => {
        console.error('error with snes save');
    });

genesisSystem.save()
    .then( (doc) => {
        console.log('gen system saved');
    })
    .catch( (err) => {
        console.error('error with gen save');
    });
*/

/*
SystemModel.find({}, (err, systems) => {
    console.log( systems );
})
*/

/*
let sampleGame = new GameModel({
    slug: "mortal-kombat",
    title: "Mortal Kombat",
    systems: []
});

sampleGame.systems.push(mongoose.Types.ObjectId('5a91eb9d59509c1c44fe7aa3'), mongoose.Types.ObjectId('5a91eb9d59509c1c44fe7aa4'));

sampleGame.save()
    .then( (doc) => {
        console.log('Game saved');
    })
    .then( () => {

        GameModel.find({}, (err, games) => {

            console.log( games )
        });
    })
    .catch( (err) => {
        console.error('Error with saving a Game');
    });
*/

GameModel.findOne({slug: "mortal-kombat"})
.populate('systems')
.exec( (err, game) => {
    
    console.log( game );
});




/*
GameModel
    .findOneAndUpdate(
        { 
            slug: 'mortal-kombat' 
        },
        {
            systems: ['5a91da7cf347d2177dd163e8', '5a91da7cf347d2177dd163e9']
        }
    ).then( doc => {

        console.log( doc )
    }).catch ( err => {

        console.error( err );
    });
*/