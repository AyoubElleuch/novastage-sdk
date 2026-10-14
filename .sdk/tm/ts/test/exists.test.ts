
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NovastageSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NovastageSDK.test()
    equal(testsdk instanceof NovastageSDK, true,
      'NovastageSDK.test() must return a client synchronously')
  })

})
