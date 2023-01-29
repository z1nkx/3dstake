import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  Web3Button,
} from "@thirdweb-dev/react";
import type { FC } from "react";
import {
  editionDropContractAddress,
  stakingContractAddress,
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";

interface NFTCardProps {
  tokenId: number;
}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
  const { contract } = useContract(editionDropContractAddress, "edition-drop");
  const { data: nft } = useNFT(contract, tokenId);

  return (
    <>
    {nft && (
        <div className={styles.nftBox}>
          {nft.metadata && (
            <>
              {nft.metadata.image ? (
                <img src={nft.metadata.image} className={styles.nftMedia} alt="NFT cover" />
              ) : (
                <img className={styles.nftMedia} alt="default NFT cover" />
              )}
              <h3>{nft.metadata.name}</h3>
              <Web3Button
                action={(contract) =>
                  contract?.call("withdraw", nft.metadata.id, 1)
                }
                contractAddress={stakingContractAddress}
              >
                Withdraw
              </Web3Button>
            </>
          )}
        </div>
      )}

    </>
  );
};

export default NFTCard;
