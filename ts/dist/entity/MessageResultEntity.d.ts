import { NovastageEntityBase } from '../NovastageEntityBase';
import type { NovastageSDK } from '../NovastageSDK';
import type { Control } from '../types';
import type { MessageResult, MessageResultCreateData } from '../NovastageTypes';
declare class MessageResultEntity extends NovastageEntityBase<MessageResult> {
    constructor(client: NovastageSDK, entopts: any);
    make(this: MessageResultEntity): MessageResultEntity;
    create(this: any, reqdata?: MessageResultCreateData, ctrl?: Control): Promise<MessageResultEntity>;
}
export { MessageResultEntity };
