describe("Seed emails", () => {
    before(() => {
        cy.seedEmails();
    });

    describe("Sendria Get All Messages", () => {
        it("Should get all emails", () => {
            cy.sendriaGetAllMessages().then((messages) => {
                expect(messages.data.length).to.equal(3);
            });
        });
    });

    describe("Sendria get message matching receipient email address and subject", () => {
        const testData = [
            {"emailAddress": "foo@example.com", "subject": "Test Email"},
            {"emailAddress": "joe@example.com", "subject": "Test Email"},
            {"emailAddress": "foo@example.com", "subject": "Another test email"}
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
});