import { 
    erc20_addresss, 
    erc721_addresss, 
    erc_staking_addresss, 
    tipJar_addresss, 
    profileStatus_addresss, 
    erc1155_addresss
} from "./adrresses";

export const contractDetails = [
    {
        title: "ERC20",
        href: "Erc20",  // Add the appropriate link here if available
        contractAddress: erc20_addresss,
        description: "ERC20 token contract for managing fungible tokens."
    },
    {
        title: "ERC721",
        href: "Erc721",  // Add the appropriate link here if available
        contractAddress: erc721_addresss,
        description: "ERC721 contract for managing non-fungible tokens (NFTs)."
    },
    {
        title: "Staking",
        href: "staking",  // Add the appropriate link here if available
        contractAddress: erc_staking_addresss,
        description: "Contract for staking ERC tokens to earn rewards."
    },
    {
        title: "Tip Jar",
        href: "tipjar",  // Add the appropriate link here if available
        contractAddress: tipJar_addresss,
        description: "Tip Jar contract for collecting tips in cryptocurrency."
    },
    {
        title: "Profile Status",
        href: "profile",  // Add the appropriate link here if available
        contractAddress: profileStatus_addresss,
        description: "Contract for managing user profile statuses on the blockchain."
    },
    {
        title: "ERC1155",
        href: "Erc1155",  // Add the appropriate link here if available
        contractAddress: erc1155_addresss,
        description: "own multiple copies of a single NFT"
    }
];
