"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "account_setting",
        "accessor": "AccountSetting",
        "op": "load",
        "method": "GET",
        "path": "/api/dashboard/settings",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "cookie"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "email": "x",
            "profile": {
                "full_name": "x",
                "username": "x",
                "avatar_url": "x",
                "role": "x",
                "plan": "free",
                "created_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "member",
        "accessor": "Member",
        "op": "list",
        "method": "GET",
        "path": "/api/dashboard/projects/members",
        "args": [],
        "select": {
            "project_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "projectId"
        ],
        "queryArgs": [
            {
                "name": "project_id",
                "wire": "projectId"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "cookie"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "members": [
                {
                    "userId": "x",
                    "role": "owner",
                    "fullName": "x",
                    "email": "x",
                    "username": "x",
                    "avatarUrl": "x",
                    "joinedAt": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "message_result",
        "accessor": "MessageResult",
        "op": "create",
        "method": "POST",
        "path": "/api/dashboard/projects/delete",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "cookie"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "project",
        "accessor": "Project",
        "op": "create",
        "method": "POST",
        "path": "/api/dashboard/projects",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "cookie"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "project": {
                "id": "x",
                "slug": "x",
                "name": "x",
                "description": "x",
                "inviteCode": "x",
                "role": "owner",
                "updatedAt": "x",
                "createdAt": "2026-01-01T00:00:00Z",
                "members": 1,
                "maxMembers": 1,
                "memberList": [
                    {
                        "userId": "x",
                        "role": "owner",
                        "fullName": "x",
                        "email": "x",
                        "username": "x",
                        "avatarUrl": "x",
                        "joinedAt": "x"
                    }
                ],
                "pendingRequestsCount": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "project",
        "accessor": "Project",
        "op": "list",
        "method": "GET",
        "path": "/api/dashboard/projects",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "cookie"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "projects": [
                {
                    "id": "x",
                    "slug": "x",
                    "name": "x",
                    "description": "x",
                    "inviteCode": "x",
                    "role": "owner",
                    "updatedAt": "x",
                    "createdAt": "2026-01-01T00:00:00Z",
                    "members": 1,
                    "maxMembers": 1,
                    "memberList": [
                        {
                            "userId": "x",
                            "role": "owner",
                            "fullName": "x",
                            "email": "x",
                            "username": "x",
                            "avatarUrl": "x",
                            "joinedAt": "x"
                        }
                    ],
                    "pendingRequestsCount": 1
                }
            ],
            "userName": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map