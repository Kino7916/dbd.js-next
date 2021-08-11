function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    if (!d.data.message)
        return d.error('Unexpected object Message of \'null\'!');
    const message = d.data.message;
    const emojis = d.unpack(d.unpacked).splits;
    for (const emoji of emojis)
        message.react(emoji);
    return '';
}
export default Main;
//# sourceMappingURL=addCmdReactions.js.map