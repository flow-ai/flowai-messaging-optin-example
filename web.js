// Load packages
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const request = require("request-promise")

// Running locally, load .env configuration
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Load configuration items
const apiEndpoint = process.env.API_ENDPOINT || 'https://api.flow.ai/rest/v1'
const apiToken = process.env.API_TOKEN || 'YOUR FLOW.AI REST API TOKEN'
const channelName = process.env.CHANNEL_NAME || 'THE FLOW.AI BROADCAST CHANNEL NAME'
const channelExternalId = process.env.CHANNEL_EXTERNAL_ID || 'THE FLOW.AI BROADCAST CHANNEL EXTERNAL ID'
const eventName = process.env.EVENT_NAME || 'YOUR FLOW.AI EVENT NAME'

/**
 * Called when a form is submitted with MSISDN
 */
const handleFormPostback = (req, res) => {
  console.info('----> Received message', JSON.stringify(req.body))

  // Send a message
  sendMessage(req.body.msisdn)
  
  res.redirect('/done.html')
}

/**
 * Called when the Flow.ai REST API sends a message
 */
const handleAPIPostback = (req, res) => {
  console.info('----> Received call from the Flow API', JSON.stringify(req.body))
  res.sendStatus(200)
}

/**
 * Send a message to a specific MSISDN
 * @param {String} msisdn 
 */
const sendMessage = async msisdn => {
  try {
    if(!msisdn) {
      return
    }
    const parsedMsisdn = msisdn.trim().replace(' ','')
    const opts = {
      method: 'POST',
      uri: `${apiEndpoint}/broadcast/instant`,
      body: {
        audience: [{
          name: 'Anonymous',
          phoneNumber: parsedMsisdn,
          timezone: '1',
          lang: 'nl',
          profile: {
          }
        }],
        channel: {
          channelName,
          externalId: channelExternalId
        },
        payload: {
          type: 'event',
          eventName: eventName,
          params: {
            destination: [{
              value: 'Paris'
            }]
          }
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken
      },
      json: true
    }

    console.info('Calling Flow.ai REST API', opts)
    await request(opts)
 
  } catch(err) {
    console.error('Error while calling the Flow API', err)
    throw err
  }
}

// Web server configuration
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.get('/healthz', (req, res) => {
  res.sendStatus(200)
})
app.post('/message', handleFormPostback)
app.post('/rest', handleAPIPostback)
app.listen(port);
console.info('Started service on port', port)
