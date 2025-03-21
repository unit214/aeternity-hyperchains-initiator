import { Node, NodeConfig } from '@/app/validate/types/client-types';
import { ValidatorNodeConfig } from '@/app/validate/types/types';
import { NodeConfigEndpointError, NodeEndpointError } from '@/lib/error';

import BigNumber from 'bignumber.js';

export function createValidatorConfigData(
    nodeData: Node,
    nodeConfigData: NodeConfig,
    nodeAeUrl: string
): ValidatorNodeConfig {
    const consensusKey = nodeConfigData.consensus[0].consensus_key;

    return {
        // we replace the web port 3013 with the aenode protocol endpoint 3015, if its part of the url
        peers: [`aenode://pp_${nodeData.peer_pubkey}@${nodeAeUrl}`],
        chain: {
            consensus: {
                [consensusKey]: {
                    config: {
                        child_block_time: nodeConfigData.consensus[0].child_block_time,
                        child_epoch_length: nodeConfigData.consensus[0].child_epoch_length,
                        contract_owner: nodeConfigData.consensus[0].contract_owner,
                        default_pinning_behavior: nodeConfigData.consensus[0].default_pinning_behavior,
                        election_contract: nodeConfigData.consensus[0].election_contract,
                        fixed_coinbase: BigNumber(nodeConfigData.consensus[0].fixed_coinbase).toFixed(0),
                        parent_chain: {
                            consensus: {
                                network_id: nodeConfigData.consensus[0].parent_chain.consensus.network_id,
                                type: nodeConfigData.consensus[0].parent_chain.consensus.type
                            },
                            parent_epoch_length: nodeConfigData.consensus[0].parent_chain.parent_epoch_length,
                            polling: {
                                fetch_interval: nodeConfigData.consensus[0].parent_chain.polling.fetch_interval,
                                nodes: nodeConfigData.consensus[0].parent_chain.polling.nodes
                            },
                            start_height: nodeConfigData.consensus[0].parent_chain.start_height
                        },
                        pinners: [
                            {
                                parent_chain_account: {
                                    owner: 'ak_2hT1UTe...your_hyperchain_pub_key...KHxk26kU',
                                    priv: '4469eb65...your_parent_chain_priv_key...09ac200387ab5631a25',
                                    pub: 'ak_2CQQctWm26...your_parent_chain_pub_key...pn8qog6MZ'
                                }
                            }
                        ],
                        pinning_reward_value: BigNumber(nodeConfigData.consensus[0].pinning_reward_value).toFixed(0),
                        rewards_contract: nodeConfigData.consensus[0].rewards_contract,
                        stakers: [
                            {
                                hyperchain_account: {
                                    priv: '4469eb65...your_priv_key...09ac200387ab5631a25',
                                    pub: 'ak_2hT1UTe...your_pub_key...KHxk26kU'
                                }
                            }
                        ],
                        staking_contract: nodeConfigData.consensus[0].staking_contract
                    },
                    type: 'hyperchain'
                }
            },
            hard_forks: nodeConfigData.hard_forks,
            fork_management: {
                network_id: nodeConfigData.fork_management.network_id
            },
            http: {
                endpoints: {
                    hyperchain: true,
                    dry_run: true
                }
            },
            mining: { autostart: true }
        }
    };
}

export async function fetchDataFromNode(nodeUrl: string | undefined, middlewareUrl: string | undefined) {
    if (!nodeUrl) {
        throw new NodeEndpointError('nodeUrl is required');
    }
    if (!middlewareUrl) {
        throw new NodeConfigEndpointError('middlewareUrl is required');
    }

    const composedNodeUrl = new URL(nodeUrl);
    if (!composedNodeUrl.pathname.includes('v3/status')) {
        composedNodeUrl.pathname += 'v3/status';
    }
    const nodeUrlResponse = await fetch(composedNodeUrl.toString());
    if (!nodeUrlResponse.ok) {
        throw new NodeEndpointError(`The node responded with status: ${nodeUrlResponse.status}`);
    }

    const nodeData: Node = await nodeUrlResponse.json();

    const composedMiddlewareUrl = new URL(middlewareUrl);
    if (!composedMiddlewareUrl.pathname.includes('v3/hyperchain/config')) {
        composedMiddlewareUrl.pathname += 'v3/hyperchain/config';
    }
    console.log(composedMiddlewareUrl.toString());
    const middlewareUrlResponse = await fetch(composedMiddlewareUrl.toString());
    if (!middlewareUrlResponse.ok) {
        throw new NodeConfigEndpointError(`The middleware responded with status: ${middlewareUrlResponse.status}`);
    }

    const middlewareData: NodeConfig = await middlewareUrlResponse.json();

    return { nodeData, middlewareData };
}
