import ethers, { namehash, Wallet, JsonRpcProvider } from "ethers";
import { ENSRegistryContract, TestRegistrarContract } from "sns-contracts";
import { PublicResolverLocalhostAddr } from "sns-contracts/lib/deployed";

async function main() {
  const provider = new JsonRpcProvider("http://localhost:8545");
  const wallet = new Wallet(
    "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const registry = ENSRegistryContract.atLocalhost().connect(wallet);
  const testRegistrar = TestRegistrarContract.atLocalhost().connect(wallet);

  const name = "foo4445554";
  let tx = await testRegistrar.register(
    name,
    (await provider.getSigner()).getAddress(),
    PublicResolverLocalhostAddr
  );
  await tx.wait();

  // ------ ------ ------ ------ ------ ------ ------ ------ ------
  // ------ testing owner、resolver
  console.log(
    `${await registry.owner(
      namehash(`${name}.test`)
    )} is the owner of '${name}.test')}`
  );
  console.log(
    `${await registry.resolver(
      namehash(`${name}.test`)
    )} is the resolver of '${name}.test')}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
