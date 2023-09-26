import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { ReverseRegistrarABI, PublicResolverABI } from "sns-contracts2/lib/abi";
import {
  SepoliaReverseRegistrarAddr,
  SepoliaPublicResolverAddr,
} from "sns-contracts2/lib/deployed";

async function main() {
  const multicall = new Multicall({
    nodeUrl:
      "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl",
    tryAggregate: true,
  });

  // prepare `calls` parameter
  const addrList = [
    "0x0a8fb52d19e14dd487575fdc27c070112106d78c",
    "0x7c828d9d31d8e0c02b5d439fbdd75c1c932ad993",
    "0x06f4d71ee9aa4f9d933241bbbb19fc0020a85652",
    "0x11d7f69729e2223d1f365bb748f7edd9be43e417",
    "0x2efddc89382aa4ad8c7a1bfd58a94169006f1770",
    "0x1910e51f45127bdef547d20eade43d9fb1252a16",
    "0xfbc663e683ab60e2f96fa9cc0178415aa244efe4",
    "0x3acad7130c9914f351f8a6cb003ad35fb334d29c",
    "0xf99a4515fcd363500fb3fe44ce60b8a91da3f3ec",
    "0x9859fcf5efc2ca6af2fa071f4db05014ddceb6e5",
    "0xd67257d54bbc80d61a73ccbf5505368b5448d6e4",
    "0xf43e35d77f914878dcc6a3e7ddce3226dc1314f6",
    "0x9deab3b6786a50217ba89fb8b97326a02315ecfa",
    "0x5f9c52f9dc33de4bbf2091bf6fb737a181f29709",
    "0x3daa27603e2a0a3dbf4e3a45777f9032896786fe",
    "0x4a20031a69a3e4eb902e95591f494d3a5f78164a",
    "0xb794573bfeb01cabc2dc50b6ec065faf1095c7d1",
    "0x05c1850427644cb1d08bfa355a8080f8d2280256",
    "0x565aae16934ae2d991f092f55dc8b4e802194389",
    "0x4ea4de82acf6663e8319bca67bbfd1382e58fbbe",
    "0xc4515626444bc7792492ebf5dbae385959a9a065",
    "0xb358da9d0b3b49150e8fc25b4e9d57e02a1ff157",
    "0x5a6587671d44072501b495f32560574375029e98",
    "0xf421d5242bf413163ec671efb5b4b66ec03a9988",
    "0xe40b3d461dd6d1c11e8922815ecb90b42778fe1d",
    "0xfb45be8a930d2e5a2b2f66b0758b31f199624829",
    "0x6d4a5b311d39fad113d163b8e612e91ef4326433",
    "0xe58360d38d882635c2e181392c92c1499271e293",
    "0xa2d38b8b987dc24a139a626cfcf11cf7f894ce82",
    "0x822ee24f95e3e61a75988626ba1b0ea73f0501be",
    "0x7596cf57a62dfcf0a198704d1a35cd908cc85ba6",
    "0x256088d1aa8306cdfc3d19b0236da7afdcc59eee",
    "0x109d350232d66bc876a0269d9373c71f9fa9d203",
    "0xcb52904bae1a6965fab370b622e157f6e690d755",
    "0x519c5a7245d262e40e63ad323ff0c3199b8392c9",
    "0x41f0aefc215f75bf65b0c273f2785e436e60e68b",
    "0x116fc1264798235434413df6b7ab83c352eba986",
    "0x592145cc29c6edb8e2bb6d264273dd95af9a20d6",
    "0xb7cfae941abb6becb54a8552ebb55e66763adbd0",
    "0xed95e8a264ddb31a7a2b9a7ee707906e612b3165",
    "0x76715db2e56a2151de70a0bd5e97120032b928aa",
    "0x799a6871e17d3d761012461aa576353f8995ea90",
    "0x010ffb4f8564841164409bd661cefd872347ce04",
    "0x92f1cc859fedaaf3e13f5402fa5bb1adefe5601b",
    "0x096ba2fe6f5cdc7d2e1bd2065325e49c0ab71c89",
    "0xd0ac8d424f16445e8435e30a6deee5aed7576668",
    "0xa00c0c234fe3290856b2ec4e69272a13db4509a3",
    "0x2a983d3cdb253e89ede3594a309dae1d350f326c",
    "0x776599fce4dd296732ddb9059dda9b49c242afaf",
    "0xa25093c41d801ce1bb4b77e1f746ba3d8332fd9c",
    "0x3fe42eaba5211cbcc19ec305ed06c1198cadf462",
    "0xf3cae65a03e51a1f0023d30f31c80d6f2c8e8be5",
    "0xaee2d19b7f79709700d526427668a9ba58004393",
    "0xd94411af8ace8524c3d720723815e6d4af039244",
    "0x4fdf332093c92e348c35fd0eebde87852150e0b4",
    "0x756936c6618782b46b93770199554c5219085a7e",
    "0x914a364b8f52319a7c6fd6968bb000f233a4e2ba",
    "0x0438758f6417848214b234f43841884860f9e018",
    "0x5e60c0da228c2dc2966550f196c7b2e9e87b5208",
    "0xd5d8efd58d407d97985fc1df9fef7b7876854b98",
    "0xa1261317bcd79895b37b172a4d7c8575decb8569",
    "0x0e5d3453073c411a116ed63b989a06a5b772f825",
    "0x79ddabd262f972d3641521862fb8b109bd1d3108",
    "0xd91482ad18314c69ce08fc93131f8adb95b70ec0",
    "0xcfb3d9a6ba8c10aa86b298813a1484ad9b6ba9eb",
    "0x4acba4e51112f749a12e6a7a26e3970a781da527",
    "0x6f991800377a62fa95b609a0b9e1a026fc910759",
    "0xf2c7fd95840f1bee2c2b4eb6d5a03425f01d4cce",
    "0xc174e38491652d5bc0ea10b2bb5cc9e20cb8562d",
    "0xa9518586042a70b2bbc2821eb63edb748ea97cf7",
    "0xca66fa0e69eb59a881d7f371602befdbdc96ab56",
    "0xe9f446b2d067ee90874b732dc2c4cd7401809917",
    "0x52b2c0d36b5f20d4f25504ef86188561e1611ea0",
    "0x7b27384d87dc802af2bc4ded115f84bf4a56576a",
    "0xcbafa5ad5ee696a80c26af82897bde78ceba9095",
    "0x398b206ff0571f3683919d65994d55bd983d6a74",
    "0xf27b2febac60dccdeb66286943ea8126e55c1ae0",
    "0x6d6532f3fee1acf5c1cfb4404fd29cc38f9907cc",
    "0x7ad112909e62decdd41c51faac90dc3558d01133",
    "0x18a835b7b734b514569bcbe49847a1f498647007",
    "0xe0984edbed091188d16ae938d4a8add9fb8de697",
  ];
  const calls1: {
    reference: string;
    methodName: string;
    methodParameters: string[];
  }[] = addrList.map((addr) => {
    return {
      reference: "nodeCall",
      methodName: "node(address)",
      methodParameters: [addr],
    };
  });
  const contractCallContext1: ContractCallContext = {
    reference: "ReverseRegistrar",
    contractAddress: SepoliaReverseRegistrarAddr,
    abi: ReverseRegistrarABI,
    calls: calls1,
  };

  // execute multi call
  const results1: ContractCallResults =
    await multicall.call(contractCallContext1);

  // print results
  console.log(results1);
  results1.results["ReverseRegistrar"].callsReturnContext.map((ctx) => {
    console.log("node value: ", ctx.returnValues[0]);
  });

  // ----- ----- ---- -----

  // prepare `calls` parameter
  const calls2: {
    reference: string;
    methodName: string;
    methodParameters: string[];
  }[] = results1.results["ReverseRegistrar"].callsReturnContext.map((ctx) => {
    return {
      reference: "nameCall",
      methodName: "name(bytes32)",
      methodParameters: [ctx.returnValues[0]],
    };
  });
  const contractCallContext2: ContractCallContext = {
    reference: "PublicResolver",
    contractAddress: SepoliaPublicResolverAddr,
    abi: PublicResolverABI,
    calls: calls2,
  };

  // execute multi call
  const results2: ContractCallResults =
    await multicall.call(contractCallContext2);

  // print results
  console.log(results2);
  results2.results["PublicResolver"].callsReturnContext.map((ctx) => {
    console.log("name value: ", ctx.returnValues[0]);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
