export type ValidatorNodeConfig = {
    peers: [string];
    chain: {
        consensus: Record<
            string,
            {
                config: {
                    child_block_time: number;
                    child_epoch_length: number;
                    contract_owner: string;
                    default_pinning_behavior: boolean;
                    election_contract: string;
                    fixed_coinbase: string;
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
                    pinners: [
                        {
                            parent_chain_account: object;
                        }
                    ];
                    pinning_reward_value: string;
                    rewards_contract: string;
                    stakers: [{ hyperchain_account: object }];
                    staking_contract: string;
                };
                type: string;
            }
        >;
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
        mining: {
            autostart: boolean;
        };
        http: {
            endpoints: {
                dry_run: boolean;
                hyperchain: boolean;
            };
        };
    };
};
