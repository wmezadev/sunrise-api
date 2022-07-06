import { HashDriverContract } from '@ioc:Adonis/Core/Hash'
import * as bcrypt from 'bcryptjs'

interface BcryptConfig {
  driver: 'Bcrypt2HashDriver'
  rounds: number
}

export class Bcrypt2HashDriver implements HashDriverContract {
  constructor(private config: BcryptConfig | null) {}
  public ids = ['bcrypt']
  public params = { rounds: 10 }
  public version = 98

  public async hash(value: string) {
    process.emitWarning('DeprecationWarning', 'Hash.hash() is deprecated. Use Hash.make() instead')
    return this.make(value)
  }

  /**
   * Hash plain value using bcrypt.
   */
  public async make(value: string, config: BcryptConfig | null = null): Promise<string> {
    let rounds = 10
    /**
     * In order to be back compatible, we have to accept strings and numbers
     * as config rounds.
     */
    if (typeof config === 'string' || typeof config === 'number') {
      rounds = Number(config)
    } else {
      rounds = config?.rounds || this.config?.rounds || 10
    }

    return new Promise(function (resolve, reject) {
      bcrypt.hash(value, rounds, function (error, hash) {
        if (error) {
          return reject(error)
        }
        resolve(hash)
      })
    })
  }

  public needsReHash(hashedValue: string): boolean {
    if (hashedValue.startsWith('$2y')) {
      return true
    }
    return false
  }

  /**
   * Verify an existing hash with the plain value. Though this
   * method returns a promise, it never rejects the promise
   * and this is just for the sake of simplicity, since
   * bcrypt errors are not something that you can act
   * upon.
   */
  public verify(hash: string, value: string): Promise<boolean> {
    return new Promise(function (resolve) {
      const hashed = hash.replace(/^\$2y(.+)$/i, '$2a$1')
      bcrypt.compare(value, hashed, function (error, response) {
        //return resolve(true)
        if (error) {
          return resolve(false)
        }
        resolve(response)
      })
    })
  }
}
