import { namehash, Wallet, JsonRpcProvider } from "ethers";
import {
  SNSRegistryContract,
  SeeDAORegistrarControllerContract,
  PublicResolverContract,
  ReverseRegistrarContract,
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
  const snsRegistry = SNSRegistryContract.atSepolia().connect(wallet);
  const reverseRegistrar = ReverseRegistrarContract.atSepolia().connect(wallet);
  const seeDAORegistrarController =
    SeeDAORegistrarControllerContract.atSepolia().connect(wallet);
  const subdomainRegistrar =
    SubdomainRegistrarContract.atSepolia().connect(wallet);
  const publicResolver = PublicResolverContract.atSepolia().connect(wallet);

  const name = "foo";
  let tx;
  tx = await seeDAORegistrarController.register(
    name,
    wallet.address,
    SepoliaPublicResolverAddr,
  );
  await tx.wait();

  // ------ ------ ------ ------ ------ ------ ------ ------ ------
  // ------ testing owner、resolver
  console.log(
    `${await snsRegistry.owner(
      namehash(`${name}.test`),
    )} is the owner of '${name}.test')}`,
  );
  console.log(
    `${await snsRegistry.resolver(
      namehash(`${name}.test`),
    )} is the resolver of '${name}.test')}`,
  );

  // ------ ------ ------ ------ ------ ------ ------ ------ ------
  // ------ testing reverse registrar
  console.log(
    `${await publicResolver.name(
      await reverseRegistrar.node(wallet.address),
    )} is the name of '${wallet.address}')}`,
  );

  // ------ ------ ------ ------ ------ ------ ------ ------ ------
  // ------ testing public resolver
  console.log(
    `${await publicResolver["addr(bytes32)"](
      namehash(`${name}.seedao`),
    )} is addr of '${name}.seedao')}`,
  );
  tx = await publicResolver["setAddr(bytes32,address)"](
    namehash(`${name}.seedao`),
    wallet.address,
  );
  await tx.wait();
  console.log(
    `${await publicResolver["addr(bytes32)"](
      namehash(`${name}.seedao`),
    )} is new addr of '${name}.seedao')}`,
  );
  tx = await publicResolver.setText(
    namehash(`${name}.seedao`),
    "github",
    "github.com/xx/yy",
  );
  await tx.wait();
  console.log(
    `${await publicResolver.text(
      namehash(`${name}.seedao`),
      "github",
    )} is text("${name}.seedao","github") of '${name}.seedao')}`,
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
