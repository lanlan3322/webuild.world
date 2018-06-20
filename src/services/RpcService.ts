import * as Web3 from "web3";

let rpcConnection: Web3;

class RpcService {
  private web3: Web3;

  public constructor() {
    if (!rpcConnection) {
      rpcConnection = (window as any).web3;
    }
    this.web3 = rpcConnection;
  }

  // Access to native rpc
  public get rpc(): Web3 {
    return this.web3;
  }

  public contract(abi: any, address: string): any {
    return this.rpc.eth.contract(abi).at(address);
  }

  public isValidateAddress(address: string) {
    return this.rpc.isAddress(address);
  }

  public async getNonce(address: string): Promise<number> {
    return await this.rpc.eth.getTransactionCount(address);
  }

  public async getGasLimit(): Promise<number> {
    const block = await this.rpc.eth.getBlock("latest");
    const gasLimit = block.gasLimit;

    return gasLimit;
  }
}

export default new RpcService();