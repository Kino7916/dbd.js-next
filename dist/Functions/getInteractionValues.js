"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    const interaction = d.data.interaction;
    if (!interaction)
        return d.error('Invalid interaction of Interaction!');
    if (interaction.isSelectMenu())
        return interaction.values.join(', ');
    return '';
}
//# sourceMappingURL=getInteractionValues.js.map