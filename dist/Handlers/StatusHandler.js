var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @param Activities
 * @param This
 */
function StatusHandler(Activities, This) {
    const Arr = Array.from(Activities.values());
    if (!Arr.length || Arr.length < 1)
        return;
    if (Arr.length === 1) {
        const status = Arr[0];
        This.client.user.setStatus(status.status);
        This.client.user.setActivity(status.name, { type: status.type, url: status.url });
        console.warn(`Length of Activities was 1, Recommended Lifetime duration should be more than 30 `);
    }
    let i = 0;
    let Timeout = setTimeout(update, 1000);
    function update() {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(Timeout);
            Timeout = null;
            let status = Arr[i];
            if (!status) {
                status = Arr[0];
                i = 0;
            }
            i++;
            const ActivityDisplay = yield status.compile({
                code: status.name
            }, { returnCode: true });
            This.client.user.setStatus(status.status);
            This.client.user.setActivity(ActivityDisplay, { type: status.type, url: status.url });
            Timeout = setTimeout(update, status.Lifetime * 1000);
        });
    }
}
export default StatusHandler;
//# sourceMappingURL=StatusHandler.js.map