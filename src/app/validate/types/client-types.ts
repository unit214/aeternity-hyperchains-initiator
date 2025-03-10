interface PeerConnections {
    inbound: number;
    outbound: number;
}

interface Protocol {
    effective_at_height: number;
    version: number;
}

interface Node {
    difficulty: number;
    genesis_key_block_hash: string;
    hashrate: number;
    listening: boolean;
    network_id: string;
    node_revision: string;
    node_version: string;
    peer_connections: PeerConnections;
    peer_count: number;
    peer_pubkey: string;
    pending_transactions_count: number;
    protocols: Protocol[];
    solutions: number;
    sync_progress: number;
    syncing: boolean;
    top_block_height: number;
    top_key_block_hash: string;
    uptime: string;
}

interface ParentConsensus {
    network_id: string;
    type: string;
}

interface Polling {
    fetch_interval: number;
    nodes: string[];
}

interface ParentChain {
    consensus: ParentConsensus;
    parent_epoch_length: number;
    polling: Polling;
    start_height: number;
}

interface Consensus {
    child_block_production_time: number;
    child_block_time: number;
    child_epoch_length: number;
    consensus_key: string;
    contract_owner: string;
    default_pinning_behavior: boolean;
    election_contract: string;
    fixed_coinbase: number;
    parent_chain: ParentChain;
    pinning_reward_value: number;
    rewards_contract: string;
    staking_contract: string;
}

interface HardFork {
    accounts_file: string;
    contracts_file: string;
    height: number;
}

interface ForkManagement {
    network_id: string;
}

interface NodeConfig {
    consensus: Consensus[];
    hard_forks: HardFork[];
    fork_management: ForkManagement;
}
