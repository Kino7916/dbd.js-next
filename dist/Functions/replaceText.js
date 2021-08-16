"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [text = "", sample = "", New = "", _howMany = '-1'] = d.unpack(d.unpacked).splits;
    const howMany = Number(_howMany);
    if (!text)
        return d.error("Field 1 is required!");
    if (isNaN(howMany))
        return d.error("Field 1 must be an expression of numeric!");
    if (howMany < 0)
        return text.replaceAll(sample, New);
    if (howMany === 0)
        return text;
    if (howMany > 0) {
        const split = text.split(sample);
        const _spliced = split.splice(howMany);
        if (!_spliced.length)
            return split.join(sample);
        const _1 = _spliced.join(New);
        const _2 = split.join(sample);
        return _1 + _2;
    }
}
exports.default = Main;
//# sourceMappingURL=replaceText.js.map