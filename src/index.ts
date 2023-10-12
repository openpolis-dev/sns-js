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
    const name = await n(addr, rpc);
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
    const names = await ns(addrArr, rpc);

    return safe
      ? await Promise.all(
          names.map(async (name): Promise<string> => {
            return (await isa(name)) ? name : "";
          }),
        )
      : names;
  }
}

export default sns;
