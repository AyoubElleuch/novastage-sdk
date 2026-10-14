"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ProjectEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NOVASTAGE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NOVASTAGE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NovastageSDK.test();
        const ent = testsdk.Project();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('project hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.NovastageSDK.test(offline).Project().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.NovastageSDK.test(offline).Project()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.NovastageSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Project().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.NovastageSDK.test().Project().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.NovastageSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Project().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Project().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.NovastageSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Project().list({ "createdAt": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NOVASTAGE_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 2 }, "inviteCode": { "a": true, "h": "Invite Code", "n": "inviteCode", "r": false, "t": "`$STRING`", "key$": "inviteCode", "index$": 3 }, "maxMembers": { "a": true, "h": "Max Members", "n": "maxMembers", "r": false, "t": "`$INTEGER`", "key$": "maxMembers", "index$": 4 }, "memberList": { "a": true, "h": "Member List", "n": "memberList", "r": false, "t": "`$ARRAY`", "key$": "memberList", "index$": 5 }, "members": { "a": true, "h": "Members", "n": "members", "r": true, "t": "`$INTEGER`", "key$": "members", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Trimmed before the 1-80 character validation.", "t": "`$STRING`", "key$": "name", "index$": 7 }, "pendingRequestsCount": { "a": true, "h": "Pending Requests Count", "n": "pendingRequestsCount", "r": false, "t": "`$INTEGER`", "key$": "pendingRequestsCount", "index$": 8 }, "role": { "a": true, "h": "Role", "n": "role", "r": false, "t": "`$STRING`", "key$": "role", "index$": 9 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 10 }, "updatedAt": { "a": true, "h": "Updated At", "n": "updatedAt", "r": true, "sh": "Human-readable text such as Updated just now, not an ISO timestamp.", "t": "`$STRING`", "key$": "updatedAt", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "project", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "name"], "co": { "id": "POST /api/dashboard/projects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/dashboard/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "dashboard" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/dashboard/projects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/dashboard/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "dashboard" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.projects`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "project", "name__orig": "project", "Name": "Project", "name_": "project", "name-": "project", "NAME": "PROJECT", "index$": 3 }, { "active": true, "entity": "project", "key$": "BasicProjectFlow", "kind": "basic", "name": "BasicProjectFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_ref01" } }] }] }, 'Project', { "POST /api/dashboard/projects": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 80, "example": "SDK Demo", "description": "Trimmed before the 1-80 character validation.", "key$": "name" }, "description": { "type": "string", "nullable": true, "key$": "description" } }, "required": ["name"], "x-ref": "#/components/schemas/CreateProjectInput", "index$": 1 } } } }, "parameters": [] }, "GET /api/dashboard/projects": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_ref01_ent = client.Project();
        let project_ref01_data = setup.data.new.project['project_ref01'];
        project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data();
        (0, node_assert_1.default)(null != project_ref01_data.id);
        // LIST
        const project_ref01_match = {};
        const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(project_ref01_list, { id: project_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project/ProjectTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NovastageSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NOVASTAGE_TEST_PROJECT_ENTID': idmap,
        'NOVASTAGE_TEST_LIVE': 'FALSE',
        'NOVASTAGE_TEST_EXPLAIN': 'FALSE',
        'NOVASTAGE_APIKEY': '',
    });
    idmap = env['NOVASTAGE_TEST_PROJECT_ENTID'];
    const live = 'TRUE' === env.NOVASTAGE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NOVASTAGE_TEST_PROJECT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NovastageSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.NOVASTAGE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NOVASTAGE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ProjectEntity.test.js.map