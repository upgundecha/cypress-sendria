/* global Cypress */

const Request = require("./request");

class SendriaCommands {
    static get cypressCommands() {
        return [
            "sendriaGetAllMessages",
            "sendriaDeleteAllMessages",
            "sendriaGetMessageByEmailAddress",
            "sendriaGetMessageBySubject",
            "sendriaGetMessageByEmailAddressAndSubject",
            "sendriaVisitMessageById",
            "sendriaDeleteMessage"
        ];
    }

    constructor() {
        this.baseUrl = `${Cypress.env("SENDRIA_PROTOCOL")}://${Cypress.env(
            "SENDRIA_HOST"
        )}`;

        if (Cypress.env("SENDRIA_API_PORT")) {
            this.baseUrl += `:${Cypress.env("SENDRIA_API_PORT")}`;
        }

        this.request = new Request({
            baseUrl: this.baseUrl,
        });
    }

    sendriaGetAllMessages() {
        return this.request.get("/api/messages/");
    }

    sendriaDeleteAllMessages() {
        return this.request.delete("/api/messages/");
    }

    sendriaGetMessageByEmailAddress(address) {
        return this.sendriaGetAllMessages().then((messages) => {
            return messages.data.reverse().find((message) => message.recipients_message_to[0] === address) || null;
        });
    }
    sendriaGetMessageBySubject(subject) {
        return this.sendriaGetAllMessages().then((messages) => {
            return messages.data.reverse().find((message) => message.subject === subject) || null;
        });
    }

    sendriaGetMessageByEmailAddressAndSubject(address, subject) {
        return this.sendriaGetAllMessages().then((messages) => {
            return messages.data.reverse().find((message) => message.recipients_message_to[0] === address && message.subject === subject) || null;
        });
    }

    sendriaVisitMessageById(id) {
        cy.visit(`${this.baseUrl}/api/messages/${id}.html`);
    }

    sendriaDeleteMessage(id) {
        return this.request.delete(`/api/messages/${id}`);
    }
}

module.exports = SendriaCommands;
