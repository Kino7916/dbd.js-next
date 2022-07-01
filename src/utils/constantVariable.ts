export default function (o: Object, p: string, v: any) {
    Object.defineProperty(o, p, {
        set: null,
        get: () => {
            return o[p]
        },
        value: v,
        writable: false,
        enumerable: true
    })
}