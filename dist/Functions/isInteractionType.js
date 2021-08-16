"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    const interaction = d.data.interaction;
    if (!interaction)
        return '';
    if (interaction.isCommand())
        return 'COMMAND';
    if (interaction.isButton())
        return 'BUTTON';
    if (interaction.isSelectMenu())
        return 'SELECT_MENU';
    if (interaction.isMessageComponent())
        return 'MESSAGE_COMPONENT';
}
exports.default = Main;
//# sourceMappingURL=isInteractionType.js.map