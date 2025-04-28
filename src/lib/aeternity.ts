import {
    AccountBase,
    AeSdk,
    BrowserWindowMessageConnection,
    Contract,
    Encoded,
    Node,
    SUBSCRIPTION_TYPES,
    WalletConnectorFrame,
    toAe,
    toAettos,
    walletDetector
} from '@aeternity/aepp-sdk';

import { delegationContractAci } from './aci';
import { Aci } from './types';

let connector: WalletConnectorFrame;
type Wallet = Parameters<Parameters<typeof walletDetector>[1]>[0]['newWallet'];

export const aeSdk = new AeSdk({});

export const connectWallet = async (nodeUrl: string): Promise<Encoded.AccountAddress> => {
    const nodesPool = await aeSdk.getNodesInPool();
    const node = nodesPool.find((n) => n.url === nodeUrl);

    if (node) {
        aeSdk.selectNode(node.name);
    }

    if (!node) {
        aeSdk.addNode('node', new Node(nodeUrl), true);
    }

    const wallet = await new Promise<Wallet>((resolve) => {
        const scannerConnection = new BrowserWindowMessageConnection();
        const stopScan = walletDetector(scannerConnection, ({ newWallet }) => {
            resolve(newWallet);
            stopScan();
        });
    });
    connector = await WalletConnectorFrame.connect('Hyperchains Aepp', wallet.getConnection());

    return new Promise((resolve) => {
        connector.addListener('accountsChange', async (accounts: AccountBase[]) => {
            aeSdk.addAccount(accounts[0], { select: true });
            resolve(aeSdk.address);
        });
        connector.addListener('networkIdChange', async (networkId: string) => {
            aeSdk.selectNode(networkId);
        });
        connector.addListener('disconnect', () => alert('Aepp is disconnected'));
        connector.subscribeAccounts('subscribe' as SUBSCRIPTION_TYPES, 'current');
    });
};

export const getBalance = async (address: Encoded.AccountAddress) => {
    const balance = await aeSdk.getBalance(address);

    return toAe(balance) + ' AE';
};

const initializeContract = async (options: {
    aci: Aci;
    address: `ct_${string}` | `${string}.chain` | undefined;
    omitUnknown?: boolean;
}) => {
    return Contract.initialize({
        ...aeSdk.getContext(),
        aci: options.aci,
        address: options.address,
        omitUnknown: options.omitUnknown
    });
};

export const delegateStake = async ({ address, amount }: { address: string; amount: string | number }) => {
    const delegationContract = await initializeContract({
        aci: delegationContractAci as Aci,
        address: address as `ct_${string}` | `${string}.chain`
    });

    const result = await delegationContract.delegate_stake({
        amount: toAettos(amount)
    });

    return result.result?.returnType;
};

export { Encoded };
