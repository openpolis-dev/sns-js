// RPCs
export const RPC =
  "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl";

// ABIs
export const PUBLIC_RESOLVER_ABI = [
  "function addr(bytes32) view returns (address)",
  "function name(bytes32) view returns (string)",
];
export const REVERSE_REGISTRAR_ABI = [
  "function node(address) pure returns (bytes32)",
];

// Deployed Addresses
export const PUBLIC_RESOLVER_ADDR =
  "0xB55351D2bD12575309Ff7B0c5F31948e2DC665C1";
export const REVERSE_REGISTRAR_ADDR =
  "0x06c905F8f1f5c53c1e83005273E9401C5d12c350";
