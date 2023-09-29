import { normalize } from "@seedao/sns-namehash";
import { safe as s } from "@seedao/sns-safe";
import {
  resolve as r,
  resolves as rs,
  name as n,
  names as ns,
} from "@seedao/sns-api";

namespace sns {
  export async function resolve(
    sns: string,
    safe: boolean = true,
    rpc?: string,
  ): Promise<string> {
    let nSNS = normalize(sns);
    if (safe && !s(nSNS)) {
      return ""; // SNS is not available
    }

    return await r(nSNS, rpc);
  }

  export async function name(addr: string, rpc?: string): Promise<string> {
    return await n(addr, rpc);
  }

  export async function resolves(
    snsArr: string[],
    safe: boolean = true,
    rpc?: string,
  ): Promise<string[]> {
    const nSNSArr = snsArr.map((sns) => {
      let nSNS = normalize(sns);
      if (safe && !s(nSNS)) {
        return ""; // SNS is not available
      }
      return nSNS;
    });

    // TODO
    return await rs(nSNSArr, rpc);
  }

  export async function names(
    addrArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    return await ns(addrArr, rpc);
  }
}

export default sns;
