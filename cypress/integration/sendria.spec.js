describe("Seed emails", () => {
    before(() => {
        cy.seedEmails();
    });

    describe("Sendria get message matching receipient email address and subject", () => {
        const testData = [
            { "emailAddress": "foo@example.com", "subject": "Test Email" },
            { "emailAddress": "joe@example.com", "subject": "Test Email" },
            { "emailAddress": "foo@example.com", "subject": "Another test email" }
        ]

        testData.forEach((data) => {
            it(`Should get message matching receipient email address ${data.emailAddress} and subject ${data.subject}`, () => {
                cy.sendriaGetMessageByEmailAddressAndSubject(data.emailAddress, data.subject).then((message) => {
                    expect(message.recipients_message_to).to.contain(data.emailAddress);
                    expect(message.subject).to.contain(data.subject);
                });
            });
        });
    });

    describe("Sendria get message html", () => {
        it("Should get message html", () => {
            cy.sendriaGetMessageByEmailAddressAndSubject('bar@example.com', 'Confirmation email').then((message) => {
                cy.sendriaGetMessageHtmlById(message.id).then((html) => {
                    const link = html.match(/(?<=href=")(.*)(?=" target)/g)[0];
                    expect(link).to.equal("http://localhost:1080")
                });
            });
        });
    });

    describe("Sendria delete a message", () => {
        it("Should delete a message", () => {
            cy.sendriaDeleteMessage(1).then(() => {
                cy.sendriaGetAllMessages().then((messages) => {
                    expect(messages.data.length).to.equal(3);
                });
            });
        });
    });

    describe("Sendria get all messages", () => {
        it("Should get all emails", () => {
            cy.sendriaGetAllMessages().then((messages) => {
                expect(messages.data.length).to.equal(3);
            });
        });
    });

});