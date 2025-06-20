import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useOkto } from "okto-sdk-react";

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  hash: string;
}

interface NFTGalleryProps {
  contractAddress: string;
  abi: ethers.ContractInterface;
}

const NFTGallery: React.FC<NFTGalleryProps> = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { readContractData, getWallets } = useOkto();

  const fetchNFTs = async () => {
    const id = toast.loading("Fetching NFTs...");
    try {
      setLoading(true);
      let toAddress = null;
      let networkName = null;
      const walletInfo = await getWallets();
      console.log("wallet info", walletInfo);
      if (walletInfo.wallets?.length > 0) {
        walletInfo?.wallets?.forEach((wallet) => {
          if (wallet.network_name === "POLYGON") {
            toAddress = wallet.address;
            networkName = wallet.network_name;
            console.log("network name", networkName);
            return;
          }
        });
      }
      if (networkName) {
        //const userPolygonAdd = walletInfo.wallets[1].address;
        //console.log("Polygon address",userPolygonAdd);
        const idData = {
          contractAddress: "0x3193852D4ac3154C001ca420841118917Efed680",
          abi: {
            inputs: [
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
            ],
            name: "getTokenIds",
            outputs: [
              {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          args: {
            user: toAddress,
          },
        };
        // Fetch all token IDs from the contract
        const tokenIds: string[][] = await readContractData(
          networkName,
          idData
        ); // Assuming tokenIds is an array of arrays

        if (tokenIds.length > 0) {
          // Flatten the array if `tokenIds` is an array of arrays
          const flattenedTokenIds = tokenIds.flat(); // Flattens nested arrays into a single array

          // Fetch metadata for each token ID
          const nftPromises = flattenedTokenIds.map(async (tokenId: string) => {
            try {
              const nftData = {
                contractAddress: "0x3193852D4ac3154C001ca420841118917Efed680",
                abi: {
                  inputs: [
                    {
                      internalType: "uint256",
                      name: "tokenId",
                      type: "uint256",
                    },
                  ],
                  name: "tokenURI",
                  outputs: [
                    {
                      internalType: "string",
                      name: "",
                      type: "string",
                    },
                  ],
                  stateMutability: "view",
                  type: "function",
                },
                args: { tokenId: Number(tokenId) },
              };

              //console.log("Fetching metadata for token ID:", tokenId);

              // Get the token URI
              const tokenUri: string = await readContractData(
                "POLYGON",
                nftData
              );
              if (!tokenUri)
                throw new Error(`Token URI not found for token ID: ${tokenId}`);

              // Fetch metadata from the URI
              const metadataUrl = `https://gateway.pinata.cloud/ipfs/${tokenUri}`;
              const response = await fetch(metadataUrl);
              if (!response.ok)
                throw new Error(
                  `Failed to fetch metadata from: ${metadataUrl}`
                );
              const metadata = await response.json();

              return {
                id: tokenId,
                name: metadata.name || "Unknown Name",
                description: metadata.description || "No Description",
                image: metadata.image || "",
                hash: metadata.hash || "",
              };
            } catch (err) {
              console.error(
                `Error fetching metadata for token ID ${tokenId}:`,
                err
              );
              return null; // Return null if an error occurs for a specific token
            }
          });

          // Wait for all NFT metadata to be fetched
          const fetchedNFTs = await Promise.all(nftPromises);
          setNfts(fetchedNFTs.filter((nft) => nft !== null)); // Filter out null values
        } else {
          console.warn("No token IDs found");
          toast.error("No NFTs found for this address.");
        }
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      toast.error("Failed to fetch NFTs.");
    } finally {
      toast.dismiss(id);
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-[#006666] text-3xl font-bold text-center mb-6">
        NFT Gallery
      </h1>
      {loading ? (
        <p className="text-center text-lg">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-red-500 text-center text-lg">No NFTs found.</p>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {nfts.map((nft, i) => (
            <div
              key={nft.id}
              className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#00f2ff] via-[#ff9500] to-[#0000ffb1] shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col justify-between bg-white items-center border border-gray-300 rounded-lg overflow-hidden h-full">
                <div className="flex justify-center items-cente w-full h-36">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-30 h-30 object-contain"
                  />
                </div>
                <div className="p-2 w-[280px] text-center">
                  <h2 className="text-lg font-semibold">
                    {nft.name} - {i + 1}
                  </h2>
                  <p className="text-sm text-gray-600 ">{nft.description}</p>
                  <p className="text-sm text-gray-800 font-semibold mt-2">
                    Token ID: {nft.id}
                  </p>
                  {nft?.hash && (
                    <a
                      className="inline-block mt-4 text-sm text-white bg-[#ff7300] px-4 py-2 rounded-full hover:bg-[#006666] transition-all"
                      href={`https://purple-odd-toad-540.mypinata.cloud/ipfs/${nft.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
