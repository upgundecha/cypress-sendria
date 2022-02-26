# Cypress Sendria

Cypress Plugin for [Sendria Fake SMTP Server](https://github.com/msztolcman/sendria). Use this plugin for test cases like Account confirmation/verifications emails, one time passwords (OTPs) in email or general email testing.

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

### Usage

> All of theses commands use directly `cy.request()` which return a Cypress Promise like. Check [the doc](https://docs.cypress.io/api/commands/request.html) !

Using one of this commands must be like this example :

```JavaScript
  cy.sendriaGetAllMessages().then((emails) => {
    expect(emails.length).to.equal(4);
  });
```

For more examples you can check directly the [test file](./cypress/integration/sendria.spec.js).

### Documentation

Get all messages received in the Sendria server.

```JavaScript
cy.sendriaGetAllMessages()
```
---

Get all messages and find one by containing a specific receipent email address and subject.

```JavaScript
cy.sendriaGetMessageByEmailAddressAndSubject(address: string, subject: String)
```
---

Delete all message in order to flush your mailbox !

```JavaScript
cy.sendriaDeleteAllMessages()
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- Clone the repo

- Install dependencies: `npm install`

- Run Sendria

Please make sure to update tests as appropriate and run `npm test` command

## License

[Apache- 2.0](https://choosealicense.com/licenses/apache-2.0/)

