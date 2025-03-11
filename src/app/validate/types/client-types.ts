export type Node = {
    difficulty: number;
    genesis_key_block_hash: string;
    hashrate: number;
    listening: boolean;
    network_id: string;
    node_revision: string;
    node_version: string;
    peer_connections: {
        inbound: number;
        outbound: number;
    };
    peer_count: number;
    peer_pubkey: string;
    pending_transactions_count: number;
    protocols: [
        {
            effective_at_height: number;
            version: number;
        }
    ];
    solutions: number;
    sync_progress: number;
    syncing: boolean;
    top_block_height: number;
    top_key_block_hash: string;
    uptime: string;
};

export type NodeConfig = {
    consensus: [
        {
            child_block_production_time: number;
            child_block_time: number;
            child_epoch_length: number;
            consensus_key: string;
            contract_owner: string;
            default_pinning_behavior: boolean;
            election_contract: string;
            fixed_coinbase: number;
            parent_chain: {
                consensus: {
                    network_id: string;
                    type: string;
                };
                parent_epoch_length: number;
                polling: {
                    fetch_interval: number;
                    nodes: string[];
                };
                start_height: number;
            };
            pinning_reward_value: number;
            rewards_contract: string;
            staking_contract: string;
        }
    ];
    hard_forks: Record<
        string,
        {
            accounts_file: string;
            contracts_file: string;
            height: number;
        }
    >;
    fork_management: {
        network_id: string;
    };
};
