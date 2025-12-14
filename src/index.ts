import { normalize } from "@seedao/sns-namehash";
import { isSafe as isa, safe as s } from "@seedao/sns-safe";
import {
  resolve as r,
  resolves as rs,
  name as n,
  names as ns,
  tokenId as t,
} from "@seedao/sns-api";
import {
  BASE_REGISTRAR_ADDR,
  PUBLIC_RESOLVER_ADDR,
  RPC,
  SAFE_HOST,
  INDEXER_HOST,
} from "./builtin";

namespace sns {
  // sns to address
  // parameter 'sns' example: 'abc.seedao' 'sub.abc.seedao'
  export async function resolve(sns: string, rpc?: string): Promise<string> {
    return await _r(
      sns,
      SAFE_HOST,
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );
  }

  export async function _r(
    sns: string,
    safeHost: string,
    indexerHost: string,
    rpc: string,
    publicResolver: string,
  ): Promise<string> {
    if (sns.length == 0) {
      return "0x0000000000000000000000000000000000000000"; // sns is empty
    }

    // normalize
    let [ok, name] = normalize(sns);
    // checking safe
    if (!ok || !(await isa(name, safeHost))) {
      return "0x0000000000000000000000000000000000000000"; // SNS is not safe
    }

    return await r(name, indexerHost, rpc, publicResolver);
  }

  // address to sns
  // return value example: 'abc.seedao' 'sub.abc.seedao'
  export async function name(addr: string, rpc?: string): Promise<string> {
    return await _n(
      addr,
      SAFE_HOST,
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );
  }

  export async function _n(
    addr: string,
    safeHost: string,
    indexerHost: string,
    rpc: string,
    publicResolver: string,
  ): Promise<string> {
    if (addr.length == 0) {
      return ""; // address is empty
    }

    const name = await n(addr, indexerHost, rpc, publicResolver);
    if (name.length == 0) {
      return ""; // address has no sns
    }

    if (!(await isa(name, safeHost))) {
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
    return await _rs(
      snsArr,
      SAFE_HOST,
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );
  }

  export async function _rs(
    snsArr: string[],
    safeHost: string,
    indexerHost: string,
    rpc: string,
    publicResolver: string,
  ): Promise<string[]> {
    if (snsArr.length == 0) {
      return []; // sns array is empty
    }
    if (snsArr.length > 300) {
      throw new Error("sns array is too large, max length is 300");
    }

    // normalize
    const names = snsArr.map((sns): string => {
      // normalize
      let [ok, nSNS] = normalize(sns);
      return ok ? nSNS : "";
    });

    // checking safe and call resolves
    return await rs(await s(names, safeHost), indexerHost, rpc, publicResolver);
  }

  // address array to sns array
  // return value example: ['abc.seedao', 'sub.abc.seedao']
  export async function names(
    addrArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    return await _ns(
      addrArr,
      SAFE_HOST,
      INDEXER_HOST,
      rpc ?? RPC,
      PUBLIC_RESOLVER_ADDR,
    );
  }

  export async function _ns(
    addrArr: string[],
    safeHost: string,
    indexerHost: string,
    rpc: string,
    publicResolver: string,
  ): Promise<string[]> {
    if (addrArr.length == 0) {
      return []; // address array is empty
    }
    if (addrArr.length > 300) {
      throw new Error("address array is too large, max length is 300");
    }

    const names = await ns(addrArr, indexerHost, rpc, publicResolver);

    return await s(names, safeHost);
  }

  // get sns's ERC721 token id
  export async function tokenId(sns: string, rpc?: string): Promise<string> {
    return await _t(
      sns,
      SAFE_HOST,
      INDEXER_HOST,
      rpc ?? RPC,
      BASE_REGISTRAR_ADDR,
    );
  }

  export async function _t(
    sns: string,
    safeHost: string,
    indexerHost: string,
    rpc: string,
    BaseRegistrar: string,
  ): Promise<string> {
    if (sns.length == 0) {
      return ""; // sns is empty
    }

    // normalize
    let [ok, name] = normalize(sns);
    // checking safe
    if (!ok || !(await isa(name, safeHost))) {
      return ""; // SNS is not safe
    }

    return await t(name, indexerHost, rpc, BaseRegistrar);
  }
}

export default sns;

export * as builtin from "./builtin";
