import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { PublicResolverABI } from "sns-contracts2/lib/abi";
import { SepoliaPublicResolverAddr } from "sns-contracts2/lib/deployed";
import { namehash } from "ethers";

async function main() {
  // instance a `multicall`
  const multicall = new Multicall({
    nodeUrl:
      "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl",
    tryAggregate: true,
  });

  // prepare `calls` parameter
  const snsList = [
    "foo10.seedao",
    "foo11.seedao",
    "foo12.seedao",
    "foo13.seedao",
    "foo14.seedao",
    "foo15.seedao",
    "foo16.seedao",
    "foo17.seedao",
    "foo18.seedao",
    "foo19.seedao",
    "foo20.seedao",
    "foo21.seedao",
    "foo22.seedao",
    "foo23.seedao",
    "foo24.seedao",
    "foo25.seedao",
    "foo26.seedao",
    "foo27.seedao",
    "foo28.seedao",
    "foo29.seedao",
    "foo30.seedao",
    "foo31.seedao",
    "foo32.seedao",
    "foo33.seedao",
    "foo34.seedao",
    "foo35.seedao",
    "foo36.seedao",
    "foo37.seedao",
    "foo38.seedao",
    "foo39.seedao",
    "foo40.seedao",
    "foo41.seedao",
    "foo42.seedao",
    "foo43.seedao",
    "foo44.seedao",
    "foo45.seedao",
    "foo46.seedao",
    "foo47.seedao",
    "foo48.seedao",
    "foo49.seedao",
    "foo50.seedao",
    "foo51.seedao",
    "foo52.seedao",
    "foo53.seedao",
    "foo54.seedao",
    "foo55.seedao",
    "foo56.seedao",
    "foo57.seedao",
    "foo58.seedao",
    "foo59.seedao",
    "foo60.seedao",
    "foo61.seedao",
    "foo62.seedao",
    "foo63.seedao",
    "foo64.seedao",
    "foo65.seedao",
    "foo66.seedao",
    "foo67.seedao",
    "foo68.seedao",
    "foo69.seedao",
    "foo70.seedao",
    "foo71.seedao",
    "foo72.seedao",
    "foo73.seedao",
    "foo74.seedao",
    "foo75.seedao",
    "foo76.seedao",
    "foo77.seedao",
    "foo78.seedao",
    "foo79.seedao",
    "foo80.seedao",
    "foo81.seedao",
    "foo82.seedao",
    "foo83.seedao",
    "foo84.seedao",
    "foo85.seedao",
    "foo86.seedao",
    "foo87.seedao",
    "foo88.seedao",
    "foo89.seedao",
    "foo90.seedao",
  ];
  const calls: {
    reference: string;
    methodName: string;
    methodParameters: string[];
  }[] = snsList.map((sns) => {
    return {
      reference: "addrCall",
      methodName: "addr(bytes32)",
      methodParameters: [namehash(sns)],
    };
  });

  // execute multi call
  const contractCallContext: ContractCallContext = {
    reference: "PublicResolver",
    contractAddress: SepoliaPublicResolverAddr,
    abi: PublicResolverABI,
    calls: calls,
  };
  const results: ContractCallResults =
    await multicall.call(contractCallContext);

  // print results
  console.log(results);
  results.results["PublicResolver"].callsReturnContext.map((ctx) => {
    console.log("addr value: ", ctx.returnValues[0]);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
