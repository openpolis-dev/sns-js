import { Wallet, JsonRpcProvider } from "ethers";
import {
  SeeDAORegistrarControllerContract,
  SubdomainRegistrarContract,
} from "sns-contracts2";
import { SepoliaPublicResolverAddr } from "sns-contracts2/lib/deployed";

async function main() {
  const provider = new JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl",
  );
  const wallet = new Wallet(
    "a6d74194a13e405c024c9457f70f88136bcf38d4b122a2707c17855b8398bac0",
    provider,
  );
  const seeDAORegistrarController =
    SeeDAORegistrarControllerContract.atSepolia().connect(wallet);
  const subdomainRegistrar =
    SubdomainRegistrarContract.atSepolia().connect(wallet);

  const name = "foo";
  let tx;
  tx = await seeDAORegistrarController.register(
    name,
    wallet.address,
    SepoliaPublicResolverAddr,
  );
  await tx.wait();

  const subName = "bar";
  const isAvailable = await subdomainRegistrar.available(subName, name);
  console.log(`subdomain ${subName}.${name} is available: ${isAvailable}`);
  tx = await subdomainRegistrar.register(
    subName,
    name,
    wallet.address,
    SepoliaPublicResolverAddr,
  );
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
