import {NodeConfigEndpointError, NodeEndpointError} from "@/lib/error";

export function createValidatorConfigData(nodeData: Node, nodeConfigData: NodeConfig): ValidatorNodeConfig {
    return {
        peers: [{aenode: 'aenode://pp_' + nodeData.peer_pubkey + '@initiator:3015'}],
        chain: {
            consensus: {
                [nodeConfigData.consensus[0].consensus_key]: nodeConfigData.consensus[0]
            },
            hard_forks: nodeConfigData.hard_forks
        },
        fork_management: {network_id: nodeConfigData.fork_management.network_id},
        http: {endpoints: {hyperchain: true, 'dry-run': true}},
        mining: {autostart: true},
    }
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
