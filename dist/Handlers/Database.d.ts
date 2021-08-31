import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DataResolvable, SqliteQueryOptions, Database as db, Table } from 'dbdts.db';
export declare interface APIDatabaseOptions {
    axiosOptions?: AxiosRequestConfig;
    url: string;
    password?: string;
    tableName?: string;
}
export declare interface Database {
    set<K extends string, V>(key: K, value: V, cb: (error?: Error) => {}): this;
    get<K extends string>(key: K, cb: (error?: Error, data?: any) => {}): this;
    all(cb: (error?: Error, data?: any[]) => {}): this;
    delete<K extends string>(key: K, cb: (error?: Error) => {}): any;
}
export declare class SQLiteDatabase {
    database: db | RemoteDatabaseInteractor;
    table: Table | RemoteDatabaseInteractor;
    _isMethodsArePromise: boolean;
    _useTableName: string;
    constructor(database: db | RemoteDatabaseInteractor);
    _handlePromise(promise: Promise<any>, cb: (error?: Error, data?: any) => {}): void;
    set<K extends string, V>(key: K, value: V, cb: (error?: Error) => {}): this;
    get<K extends string>(key: K, cb: (error?: Error, data?: DataResolvable) => {}): this;
    delete<K extends string>(key: K, cb: (error?: Error) => {}): this;
    all(cb: (error?: Error, data?: DataResolvable[]) => {}): this;
}
export declare class RemoteDatabaseInteractor {
    axios: AxiosInstance;
    origin: string;
    authorize_key: string;
    table_name: string;
    _databaseReadyTimestamp: number;
    constructor(options?: APIDatabaseOptions);
    _validate(): Promise<boolean>;
    get readyTimestamp(): number;
    get readyAt(): Date;
    set(data: DataResolvable, options: SqliteQueryOptions): Promise<AxiosResponse<any>>;
    get(options: SqliteQueryOptions): Promise<DataResolvable>;
    all(options?: SqliteQueryOptions): Promise<DataResolvable[]>;
    delete(options: SqliteQueryOptions): Promise<any>;
}
