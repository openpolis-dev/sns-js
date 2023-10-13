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
    let [ok, nSNS] = normalize(sns);
    // check correctly and safe
    if (!ok || (safe && !(await isa(nSNS)))) {
      return "0x0000000000000000000000000000000000000000"; // SNS is not safe
    }

    return await r(nSNS, rpc);
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

    const nSNSArr = await Promise.all(
      snsArr.map(async (sns): Promise<string> => {
        // normalize
        let [ok, nSNS] = normalize(sns);
        // check correctly and safe
        if (!ok || (safe && !(await isa(nSNS)))) {
          return ""; // SNS is not available
        }

        return nSNS;
      }),
    );

    return await rs(nSNSArr, rpc);
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

    return safe
      ? await Promise.all(
          names.map(async (name): Promise<string> => {
            return name.length == 0 ? "" : (await isa(name)) ? name : "";
          }),
        )
      : names;
  }
}

export default sns;
