# Cypress Sendria

Cypress Plugin for [Sendria Fake SMTP Server](https://github.com/msztolcman/sendria). Use this plugin for tests like Account confirmation & verification emails, one time passwords (OTPs) in email or general email testing.

This plugin uses Sendria API to retrive the messages.

## Installation

```bash
npm install cypress-sendria --save-dev
yarn add cypress-sendria --dev
```

## Usage

### 1. Register the plugin :

```JavaScript
// cypress/support/index.js

require('cypress-sendria');
```

### 2. Specify your Sendria host address

> By default, Sendria API is started at the `http://localhost:1080`. If you are using default Sendria instace, you have nothing to configure.

You can also use env vars in your `cypress.json` as below :

```json
// cypress/cypress.json

{
  "env": {
    "SENDRIA_PROTOCOL": "http",
    "SENDRIA_HOST": "localhost",
    "SENDRIA_SMTP_PORT": "1025",
    "SENDRIA_API_PORT": "1080"
  }
}
```

## Commands

> Cypress-Sendria commands use `cy.request()` which return a Cypress promise. Check Cypress [documentation](https://docs.cypress.io/api/commands/request.html) for requests

You can use the commands as shown below example:

```JavaScript
  cy.sendriaGetAllMessages().then((messages) => {
    expect(messages.length).to.equal(3);
  });
```

For more examples refer the [spec file](./cypress/integration/sendria.spec.js).

### Commands

Get all messages received in the Sendria server.

```JavaScript
cy.sendriaGetAllMessages()
```
---

Get all messages and find one by containing a specific receipent email address and subject.

```JavaScript
cy.sendriaGetMessageByEmailAddressAndSubject(address: string, subject: string)
```
---

Delete all message in order to clear the
Sendria mailbox

```JavaScript
cy.sendriaDeleteAllMessages()
```
---

Access the message html using Id

```JavaScript
cy.sendriaGetMessageHtmlById()
```
---

Delete a message using Id

```JavaScript
cy.sendriaDeleteMessageById()
```
---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- Clone the repo

- Install dependencies: `npm install`

- Run local Sendria instance. Find more [here](https://github.com/upgundecha/cypress-sendria) for installation options

- Sendria API is documented [here](https://github.com/msztolcman/sendria#api)

Please make sure to update tests as appropriate and run `npm test` command

---

> Inspired by the [cypress-maildev](https://github.com/Clebiez/cypress-maildev) plugin

---

## License

[Apache- 2.0](https://choosealicense.com/licenses/apache-2.0/)

