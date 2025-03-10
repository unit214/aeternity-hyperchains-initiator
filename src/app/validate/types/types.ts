interface Peer {
    aenode: string;
}

interface ConsensusConfig {
    child_block_time: number;
    child_epoch_length: number;
    contract_owner: string;
    default_pinning_behavior: boolean;
    election_contract: string;
    fixed_coinbase: number;
    parent_chain: ParentChain;
    pinners: Pinner[];
    pinning_reward_value: number;
    rewards_contract: string;
    stakers: Staker[];
    staking_contract: string;
}

interface ParentChain {
    consensus: ParentConsensus;
    parent_epoch_length: number;
    polling: Polling;
    start_height: number;
}

interface ParentConsensus {
    network_id: string;
    type: string;
}

interface Polling {
    fetch_interval: number;
    nodes: string[];
}

interface Pinner {
    parent_chain_account: Account;
}

interface Staker {
    hyper_chain_account: Account;
}

interface Account {
    owner?: string;
    priv: string;
    pub: string;
}

interface Consensus {
    config: ConsensusConfig;
    type: string;
}

interface HardFork {
    accounts_file: string;
    contracts_file: string;
    height: number;
}

interface HardForks {
    [key: number]: HardFork;
}

interface Chain {
    consensus: Record<string, Consensus>;
    hard_forks: HardForks;
}

interface ForkManagement {
    network_id: string;
}

interface Mining {
    autostart: boolean;
}

interface Endpoints {
    'dry-run': boolean ;
    hyperchain: boolean;
}

interface Http {
    endpoints: Endpoints;
}

interface ValidatorNodeConfig {
    peers: Peer[];
    chain: Chain | null;
    fork_management: ForkManagement;
    mining: Mining;
    http: Http ;
}
