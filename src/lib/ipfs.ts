import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "gateway.pinata.cloud",
});

export async function uploadAuthToIPFS(data: any) {
  try {
    // Si no hay JWT o está mal formado, usamos una simulación para no romper la UI
    if (!process.env.NEXT_PUBLIC_PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT.length < 20) {
      console.warn("Pinata JWT no detectado o inválido. Retornando CID de IPFS simulado.");
      return `ipfs://QmSimulatedAuthDataHash${Math.floor(Math.random() * 1000000)}xyz`;
    }

    const upload = await pinata.upload.json(data);
    return `ipfs://${upload.IpfsHash}`;
  } catch (error) {
    console.warn("Error uploading to IPFS (Fallback to simulation):", error);
    return `ipfs://QmSimulatedAuthDataHash${Math.floor(Math.random() * 1000000)}xyz`;
  }
}
