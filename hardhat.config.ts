import 'dotenv/config';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat'
import './tasks/index'


/* note: boolean environment variables are imported as strings */
module.exports = {
    hardhat: {
        initialBaseFeePerGas: 0,
        chainId: 31337,
        hardfork: "shanghai",
        forking: {
            url: process.env.ETH_MAINNET_URL || "",
            enabled: false,
        },
    },
    networks: {
        opbnb_test: {
            chainId: 5611,
            url: process.env.OPBNB_TESTNET_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        combo_test: {
            chainId: 91715,
            url: process.env.COMBO_TESTNET_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        bsc_test: {
            chainId: 97,
            url: process.env.BSC_TESTNET_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.14",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            }
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 40000
    },
    typechain: {
        outDir: "build/types",
        target: "ethers-v5"
    },
    etherscan: {
        apiKey: {
            mainnet: "QQ13BX5666RVTDXXYFMWUUC4Z6VWRWM4P6",
            goerli: "QQ13BX5666RVTDXXYFMWUUC4Z6VWRWM4P6",
            bsc: "3QHW5YYC4SSNMJI1SM7NZAQUNWS8CBGVKM",
            bscTestnet: "3QHW5YYC4SSNMJI1SM7NZAQUNWS8CBGVKM",
            polygon: "BKWUZBT6UXQX1HZ2EVJRB1DUM57S6U1UMM",
            polygonMumbai: "BKWUZBT6UXQX1HZ2EVJRB1DUM57S6U1UMM",
            avalanche: "EWVQXEG1V51TPQTZJU15215126UIX2RXEB",
            avalancheFujiTestnet: "EWVQXEG1V51TPQTZJU15215126UIX2RXEB",
            opera: "1RD5AEHKKRGMKEBIXRINW32WZJTDB5IHEN",
            ftmTestnet: "1RD5AEHKKRGMKEBIXRINW32WZJTDB5IHEN",
            optimisticEthereum: "KEW8GN4CCGE1VVQFGCRAAM8JZSS6BZ1EV6",
            optimisticGoerli: "KEW8GN4CCGE1VVQFGCRAAM8JZSS6BZ1EV6",
            arbitrumOne: "37I1EHIAY1I5Y3ENCTIXGSQQZUIGCRE677",
            arbitrumGoerli: "37I1EHIAY1I5Y3ENCTIXGSQQZUIGCRE677",
            moonbeam: "IVA4X8YAEBDGHJMZNQYX8FEB9ATN87TU1Z",
            moonbaseAlpha: "IVA4X8YAEBDGHJMZNQYX8FEB9ATN87TU1Z",
            metis: "B69X1K1VHD9PTK6VTI791VAD2TT4CQA137",
            gnosis: "B69X1K1VHD9PTK6VTI791VAD2TT4CQA137",
            coredao:"b0b2e8b60d0d402ea19e755218135ab1",
            celo:"1KD6RPP7GGNFMJEQME8KKP74VMHCS7BBZF",
            arb_nova:"J39RTPR1W98TA2DKKNDCRCK9KU6YUQ7Z7H",
            linea_test: "QQ13BX5666RVTDXXYFMWUUC4Z6VWRWM4P6",
            linea_main: "XPY38WJ8EVQ43M63TPGJVJR9DIB4C66DS2",
            polygon_zkevm: "PX33GJZZUJQ6AWF414RBHKQYYKE3KECTNK",
            opbnb_test: "3QHW5YYC4SSNMJI1SM7NZAQUNWS8CBGVKM",
            mantle: "QQ13BX5666RVTDXXYFMWUUC4Z6VWRWM4P6",
            scroll_test: "QQ13BX5666RVTDXXYFMWUUC4Z6VWRWM4P6"
        },
        customChains: [
            {
                network: "metis",
                chainId: 1088,
                urls: {
                    apiURL: "https://andromeda-explorer.metis.io/api",
                    browserURL: "https://andromeda-explorer.metis.io/"
                }
            },
            {
                network: "gnosis",
                chainId: 100,
                urls: {
                    apiURL: "https://api.gnosisscan.io/api",
                    browserURL: "https://gnosisscan.io/"
                }
            },
            {
                network: "coredao",
                chainId: 1116,
                urls: {
                    apiURL: "https://openapi.coredao.org/api",
                    browserURL: "https://scan.coredao.org/"
                }
            },
            {
                network: "celo",
                chainId: 42220,
                urls: {
                    apiURL: "https://api.celoscan.io/api",
                    browserURL: "https://celoscan.io/"
                }
            },
            {
                network: "arb_nova",
                chainId: 42170,
                urls: {
                    apiURL: "https://api-nova.arbiscan.io/api",
                    browserURL: "https://nova.arbiscan.io/",
                },
            },
            {
                network: "linea_test",
                chainId: 59140,
                urls: {
                    apiURL: "https://goerli.lineascan.build/api",
                    browserURL: "https://goerli.lineascan.build/"
                }
            },
            {
                network: "linea_main",
                chainId: 59144,
                urls: {
                    apiURL: "https://rpc.goerli.linea.build",
                    browserURL: "https://lineascan.build"
                }
            },
            {
                network: "polygon_zkevm",
                chainId: 1101,
                urls: {
                    apiURL: "https://api-zkevm.polygonscan.com/api",
                    browserURL: "https://zkevm.polygonscan.com/"
                }
            },
            {
                network: "opbnb_test",
                chainId: 5611,
                urls: {
                    apiURL: "https://api-opbnb-testnet.bscscan.com/api",
                    browserURL: "https://opbnb-testnet.bscscan.com/"
                }
            },
            {
                network: "mantle",
                chainId: 5000,
                urls: {
                    apiURL: "https://explorer.mantle.xyz/api",
                    browserURL: "https://explorer.mantle.xyz/"
                }
            },
            {
                network: "scroll_test",
                chainId: 534353,
                urls: {
                    apiURL: "https://scrollexplorer.unifra.io/api",
                    browserURL: "https://scroll.l2scan.co/"
                }
            }
        ]
    },
}
