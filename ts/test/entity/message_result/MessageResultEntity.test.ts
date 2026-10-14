

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


describe('MessageResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NOVASTAGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NOVASTAGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NovastageSDK.test()
    const ent = testsdk.MessageResult()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NovastageSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MessageResult().create({"message":1,"projectId":"x","success":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NOVASTAGE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":0},"projectId":{"a":true,"fo":"uuid","h":"Project Id","n":"projectId","r":true,"t":"`$STRING`","key$":"projectId","index$":1},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":2}},"name":"message_result","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["projectId"],"co":{"id":"POST /api/dashboard/projects/delete","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/dashboard/projects/delete","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"dashboard"},{"lit":"projects"},{"lit":"delete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"message_result","name__orig":"message_result","Name":"MessageResult","name_":"message_result","name-":"message-result","NAME":"MESSAGE_RESULT","index$":2}, {"active":true,"entity":"message_result","key$":"BasicMessageResultFlow","kind":"basic","name":"BasicMessageResultFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"message_result_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'MessageResult', {"POST /api/dashboard/projects/delete":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"projectId":{"type":"string","format":"uuid","key$":"projectId"}},"required":["projectId"],"x-ref":"#/components/schemas/ProjectIdInput","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const message_result_ref01_ent = client.MessageResult()
    let message_result_ref01_data = setup.data.new.message_result['message_result_ref01']

    message_result_ref01_data = (await message_result_ref01_ent.create(message_result_ref01_data)).data()
    assert(null != message_result_ref01_data)


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
      '../../../../.sdk/test/entity/message_result/MessageResultTestData.json')

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
    ['message_result01','message_result02','message_result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NOVASTAGE_TEST_MESSAGE_RESULT_ENTID': idmap,
    'NOVASTAGE_TEST_LIVE': 'FALSE',
    'NOVASTAGE_TEST_EXPLAIN': 'FALSE',
    'NOVASTAGE_APIKEY': '',
  })

  idmap = env['NOVASTAGE_TEST_MESSAGE_RESULT_ENTID']

  const live = 'TRUE' === env.NOVASTAGE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NOVASTAGE_TEST_MESSAGE_RESULT_ENTID']
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
  
