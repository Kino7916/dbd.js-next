declare class IsolatedEnvironment {
    readonly parent?: IsolatedEnvironment;
    variables: any;
    constructor(parent?: IsolatedEnvironment);
    extend(): IsolatedEnvironment;
    lookup(name: string): IsolatedEnvironment;
    get(name: string): any;
    set(name: string, value: string): string;
    def(name: string, value: any): any;
}
declare function evaluate(exp: any, env: IsolatedEnvironment): any;
declare class Environment extends IsolatedEnvironment {
    readonly parent?: IsolatedEnvironment;
    constructor(parent?: IsolatedEnvironment);
}
export { IsolatedEnvironment, Environment, evaluate };
