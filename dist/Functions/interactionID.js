"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    const interaction = d.data.interaction;
    if (!interaction)
        return '';
    if (interaction.isCommand())
        return interaction.commandId;
    return interaction.customId;
}
exports.default = Main;
//# sourceMappingURL=interactionID.js.map