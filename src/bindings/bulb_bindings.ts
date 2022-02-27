import { BytesLiteral, Expr, IntLiteral, MichelsonType, Parser, Prim, StringLiteral, unpackData } from '@taquito/michel-codec';

import { registerEvent } from '../indexer/indexer';
import { ShaftEvent, ShaftEventProcessor } from "../indexer/types"
import { parseHex, timestamp_to_date } from '../indexer/utils';

export interface SwitchOn extends ShaftEvent {
  from : string
  time : Date
}

export function registerSwitchOn(source : string, handler : ShaftEventProcessor<SwitchOn>) {
  registerEvent({ s: source, c: (s : string) => {
    const t : MichelsonType = {
      "prim": "pair",
      "args": [
          {
              "prim": "string"
          },
          {
              "prim": "pair",
              "args": [
                {
                  "prim": "string"
                },
                {
                  "prim": "string"
                },
              ]
          }
      ]
    };
    const expr = (new Parser()).parseJSON(unpackData(parseHex(s), t));
    let args = (expr as Prim<'Pair',[StringLiteral, Expr]>).args
    if (args === undefined) {
      return undefined
    }
    if (args[0].string !== "SwitchOn") {
      return undefined
    }
    let args1 = (args[1] as Prim<'Pair',[BytesLiteral, IntLiteral]>).args
    if (args1 === undefined) {
      return undefined
    }
    return {
      from : args1[0].bytes,
      time : timestamp_to_date(args1[1].int)
    }
  }
  , p: handler })
}

export interface SwitchOff extends ShaftEvent {
  from : string
  time : Date
}

export function registerSwitchOff(source : string, handler : ShaftEventProcessor<SwitchOff>) {
  registerEvent({ s: source, c: (s : string) => {
    const t : MichelsonType = {
      "prim": "pair",
      "args": [
          {
              "prim": "string"
          },
          {
              "prim": "pair",
              "args": [
                {
                  "prim": "string"
                },
                {
                  "prim": "string"
                },
              ]
          }
      ]
    };
    const expr = (new Parser()).parseJSON(unpackData(parseHex(s), t));
    let args = (expr as Prim<'Pair',[StringLiteral, Expr]>).args
    if (args === undefined) {
      return undefined
    }
    if (args[0].string !== "SwitchOff") {
      return undefined
    }
    let args1 = (args[1] as Prim<'Pair',[BytesLiteral, IntLiteral]>).args
    if (args1 === undefined) {
      return undefined
    }
    return {
      from : args1[0].bytes,
      time : timestamp_to_date(args1[1].int)
    }
  }
  , p: handler })
}

