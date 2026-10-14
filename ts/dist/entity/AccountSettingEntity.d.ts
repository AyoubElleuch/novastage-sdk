import { NovastageEntityBase } from '../NovastageEntityBase';
import type { NovastageSDK } from '../NovastageSDK';
import type { Control } from '../types';
import type { AccountSetting, AccountSettingLoadMatch } from '../NovastageTypes';
declare class AccountSettingEntity extends NovastageEntityBase<AccountSetting> {
    constructor(client: NovastageSDK, entopts: any);
    make(this: AccountSettingEntity): AccountSettingEntity;
    load(this: any, reqmatch?: AccountSettingLoadMatch, ctrl?: Control): Promise<AccountSettingEntity>;
}
export { AccountSettingEntity };
