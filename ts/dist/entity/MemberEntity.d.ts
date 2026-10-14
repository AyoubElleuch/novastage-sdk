import { NovastageEntityBase } from '../NovastageEntityBase';
import type { NovastageSDK } from '../NovastageSDK';
import type { Control } from '../types';
import type { Member, MemberListMatch } from '../NovastageTypes';
declare class MemberEntity extends NovastageEntityBase<Member> {
    constructor(client: NovastageSDK, entopts: any);
    make(this: MemberEntity): MemberEntity;
    list(this: any, reqmatch?: MemberListMatch, ctrl?: Control): Promise<MemberEntity[]>;
}
export { MemberEntity };
