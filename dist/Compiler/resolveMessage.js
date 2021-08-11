function resolveMessage(channel, options = {}) {
    if (typeof channel.send !== "function")
        return new TypeError();
    return channel.send(Object.assign({}, options)).catch(err => console.log(err));
}
export default resolveMessage;
//# sourceMappingURL=resolveMessage.js.map