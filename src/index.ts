import { normalize } from "@seedao/sns-namehash";
import { isSafe as isa, safe as s } from "@seedao/sns-safe";
import {
  resolve as r,
  resolves as rs,
  name as n,
  names as ns,
} from "@seedao/sns-api";

namespace sns {
  // sns to address
  export async function resolve(
    sns: string,
    safe: boolean = true,
    rpc?: string,
  ): Promise<string> {
    if (sns.length == 0) {
      return "0x0000000000000000000000000000000000000000"; // sns is empty
    }

    // normalize
    let [ok, name] = normalize(sns);
    // checking safe
    if (!ok || (safe && !(await isa(name)))) {
      return "0x0000000000000000000000000000000000000000"; // SNS is not safe
    }

    return await r(name, rpc);
  }

  // address to sns
  export async function name(
    addr: string,
    safe: boolean = true,
    rpc?: string,
  ): Promise<string> {
    if (addr.length == 0) {
      return ""; // address is empty
    }

    const name = await n(addr, rpc);
    if (name.length == 0) {
      return ""; // address has no sns
    }

    if (safe && !(await isa(name))) {
      return ""; // SNS is not safe
    }

    return name;
  }

  export async function resolves(
    snsArr: string[],
    safe: boolean = true,
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
    return await rs(safe ? await s(names) : names, rpc);
  }

  export async function names(
    addrArr: string[],
    safe: boolean = true,
    rpc?: string,
  ): Promise<string[]> {
    if (addrArr.length == 0) {
      return []; // address array is empty
    }

    const names = await ns(addrArr, rpc);

    return safe ? await s(names) : names;
  }
}

export default sns;
