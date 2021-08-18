import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DataResolvable, SqliteQueryOptions } from 'dbdts.db';
export declare interface APIDatabaseOptions {
    axiosOptions?: AxiosRequestConfig;
    url: string;
    password?: string;
    tableName?: string;
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
    get(options: SqliteQueryOptions): Promise<any>;
    all(options?: SqliteQueryOptions): Promise<any>;
    delete(options: SqliteQueryOptions): Promise<any>;
}
