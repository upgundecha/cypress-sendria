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
                    expect(data.emailAddress).to.equal(message.recipients_message_to[0]);
                    expect(data.subject).to.equal(message.subject);
                });
            });
        });
    });

    describe("Sendria visit message", () => {
        it("Should visit a message", () => {
            cy.sendriaGetMessageByEmailAddressAndSubject('bar@example.com', 'Confirmation email').then((message) => {
                console.log(message);
                cy.sendriaVisitMessageById(message.id);
                cy.get("p").should("have.text", "This is a confirmation email.");
                cy.get("a").should("exist").and("have.text", "Click here");
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