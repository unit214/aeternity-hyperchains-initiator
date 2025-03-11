import {NodeConfigEndpointError, NodeEndpointError} from "@/lib/error";
import {Node, NodeConfig} from "@/app/validate/types/client-types";
import {ValidatorNodeConfig} from "@/app/validate/types/types";


export function createValidatorConfigData(nodeData: Node, nodeConfigData: NodeConfig): ValidatorNodeConfig {
    const consensusKey = nodeConfigData.consensus[0].consensus_key;
    const validatorConfigData: ValidatorNodeConfig = {
        peers: [{ aenode: `aenode://pp_${nodeData.peer_pubkey}@initiator:3015` }],
        chain: {
            consensus: {
                [consensusKey]: {
                    config: {
                        child_block_time: nodeConfigData.consensus[0].child_block_time,
                        child_epoch_length: nodeConfigData.consensus[0].child_epoch_length,
                        contract_owner: nodeConfigData.consensus[0].contract_owner,
                        default_pinning_behavior: nodeConfigData.consensus[0].default_pinning_behavior,
                        election_contract: nodeConfigData.consensus[0].election_contract,
                        fixed_coinbase: nodeConfigData.consensus[0].fixed_coinbase,
                        parent_chain: {
                            consensus: {
                                network_id: nodeConfigData.consensus[0].parent_chain.consensus.network_id,
                                type: nodeConfigData.consensus[0].parent_chain.consensus.type,
                            },
                            parent_epoch_length: nodeConfigData.consensus[0].parent_chain.parent_epoch_length,
                            polling: {
                                fetch_interval: nodeConfigData.consensus[0].parent_chain.polling.fetch_interval,
                                nodes: nodeConfigData.consensus[0].parent_chain.polling.nodes,
                            },
                            start_height: nodeConfigData.consensus[0].parent_chain.start_height,
                        },
                        pinners: [{parent_chain_account: {}}],
                        pinning_reward_value: nodeConfigData.consensus[0].pinning_reward_value,
                        rewards_contract: nodeConfigData.consensus[0].rewards_contract,
                        stakers: [{hyperchain_account: {}}],
                        staking_contract: nodeConfigData.consensus[0].staking_contract,
                    },
                    type: 'hyperchain',
                },
            },
            hard_forks: nodeConfigData.hard_forks,
            fork_management: {
                network_id: nodeConfigData.fork_management.network_id,
            },
            http: {
                endpoints: {
                    hyperchain: true,
                    dry_run: true,
                },
            },
            mining: { autostart: true },
        },
    };

    return validatorConfigData;

}

export async function fetchDataFromNode(nodeUrl: string | undefined, nodeConfigUrl: string | undefined) {

    if (!nodeUrl) {
        throw new NodeEndpointError('nodeUrl is required');
    }
    if (!nodeConfigUrl) {
        throw new NodeConfigEndpointError('nodeConfigUrl is required');
    }

    const nodeUrlResponse = await fetch(nodeUrl);
    if (!nodeUrlResponse.ok) {
        throw new NodeEndpointError(`nodeUrl responded with status: ${nodeUrlResponse.status}`);
    }

    const nodeData: Node = await nodeUrlResponse.json();
    const nodeConfigUrlResponse = await fetch(nodeConfigUrl);
    if (!nodeConfigUrlResponse.ok) {
        throw new NodeConfigEndpointError(`nodeConfigUrl responded with status: ${nodeConfigUrlResponse.status}`);
    }

    const nodeConfigData: NodeConfig = await nodeConfigUrlResponse.json();

    return {nodeData, nodeConfigData}
}
