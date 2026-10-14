
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Novastage',
        slug: "novastage",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://novastage.app",

    auth: {
      prefix: '',
      name: 'Cookie',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        account_setting: {
        },
  
        member: {
        },
  
        message_result: {
        },
  
        project: {
        },
  
    }
  }


  entity = {
    "account_setting": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "profile",
          "title": "Profile",
          "type": "`$OBJECT`",
          "req": true
        }
      ],
      "name": "account_setting",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/dashboard/settings",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "dashboard"
                },
                {
                  "lit": "settings"
                }
              ],
              "parts": [
                "api",
                "dashboard",
                "settings"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "member": {
      "fields": [
        {
          "name": "avatarUrl",
          "title": "Avatar Url",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`"
        },
        {
          "name": "fullName",
          "title": "Full Name",
          "type": "`$STRING`"
        },
        {
          "name": "joinedAt",
          "title": "Joined At",
          "type": "`$STRING`",
          "short": "Human-readable relative time, not an ISO timestamp."
        },
        {
          "name": "role",
          "title": "Role",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "userId",
          "title": "User Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "username",
          "title": "Username",
          "type": "`$STRING`"
        }
      ],
      "name": "member",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/dashboard/projects/members",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "dashboard"
                },
                {
                  "lit": "projects"
                },
                {
                  "lit": "members"
                }
              ],
              "parts": [
                "api",
                "dashboard",
                "projects",
                "members"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.members`"
              },
              "args": {
                "query": [
                  {
                    "name": "project_id",
                    "orig": "projectId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message_result": {
      "fields": [
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "projectId",
          "title": "Project Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "message_result",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/dashboard/projects/delete",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "dashboard"
                },
                {
                  "lit": "projects"
                },
                {
                  "lit": "delete"
                }
              ],
              "parts": [
                "api",
                "dashboard",
                "projects",
                "delete"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "project": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "format": "uuid"
        },
        {
          "name": "inviteCode",
          "title": "Invite Code",
          "type": "`$STRING`"
        },
        {
          "name": "maxMembers",
          "title": "Max Members",
          "type": "`$INTEGER`"
        },
        {
          "name": "memberList",
          "title": "Member List",
          "type": "`$ARRAY`"
        },
        {
          "name": "members",
          "title": "Members",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Trimmed before the 1-80 character validation."
        },
        {
          "name": "pendingRequestsCount",
          "title": "Pending Requests Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "role",
          "title": "Role",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "Human-readable text such as Updated just now, not an ISO timestamp."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "project",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/dashboard/projects",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "dashboard"
                },
                {
                  "lit": "projects"
                }
              ],
              "parts": [
                "api",
                "dashboard",
                "projects"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.project`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/dashboard/projects",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "dashboard"
                },
                {
                  "lit": "projects"
                }
              ],
              "parts": [
                "api",
                "dashboard",
                "projects"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.projects`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

