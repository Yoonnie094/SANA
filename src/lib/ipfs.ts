import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "gateway.pinata.cloud",
});

export async function uploadAuthToIPFS(data: any) {
  try {
    const upload = await pinata.upload.json(data);
    return `ipfs://${upload.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}
