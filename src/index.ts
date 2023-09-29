import { Contract, JsonRpcProvider, namehash } from "ethers";
import { Multicall } from "ethereum-multicall";
import {
  RPC,
  PUBLIC_RESOLVER_ABI,
  PUBLIC_RESOLVER_ADDR,
  REVERSE_REGISTRAR_ABI,
  REVERSE_REGISTRAR_ADDR,
} from "./constant";

namespace sns {
  export async function resolve(sns: string, rpc?: string): Promise<string> {
    return new Contract(
      PUBLIC_RESOLVER_ADDR,
      PUBLIC_RESOLVER_ABI,
      new JsonRpcProvider(rpc ?? RPC),
    ).addr(namehash(sns));
  }

  export async function name(addr: string, rpc?: string): Promise<string> {
    const provider = new JsonRpcProvider(rpc ?? RPC);

    const node = await new Contract(
      REVERSE_REGISTRAR_ADDR,
      REVERSE_REGISTRAR_ABI,
      provider,
    ).node(addr);

    return new Contract(
      PUBLIC_RESOLVER_ADDR,
      PUBLIC_RESOLVER_ABI,
      provider,
    ).name(node);
  }

  export async function resolves(
    snsArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    // instance a `multicall`
    const multicall = new Multicall({
      nodeUrl: rpc ?? RPC,
      tryAggregate: true,
    });

    // prepare `calls` parameter
    const calls = snsArr.map((sns) => {
      return {
        reference: "addr",
        methodName: "addr(bytes32)",
        methodParameters: [namehash(sns)],
      };
    });
    // execute multi call
    const r = await multicall.call({
      reference: "PublicResolver",
      contractAddress: PUBLIC_RESOLVER_ADDR,
      abi: PUBLIC_RESOLVER_ABI,
      calls: calls,
    });

    // return results
    return r.results["PublicResolver"].callsReturnContext.map((ctx) => {
      return ctx.returnValues[0];
    }) as string[];
  }

  export async function names(
    addrArr: string[],
    rpc?: string,
  ): Promise<string[]> {
    // instance a `multicall`
    const multicall = new Multicall({
      nodeUrl: rpc ?? RPC,
      tryAggregate: true,
    });

    // <----- get `node` from `addr`
    // prepare `calls` parameter
    let calls = addrArr.map((addr) => {
      return {
        reference: "node",
        methodName: "node(address)",
        methodParameters: [addr],
      };
    });
    // execute multi call
    let results = await multicall.call({
      reference: "ReverseRegistrar",
      contractAddress: REVERSE_REGISTRAR_ADDR,
      abi: REVERSE_REGISTRAR_ABI,
      calls: calls,
    });
    // <----- get `node` from `addr`

    // <----- get `name` from `node`
    // prepare `calls` parameter
    calls = results.results["ReverseRegistrar"].callsReturnContext.map(
      (ctx) => {
        return {
          reference: "name",
          methodName: "name(bytes32)",
          methodParameters: [ctx.returnValues[0]],
        };
      },
    );
    // execute multi call
    results = await multicall.call({
      reference: "PublicResolver",
      contractAddress: PUBLIC_RESOLVER_ADDR,
      abi: PUBLIC_RESOLVER_ABI,
      calls: calls,
    });
    // <----- get `name` from `node`

    // return results
    return results.results["PublicResolver"].callsReturnContext.map((ctx) => {
      return ctx.returnValues[0];
    }) as string[];
  }
}

export default sns;
