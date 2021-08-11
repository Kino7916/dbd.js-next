function Main(d) {
    if (d.data.interaction) {
        return Date.now() - d.data.interaction.createdTimestamp;
    }
    else if (d.data.message) {
        return Date.now() - d.data.message.createdTimestamp;
    }
    else
        return '';
}
export default Main;
//# sourceMappingURL=botPing.js.map