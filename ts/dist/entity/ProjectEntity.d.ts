import { NovastageEntityBase } from '../NovastageEntityBase';
import type { NovastageSDK } from '../NovastageSDK';
import type { Control } from '../types';
import type { Project, ProjectListMatch, ProjectCreateData } from '../NovastageTypes';
declare class ProjectEntity extends NovastageEntityBase<Project> {
    constructor(client: NovastageSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
    list(this: any, reqmatch?: ProjectListMatch, ctrl?: Control): Promise<ProjectEntity[]>;
    create(this: any, reqdata?: ProjectCreateData, ctrl?: Control): Promise<ProjectEntity>;
}
export { ProjectEntity };
