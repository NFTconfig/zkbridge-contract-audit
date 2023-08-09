/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MptVerifier,
  MptVerifierInterface,
} from "../../../contracts/proof/MptVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "proofBlob",
        type: "bytes",
      },
    ],
    name: "validateMPT",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "receiptHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "state",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "logs",
            type: "bytes",
          },
        ],
        internalType: "struct MptVerifier.Receipt",
        name: "receipt",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611c91806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80630afb22da14610030575b600080fd5b61004a6004803603810190610045919061153b565b610060565b6040516100579190611685565b60405180910390f35b61006861137f565b6000610073836100eb565b9050600061008e82600001518360200151846040015161019e565b905060008151036100d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100cb90611704565b60405180910390fd5b6100e28260000151826106e7565b92505050919050565b6100f36113a3565b6000610106610101846107f6565b610824565b905060405180606001604052806101378360008151811061012a57610129611724565b5b6020026020010151610939565b815260200161016a6101638460018151811061015657610155611724565b5b602002602001015161094e565b60006109dd565b81526020016101938360028151811061018657610185611724565b5b6020026020010151610824565b815250915050919050565b60606000806060806101ae6113c7565b600087510361021157600067ffffffffffffffff8111156101d2576101d1611410565b5b6040519080825280601f01601f1916602001820160405280156102045781602001600182028036833780820191505090505b50955050505050506106e0565b60005b87518110156106d95761024088828151811061023357610232611724565b5b602002602001015161094e565b9350600081148015610259575083805190602001208a14155b1561026357600080fd5b6000811415801561027c575061027884610bd2565b8514155b1561028657600080fd5b6102a988828151811061029c5761029b611724565b5b6020026020010151610824565b925060028351036104f157600060606102e46102df866000815181106102d2576102d1611724565b5b6020026020010151610c42565b610cd5565b809250819350505060006102f9898d84610d8d565b905080896103079190611782565b9850815181101561038a5760018b5161032091906117b6565b84101561032c57600080fd5b600067ffffffffffffffff81111561034757610346611410565b5b6040519080825280601f01601f1916602001820160405280156103795781602001600182028036833780820191505090505b5099505050505050505050506106e0565b82156104485760018b5161039e91906117b6565b8410156103aa57600080fd5b8b5189101561041157600067ffffffffffffffff8111156103ce576103cd611410565b5b6040519080825280601f01601f1916602001820160405280156104005781602001600182028036833780820191505090505b5099505050505050505050506106e0565b8560018151811061042557610424611724565b5b6020026020010151945061043885610c42565b99505050505050505050506106e0565b60018b5161045691906117b6565b840361046157600080fd5b6104858660018151811061047857610477611724565b5b6020026020010151610e6d565b6104bb576104ad866001815181106104a05761049f611724565b5b6020026020010151610c42565b8051906020012097506104e9565b6104df866001815181106104d2576104d1611724565b5b602002602001015161094e565b8051906020012097505b5050506106c6565b60118351036106c5578851861461067a57600089878151811061051757610516611724565b5b602001015160f81c60f81b60f81c90506001876105349190611782565b965060108160ff161061054657600080fd5b61056c848260ff168151811061055f5761055e611724565b5b6020026020010151610eba565b156105e6576001895161057f91906117b6565b821461058a57600080fd5b600067ffffffffffffffff8111156105a5576105a4611410565b5b6040519080825280601f01601f1916602001820160405280156105d75781602001600182028036833780820191505090505b509750505050505050506106e0565b61060c848260ff16815181106105ff576105fe611724565b5b6020026020010151610e6d565b61064457610636848260ff168151811061062957610628611724565b5b6020026020010151610c42565b805190602001209550610674565b61066a848260ff168151811061065d5761065c611724565b5b602002602001015161094e565b8051906020012095505b506106c4565b6001885161068891906117b6565b811461069357600080fd5b6106b7836010815181106106aa576106a9611724565b5b6020026020010151610c42565b96505050505050506106e0565b5b5b80806106d1906117ea565b915050610214565b5050505050505b9392505050565b6106ef61137f565b600260f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260008151811061072a57610729611724565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036107775761077482600180855161076f91906117b6565b610ef3565b91505b600061078a610785846107f6565b610824565b905060405180606001604052808581526020016107c1836000815181106107b4576107b3611724565b5b6020026020010151611011565b81526020016107ea836003815181106107dd576107dc611724565b5b6020026020010151610c42565b81525091505092915050565b6107fe6113c7565b600060208301905060405180604001604052808451815260200182815250915050919050565b606061082f82610e6d565b61083857600080fd5b60006108438361106b565b905060008167ffffffffffffffff81111561086157610860611410565b5b60405190808252806020026020018201604052801561089a57816020015b6108876113c7565b81526020019060019003908161087f5790505b50905060006108ac85602001516110f8565b85602001516108bb9190611782565b9050600080600090505b8481101561092c576108d6836111b7565b9150604051806040016040528083815260200184815250848281518110610900576108ff611724565b5b602002602001018190525081836109179190611782565b92508080610924906117ea565b9150506108c5565b5082945050505050919050565b600061094482611011565b60001b9050919050565b60606000826000015167ffffffffffffffff8111156109705761096f611410565b5b6040519080825280601f01601f1916602001820160405280156109a25781602001600182028036833780820191505090505b50905060008151036109b757809150506109d8565b60008160200190506109d28460200151828660000151611293565b81925050505b919050565b606060008351116109ed57600080fd5b6000600284516109fd9190611832565b905080831115610a0c57600080fd5b8281610a1891906117b6565b90508067ffffffffffffffff811115610a3457610a33611410565b5b6040519080825280601f01601f191660200182016040528015610a665781602001600182028036833780820191505090505b5091506000808490505b8285610a7c9190611782565b811015610bb8576000600282610a9291906118a3565b03610b1857600f600487600284610aa991906118d4565b81518110610aba57610ab9611724565b5b602001015160f81c60f81b60f81c60ff16901c1660f81b848381518110610ae457610ae3611724565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610b95565b600f600087600284610b2a91906118d4565b81518110610b3b57610b3a611724565b5b602001015160f81c60f81b60f81c60ff16901c1660f81b848381518110610b6557610b64611724565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b600182610ba29190611782565b9150600181610bb19190611782565b9050610a70565b5082518114610bca57610bc9611905565b5b505092915050565b6000602082511015610bed5781805190602001209050610c3d565b81604051602001610bfe9190611970565b60405160208183030381529060405280519060200120604051602001610c2491906119a8565b6040516020818303038152906040528051906020012090505b919050565b60606000826000015111610c5557600080fd5b600080610c6184611335565b9150915060008167ffffffffffffffff811115610c8157610c80611410565b5b6040519080825280601f01601f191660200182016040528015610cb35781602001600182028036833780820191505090505b5090506000816020019050610cc9848285611293565b81945050505050919050565b600060606000835111610ce757600080fd5b6000600f600485600081518110610d0157610d00611724565b5b602001015160f81c60f81b60f81c60ff16901c1660ff1690506000808203610d30576002905060009350610d77565b60018203610d45576001905060009350610d76565b60028203610d5a576002905060019350610d75565b60038203610d6f576001905060019350610d74565b600080fd5b5b5b5b83610d8286836109dd565b935093505050915091565b600080600090505b83518582610da39190611782565b108015610db05750825181105b15610e6157828181518110610dc857610dc7611724565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848683610e029190611782565b81518110610e1357610e12611724565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614610e4e5780915050610e66565b8080610e59906117ea565b915050610d95565b809150505b9392505050565b600080826000015103610e835760009050610eb5565b60008083602001519050805160001a915060c060ff168260ff161015610eae57600092505050610eb5565b6001925050505b919050565b60006001826000015114610ed15760009050610eee565b60008083602001519050805160001a915060808260ff1614925050505b919050565b606081601f83610f039190611782565b1015610f44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3b90611a0f565b60405180910390fd5b8183610f509190611782565b84511015610f93576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8a90611a7b565b60405180910390fd5b6060821560008114610fb45760405191506000825260208201604052611005565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610ff25780518352602083019250602081019050610fd5565b50868552601f19601f8301166040525050505b50809150509392505050565b600080826000015111801561102b57506021826000015111155b61103457600080fd5b60008061104084611335565b91509150600082519050602082101561106057816020036101000a810490505b809350505050919050565b60008082600001510361108157600090506110f3565b60008061109184602001516110f8565b84602001516110a09190611782565b90506000846000015185602001516110b89190611782565b90505b808210156110ec576110cc826111b7565b826110d79190611782565b915082806110e4906117ea565b9350506110bb565b8293505050505b919050565b600080825160001a9050608060ff168110156111185760009150506111b2565b60b860ff1681108061113d575060c060ff16811015801561113c575060f860ff1681105b5b1561114c5760019150506111b2565b60c060ff168110156111875760018060b86111679190611aa8565b60ff168261117591906117b6565b61117f9190611782565b9150506111b2565b60018060f86111969190611aa8565b60ff16826111a491906117b6565b6111ae9190611782565b9150505b919050565b6000806000835160001a9050608060ff168110156111d85760019150611289565b60b860ff16811015611207576001608060ff16826111f691906117b6565b6112009190611782565b9150611288565b60c060ff168110156112375760b78103600185019450806020036101000a85510460018201810193505050611287565b60f860ff1681101561126657600160c060ff168261125591906117b6565b61125f9190611782565b9150611286565b60f78103600185019450806020036101000a855104600182018101935050505b5b5b5b8192505050919050565b6000810315611330575b602060ff1681106112e75782518252602060ff16836112bc9190611782565b9250602060ff16826112ce9190611782565b9150602060ff16816112e091906117b6565b905061129d565b600081111561132f576000600182602060ff1661130491906117b6565b6101006113119190611c10565b61131b91906117b6565b905080198451168184511681811785525050505b5b505050565b600080600061134784602001516110f8565b9050600081856020015161135b9190611782565b9050600082866000015161136f91906117b6565b9050818194509450505050915091565b60405180606001604052806000801916815260200160008152602001606081525090565b60405180606001604052806000801916815260200160608152602001606081525090565b604051806040016040528060008152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611448826113ff565b810181811067ffffffffffffffff8211171561146757611466611410565b5b80604052505050565b600061147a6113e1565b9050611486828261143f565b919050565b600067ffffffffffffffff8211156114a6576114a5611410565b5b6114af826113ff565b9050602081019050919050565b82818337600083830152505050565b60006114de6114d98461148b565b611470565b9050828152602081018484840111156114fa576114f96113fa565b5b6115058482856114bc565b509392505050565b600082601f830112611522576115216113f5565b5b81356115328482602086016114cb565b91505092915050565b600060208284031215611551576115506113eb565b5b600082013567ffffffffffffffff81111561156f5761156e6113f0565b5b61157b8482850161150d565b91505092915050565b6000819050919050565b61159781611584565b82525050565b6000819050919050565b6115b08161159d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156115f05780820151818401526020810190506115d5565b60008484015250505050565b6000611607826115b6565b61161181856115c1565b93506116218185602086016115d2565b61162a816113ff565b840191505092915050565b600060608301600083015161164d600086018261158e565b50602083015161166060208601826115a7565b506040830151848203604086015261167882826115fc565b9150508091505092915050565b6000602082019050818103600083015261169f8184611635565b905092915050565b600082825260208201905092915050565b7f696e76616c69642070726f6f6600000000000000000000000000000000000000600082015250565b60006116ee600d836116a7565b91506116f9826116b8565b602082019050919050565b6000602082019050818103600083015261171d816116e1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061178d8261159d565b91506117988361159d565b92508282019050808211156117b0576117af611753565b5b92915050565b60006117c18261159d565b91506117cc8361159d565b92508282039050818111156117e4576117e3611753565b5b92915050565b60006117f58261159d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361182757611826611753565b5b600182019050919050565b600061183d8261159d565b91506118488361159d565b92508282026118568161159d565b9150828204841483151761186d5761186c611753565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006118ae8261159d565b91506118b98361159d565b9250826118c9576118c8611874565b5b828206905092915050565b60006118df8261159d565b91506118ea8361159d565b9250826118fa576118f9611874565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b600081905092915050565b600061194a826115b6565b6119548185611934565b93506119648185602086016115d2565b80840191505092915050565b600061197c828461193f565b915081905092915050565b6000819050919050565b6119a261199d82611584565b611987565b82525050565b60006119b48284611991565b60208201915081905092915050565b7f736c6963655f6f766572666c6f77000000000000000000000000000000000000600082015250565b60006119f9600e836116a7565b9150611a04826119c3565b602082019050919050565b60006020820190508181036000830152611a28816119ec565b9050919050565b7f736c6963655f6f75744f66426f756e6473000000000000000000000000000000600082015250565b6000611a656011836116a7565b9150611a7082611a2f565b602082019050919050565b60006020820190508181036000830152611a9481611a58565b9050919050565b600060ff82169050919050565b6000611ab382611a9b565b9150611abe83611a9b565b9250828203905060ff811115611ad757611ad6611753565b5b92915050565b60008160011c9050919050565b6000808291508390505b6001851115611b3457808604811115611b1057611b0f611753565b5b6001851615611b1f5780820291505b8081029050611b2d85611add565b9450611af4565b94509492505050565b600082611b4d5760019050611c09565b81611b5b5760009050611c09565b8160018114611b715760028114611b7b57611baa565b6001915050611c09565b60ff841115611b8d57611b8c611753565b5b8360020a915084821115611ba457611ba3611753565b5b50611c09565b5060208310610133831016604e8410600b8410161715611bdf5782820a905083811115611bda57611bd9611753565b5b611c09565b611bec8484846001611aea565b92509050818404811115611c0357611c02611753565b5b81810290505b9392505050565b6000611c1b8261159d565b9150611c268361159d565b9250611c537fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611b3d565b90509291505056fea264697066735822122070e520675e29d376925a65f9acd3b85061efc747a1ced780bedb6e519bdd25e764736f6c63430008130033";

type MptVerifierConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MptVerifierConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MptVerifier__factory extends ContractFactory {
  constructor(...args: MptVerifierConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MptVerifier> {
    return super.deploy(overrides || {}) as Promise<MptVerifier>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MptVerifier {
    return super.attach(address) as MptVerifier;
  }
  override connect(signer: Signer): MptVerifier__factory {
    return super.connect(signer) as MptVerifier__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MptVerifierInterface {
    return new utils.Interface(_abi) as MptVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MptVerifier {
    return new Contract(address, _abi, signerOrProvider) as MptVerifier;
  }
}
