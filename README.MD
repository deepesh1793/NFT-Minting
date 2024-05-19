# NFT-MINTING PLATFORM
This is a project to implement a dapp built on the ICP, which allows the user to login using NFID and mint an nft into their wallet.
---
## Explanation
The project uses DIP721 as the standard for the nft-minting process. The **dip721-nft-container** is responsible for minting of nfts. It contains a canister __dip_nft_container__ which is responsible for the implementation of dip721 standard. **The minting-tool** is used to mint images to the principal id of the owner.

The **nft-wallet** module is intended to serve the purpose of porviding the wallet functionality to the dapp. It includes a canister __nftwallet__ to serve this purpose. This module also contains the frontend canister to serve as the UI for the dapp. Internet_identity is used to authorize the user to login using internet identity (this will be modified to use NFID for authoriZation).

## How to Use?

Clone this repository:
```
git clone https://github.com/deepesh1793/NFT-Minting.git
cd nfts/dip721-nft-container
```
Start the dfx replica locally:
```
dfx start --background --clean
```
Deploy the dip_nft_container canister (Note that the arguments can vary)
```
dfx deploy --argument 'record{name="DFX Blobs";symbol="DFXB";custodians=null;logo=null}' dip721_nft_container
```
Use the minting-tool 2by dfinity to mint photos
To use the minting tool:
```
cargo install --git https://github.com/dfinity/experimental-minting-tool
```
Use the following command to mint the nft:
```
minting-tool local "$(dfx canister id dip721_nft_container)" --owner "$(dfx identity get-principal)" --file ./logo.png --sha2-auto
```
Time to deploy the nftwallet canister:
```
cd ../../
cd nft-wallet
dfx deploy --no-wallet
```
Run the frontend:
```
cd ../
cd wallet/frontend/
npm run dev
```
Authorize the wallet:
```
dfx canister call '<nft-wallet canister id>' set_authorized '(principal "<Principal of wallet>",true)'
```
Transfer the collection to wallet
```
cd ../
cd nfts/dip721-nft-container/
dfx identity get-principal
dfx canister call dip721-nft-container transferFromNotifyDip721 "(principal \"<dfx identitiy principal>\",principal \"<NFT Wallet Canister ID>\",0:nat64,vec{0:nat8})"
```
