# Flow.ai Node.js Messaging Opt-in Example

This project showcases an example how to opt-in customers for receiving a message based on a phone number (MSISDN). This can be used for example to allow customers with desktop computers to continue a conversation on their mobile phone.

![alt text](assets/example-form.png "Example form")

## How it works

This example runs a simple webserver that hosts a form. A user can submit a valid phone number to trigger an event. 

The Flow.ai [REST API](https://flow.ai/docs/api-docs/#rest-api) is then used to trigger an event for this specific MSISDN.

## Pre-requirements

- You'll need a working [Flow.ai account](https://flow.ai)
- You'll need a pro or enterprise plan
- Your project requires to have a working WhatsApp, MessageMedia, Twilio or RCS messaging channel

## Getting started

### Configure Flow.ai

- Login to [Flow.ai](https://app.flow.ai) and choose the project you'd like to connect
- Go to the [organisation settings](https://app.flow.ai/default/settings/organisation/tokens) and add a new API key if you do not have one
- Next return to the project and the [integrations](https://app.flow.ai/default/integrations) overview
- Add a REST API integration and configure the REST API

### Configure and run

#### 1. Install [Node.js](https://nodejs.org)

#### 2. Clone this repo and install packages

Open a terminal window and clone this repo inside a local folder

```bash
git clone https://github.com/flow-ai/flowai-messaging-optin-example.git
cd flowai-messaging-optin-example
yarn
```

#### 3. Add a `.env` configuration file

Create a file named `.env` inside the folder you cloned the project and add the following content:

```bash
API_TOKEN="Copy and paste the token from the REST API configuration"
CHANNEL_NAME="This depends on the integration (see table below)"
CHANNEL_EXTERNAL_ID="This depends on the integration (see table below)"
EVENT_NAME="Choose an event name to trigger"
```

> You can find the above CHANNEL_NAME and CHANNEL_EXTERNAL_ID values inside the [reference table](#configuration-table) below

#### 4. Add configuration data

##### API_TOKEN

You can copy the token from the REST API configuration settings within the Flow.ai Dashboard. Paste the token inside the `.env` file you just created.

##### API_CHANNEL_ID

Within the Flow.ai dashboard, open the messaging channel you'd like to use to send a message. Copy and paste the URL and copy the last part of the URL inside the `.env` file.

For example, if this is the URL you'll need the last part: https://app.flow.ai/92b39e60-709c-46b6-bc1d-c5a13e89e5a9/channels/ **d3abcea7-g49f-4689-c1dc-1581c95adfd4**

##### EVENT_NAME

This can be any event you configured within Flow. Simply add the name of the event you'd like to trigger

#### 3. Running locally

Open the terminal and run `yarn start`

The server will run on http://localhost:8080

### 4. Deploy online

You can run this example in different ways, but one of the easiest is Heroku. Make sure you have all the necessary information including token and channelId when you install it.

**Deploy to heroku**

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Configuration table

You can broadcast messages to a channel that supports phone numbers. For the configuration you need to use the following reference table to copy and paste the values for `CHANNEL_NAME` and `CHANNEL_EXTERNAL_ID`.

| Channel | CHANNEL_NAME | CHANNEL_EXTERNAL_ID (copy value from field) |
|------------|--------------|--------------------------|
| Google RBM | `rbm` | Project ID |
| MessageMedia | `messagemedia` | Phone Number |
| Telekom RBM | `telekom` | Telekom bot ID |
| Twilio | `twilio` | Phone Number |
| WhatsApp | `whatsapp` | Production phone number  |
