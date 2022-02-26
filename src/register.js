const SendriaCommands = require("./sendriaCommands");

const register = (Cypress) => {
    const sendriaCommands = new SendriaCommands();
    SendriaCommands.cypressCommands.forEach((commandName) => {
        Cypress.Commands.add(
            commandName,
            sendriaCommands[commandName].bind(sendriaCommands)
        );
    });
};

module.exports = {
    register,
};