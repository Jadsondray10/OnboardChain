import { NotImplementedError } from "../errors";
import type { ArcServiceConfig } from "../config";
import type {
  ContractReadInput,
  ContractWriteInput,
  DeployContractInput,
  DeployContractResult,
} from "./types";
import type { TransactionHash } from "../types";

/**
 * Generic smart-contract read/write/deploy — deliberately ABI-agnostic
 * so any Arc contract (vault logic, opportunity escrow, reward tokens)
 * can go through the same typed surface instead of one-off bindings.
 */
export interface SmartContractService {
  read<TResult>(input: ContractReadInput): Promise<TResult>;
  write(input: ContractWriteInput): Promise<TransactionHash>;
  deploy(input: DeployContractInput): Promise<DeployContractResult>;
}

export class SmartContractServiceImpl implements SmartContractService {
  constructor(private readonly config: ArcServiceConfig) {}

  async read<TResult>(_input: ContractReadInput): Promise<TResult> {
    throw new NotImplementedError("SmartContractService.read");
  }

  async write(_input: ContractWriteInput): Promise<TransactionHash> {
    throw new NotImplementedError("SmartContractService.write");
  }

  async deploy(_input: DeployContractInput): Promise<DeployContractResult> {
    throw new NotImplementedError("SmartContractService.deploy");
  }
}
