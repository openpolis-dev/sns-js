import { namehash, Wallet, JsonRpcProvider, ethers } from "ethers";
import { BatchPublicResolverContract } from "sns-contracts2";

async function main() {
  const provider = new JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl",
  );
  const wallet = new Wallet(
    "a6d74194a13e405c024c9457f70f88136bcf38d4b122a2707c17855b8398bac0",
    provider,
  );
  const batchPublicResolver =
    BatchPublicResolverContract.atSepolia().connect(wallet);

  const sns = [
    namehash("foo10.seedao"),
    namehash("foo11.seedao"),
    namehash("foo12.seedao"),
    namehash("foo13.seedao"),
    namehash("foo14.seedao"),
    namehash("foo15.seedao"),
  ];
  (await batchPublicResolver.addr(sns)).forEach((addr, i) => {
    console.log(`${sns[i]}: ${addr}`);
  });

  const addr = [
    "0x0a8fb52d19e14dd487575fdc27c070112106d78c",
    "0x7c828d9d31d8e0c02b5d439fbdd75c1c932ad993",
    "0x06f4d71ee9aa4f9d933241bbbb19fc0020a85652",
    "0x11d7f69729e2223d1f365bb748f7edd9be43e417",
    "0x2efddc89382aa4ad8c7a1bfd58a94169006f1770",
    "0x1910e51f45127bdef547d20eade43d9fb1252a16",
  ];
  (await batchPublicResolver.name(addr)).forEach((name, i) => {
    console.log(`${addr[i]}: ${name}`);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
