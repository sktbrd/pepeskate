import NFTGallery from "../../components/nftGallery";
import TokensBalancePanel from "../../components/tokensBalanceDisplay";

export default function nftWallet() {
  console.log("TESTE");
  return (
    <div>
      <h2>WALLET</h2>
      <br />
      <div>
        <center>
        <TokensBalancePanel walletAddress={"sktbrd.eth"} chain={"ETH_MAINNET"} />
        </center>
      </div>
      <br />
      <NFTGallery />
    </div>
  );
}
