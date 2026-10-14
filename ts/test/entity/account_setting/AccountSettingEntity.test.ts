

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NovastageSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AccountSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NOVASTAGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NOVASTAGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NovastageSDK.test()
    const ent = testsdk.AccountSetting()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NovastageSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AccountSetting().load({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NOVASTAGE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account_setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":0},"profile":{"a":true,"h":"Profile","n":"profile","r":true,"t":"`$OBJECT`","key$":"profile","index$":1}},"name":"account_setting","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/dashboard/settings","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/dashboard/settings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"dashboard"},{"lit":"settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account_setting","name__orig":"account_setting","Name":"AccountSetting","name_":"account_setting","name-":"account-setting","NAME":"ACCOUNT_SETTING","index$":0}, {"active":true,"entity":"account_setting","key$":"BasicAccountSettingFlow","kind":"basic","name":"BasicAccountSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_setting_ref01","srcdatavar":"account_setting_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_setting_ref01"}}]}]}, 'AccountSetting', {"GET /api/dashboard/settings":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_setting_ref01_data = Object.values(setup.data.existing.account_setting)[0] as any

    // LOAD
    const account_setting_ref01_ent = client.AccountSetting()
    const account_setting_ref01_match_dt0: any = {}
    const account_setting_ref01_data_dt0 = (await account_setting_ref01_ent.load(account_setting_ref01_match_dt0)).data()
    assert(null != account_setting_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account_setting/AccountSettingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NovastageSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['account_setting01','account_setting02','account_setting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NOVASTAGE_TEST_ACCOUNT_SETTING_ENTID': idmap,
    'NOVASTAGE_TEST_LIVE': 'FALSE',
    'NOVASTAGE_TEST_EXPLAIN': 'FALSE',
    'NOVASTAGE_APIKEY': '',
  })

  idmap = env['NOVASTAGE_TEST_ACCOUNT_SETTING_ENTID']

  const live = 'TRUE' === env.NOVASTAGE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NOVASTAGE_TEST_ACCOUNT_SETTING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NovastageSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
