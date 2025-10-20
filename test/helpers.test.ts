// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'
import Debug from 'debug'

import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js'
import { getAccountNumberByWorkOrderNumberAndObjectCode } from '../index.js'

import {
  accountNumberObjectCode,
  accountNumberWorkOrderNumber,
  mssqlConfig
} from './config.js'

Debug.enable(DEBUG_ENABLE_NAMESPACES)

await describe('helpers', async () => {
  await describe('getAccountNumberByWorkOrderNumberAndObjectCode()', async () => {
    after(async () => {
      await releaseAll()
    })

    await it('Retrieves an account number', async () => {
      const accountNumber =
        await getAccountNumberByWorkOrderNumberAndObjectCode(
          mssqlConfig,
          accountNumberWorkOrderNumber,
          accountNumberObjectCode
        )

      console.log(accountNumber)

      assert.ok(accountNumber !== undefined)
    })
  })
})
