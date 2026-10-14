import { AccountSettingEntity } from './entity/AccountSettingEntity';
import { MemberEntity } from './entity/MemberEntity';
import { MessageResultEntity } from './entity/MessageResultEntity';
import { ProjectEntity } from './entity/ProjectEntity';
export type * from './NovastageTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NovastageEntityBase } from './NovastageEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class NovastageSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AccountSetting(entopts?: Record<string, any>): AccountSettingEntity;
    Member(entopts?: Record<string, any>): MemberEntity;
    MessageResult(entopts?: Record<string, any>): MessageResultEntity;
    Project(entopts?: Record<string, any>): ProjectEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NovastageSDK;
    tester(testopts?: any, sdkopts?: any): NovastageSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NovastageSDK;
export { stdutil, config, BaseFeature, NovastageEntityBase, NovastageSDK, SDK, };
export type { DirectResult };
