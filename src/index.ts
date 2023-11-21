import { normalize } from "@seedao/sns-namehash";
import { isSafe as isa, safe as s } from "@seedao/sns-safe";
import {
  resolve as r,
  resolves as rs,
  name as n,
  names as ns,
} from "@seedao/sns-api";
import { PUBLIC_RESOLVER_ADDR, RPC, SAFE_HOST, INDEXER_HOST } from "./builtin";

namespace sns {
  // sns to address
  // parameter 'sns' example: 'abc.seedao' 'sub.abc.seedao'
  export async function resolve(sns: string, rpc?: string): Promise<string> {
    if (sns.length == 0) {
      return "0x0000000000000000000000000000000000000000"; // sns is empty
    }

    // normalize
    let [ok, name] = normalize(sns);
    // checking safe
    if (!ok || !(await isa(name, SAFE_HOST))) {
      return "0x0000000000000000000000000000000000000000"; // SNS is not safe
    }

    return await r(name, INDEXER_HOST, rpc ?? RPC, PUBLIC_RESOLVER_ADDR);
  }

  // address to sns
  // return value example: 'abc.seedao' 'sub.abc.seedao'
  export async function name(addr: string, rpc?: string): Promise<string> {
    if (addr.length == 0) {
      return ""; // address is empty
    }

    const name = await n(addr, INDEXER_HOST, rpc ?? RPC, PUBLIC_RESOLVER_ADDR);
    if (name.length == 0) {
      return ""; // address has no sns
    }

    if (!(await isa(name, SAFE_HOST))) {
      return ""; // SNS is not safe
    }

    return name;
  }

  // sns array to address array
  // parameter 'snssnsArr' example: ['abc.seedao', 'sub.abc.seedao']
  export async function resolves(
    snsArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    if (snsArr.length == 0) {
      return []; // sns array is empty
    }

    // normalize
    const names = snsArr.map((sns): string => {
      // normalize
      let [ok, nSNS] = normalize(sns);
      return ok ? nSNS : "";
    });

    // checking safe and call resolves
    return await rs(
      await s(names, SAFE_HOST),
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );
  }

  // address array to sns array
  // return value example: ['abc.seedao', 'sub.abc.seedao']
  export async function names(
    addrArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    if (addrArr.length == 0) {
      return []; // address array is empty
    }

    const names = await ns(
      addrArr,
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );

    return await s(names, SAFE_HOST);
  }
}

export default sns;
