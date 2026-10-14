import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
            name: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            account_setting: {};
            member: {};
            message_result: {};
            project: {};
        };
    };
    entity: {
        account_setting: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        member: {
            fields: ({
                name: string;
                title: string;
                type: string;
                short?: undefined;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                short?: undefined;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        message_result: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        project: {
            fields: ({
                name: string;
                title: string;
                type: string;
                format: string;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                format?: undefined;
                req?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format: string;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                format?: undefined;
                short?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            })[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
