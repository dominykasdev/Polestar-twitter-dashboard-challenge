const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = process.env.API_URL;

const options = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
    }
}

router.get('/', (req, res) => {
    res.send('Welcome to the Polestar-challenge twitter api');
});


router.get('/:username', (req, res) => {
    // find user id via username
    fetch(`${url}/by/username/${req.params.username}`, options)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.errors) res.send('{"error":"User not found"}');
            else {
                // if user found, fetch tweets
                fetch(`${url}/${result.data.id}/tweets?exclude=retweets,replies&tweet.fields=created_at&user.fields=name,username,profile_image_url,url`, options)
                    .then(response => response.json())
                    .then(resultTweets => {
                        res.send(resultTweets);
                    })
                    .catch(error => console.log('error', error));
            }
        })
        .catch(error => {
            console.log('error', error);
            res.send(error);
        });
});

module.exports = router;