export const delegationContractAci = [
    {
        namespace: {
            name: 'ListInternal',
            typedefs: []
        }
    },
    {
        namespace: {
            name: 'List',
            typedefs: []
        }
    },
    {
        namespace: {
            name: 'String',
            typedefs: []
        }
    },
    {
        namespace: {
            name: 'Option',
            typedefs: []
        }
    },
    {
        namespace: {
            name: 'Frac',
            typedefs: [
                {
                    name: 'frac',
                    typedef: {
                        variant: [
                            {
                                Pos: ['int', 'int']
                            },
                            {
                                Zero: []
                            },
                            {
                                Neg: ['int', 'int']
                            }
                        ]
                    },
                    vars: []
                }
            ]
        }
    },
    {
        contract: {
            functions: [
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'int'
                        },
                        {
                            name: '_2',
                            type: 'int'
                        },
                        {
                            name: '_3',
                            type: 'bool'
                        }
                    ],
                    name: 'reward_cb',
                    payable: false,
                    returns: 'unit',
                    stateful: false
                }
            ],
            kind: 'contract_interface',
            name: 'RewardCallbackI',
            payable: false,
            typedefs: []
        }
    },
    {
        contract: {
            functions: [
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'RewardCallbackI'
                        }
                    ],
                    name: 'register_reward_callback',
                    payable: false,
                    returns: 'unit',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'stake',
                    payable: false,
                    returns: 'unit',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_available_balance',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_total_balance',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'int'
                        }
                    ],
                    name: 'withdraw',
                    payable: false,
                    returns: 'unit',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'int'
                        }
                    ],
                    name: 'adjust_stake',
                    payable: false,
                    returns: 'unit',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_current_epoch',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_validator_min_stake',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'int'
                        }
                    ],
                    name: 'get_staked_amount',
                    payable: false,
                    returns: 'int',
                    stateful: false
                }
            ],
            kind: 'contract_interface',
            name: 'StakingValidatorI',
            payable: false,
            typedefs: []
        }
    },
    {
        contract: {
            functions: [
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'address'
                        },
                        {
                            name: '_2',
                            type: 'address'
                        },
                        {
                            name: '_3',
                            type: 'bool'
                        }
                    ],
                    name: 'new_validator',
                    payable: false,
                    returns: 'StakingValidatorI',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: '_1',
                            type: 'address'
                        }
                    ],
                    name: 'staking_power',
                    payable: false,
                    returns: 'int',
                    stateful: false
                }
            ],
            kind: 'contract_interface',
            name: 'MainStakingI',
            payable: false,
            typedefs: []
        }
    },
    {
        contract: {
            functions: [
                {
                    arguments: [
                        {
                            name: 'validator',
                            type: 'address'
                        },
                        {
                            name: 'main_staking_ct',
                            type: 'MainStakingI'
                        },
                        {
                            name: 'min_delegation_amount',
                            type: 'int'
                        },
                        {
                            name: 'max_delegators',
                            type: 'int'
                        },
                        {
                            name: 'min_delegation_duration',
                            type: 'int'
                        },
                        {
                            name: 'max_withdrawal_queue_length',
                            type: 'int'
                        }
                    ],
                    name: 'init',
                    payable: false,
                    returns: 'StakingPoC.state',
                    stateful: true
                },
                {
                    arguments: [],
                    name: 'delegate_stake',
                    payable: true,
                    returns: {
                        tuple: []
                    },
                    stateful: true
                },
                {
                    arguments: [],
                    name: 'request_unstake_delegated_stakes',
                    payable: false,
                    returns: 'string',
                    stateful: true
                },
                {
                    arguments: [],
                    name: 'request_withdraw_rewards',
                    payable: false,
                    returns: 'string',
                    stateful: true
                },
                {
                    arguments: [
                        {
                            name: 'epoch',
                            type: 'int'
                        },
                        {
                            name: 'amount',
                            type: 'int'
                        },
                        {
                            name: 'restaked',
                            type: 'bool'
                        }
                    ],
                    name: 'reward_cb',
                    payable: true,
                    returns: {
                        tuple: []
                    },
                    stateful: true
                },
                {
                    arguments: [],
                    name: 'withdraw',
                    payable: false,
                    returns: 'int',
                    stateful: true
                },
                {
                    arguments: [
                        {
                            name: 'delegator',
                            type: 'address'
                        }
                    ],
                    name: 'separate_eligible_withdrawals',
                    payable: false,
                    returns: {
                        tuple: [
                            {
                                list: ['StakingPoC.pending_withdrawal']
                            },
                            {
                                list: ['StakingPoC.pending_withdrawal']
                            }
                        ]
                    },
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_current_epoch',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_available_balance',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_total_balance',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_total_eligible_stake_amount',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: 'epoch',
                            type: 'int'
                        }
                    ],
                    name: 'get_total_eligible_stake_amount_',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_total_delegated_stake_amount',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_minimum_stake_amount',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_all_delegations',
                    payable: false,
                    returns: {
                        list: ['StakingPoC.delegated_stake']
                    },
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: 'delegator',
                            type: 'address'
                        }
                    ],
                    name: 'get_all_delegations_by_delegator',
                    payable: false,
                    returns: {
                        list: ['StakingPoC.delegated_stake']
                    },
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: 'delegator',
                            type: 'address'
                        }
                    ],
                    name: 'calculate_accumulated_rewards_per_delegator',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: 'epoch',
                            type: 'int'
                        }
                    ],
                    name: 'get_total_staked_amount',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_all_queued_withdrawals',
                    payable: false,
                    returns: {
                        map: [
                            'address',
                            {
                                list: ['StakingPoC.pending_withdrawal']
                            }
                        ]
                    },
                    stateful: false
                },
                {
                    arguments: [
                        {
                            name: 'owner',
                            type: 'address'
                        }
                    ],
                    name: 'get_all_queued_withdrawals_by_owner',
                    payable: false,
                    returns: {
                        list: ['StakingPoC.pending_withdrawal']
                    },
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'staking_power',
                    payable: false,
                    returns: 'int',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'get_state',
                    payable: false,
                    returns: 'StakingPoC.state',
                    stateful: false
                },
                {
                    arguments: [],
                    name: 'debug_get_last_cb_values',
                    payable: false,
                    returns: {
                        tuple: ['int', 'int', 'bool']
                    },
                    stateful: false
                }
            ],
            kind: 'contract_main',
            name: 'StakingPoC',
            payable: true,
            state: {
                record: [
                    {
                        name: 'delegated_stakes',
                        type: {
                            list: ['StakingPoC.delegated_stake']
                        }
                    },
                    {
                        name: 'max_delegators',
                        type: 'int'
                    },
                    {
                        name: 'min_delegation_duration',
                        type: 'int'
                    },
                    {
                        name: 'main_staking_ct',
                        type: 'MainStakingI'
                    },
                    {
                        name: 'staking_validator_ct',
                        type: 'StakingValidatorI'
                    },
                    {
                        name: 'min_delegation_amount',
                        type: 'int'
                    },
                    {
                        name: 'total_queued_withdrawal_amount',
                        type: 'int'
                    },
                    {
                        name: 'queued_withdrawals',
                        type: {
                            map: [
                                'address',
                                {
                                    list: ['StakingPoC.pending_withdrawal']
                                }
                            ]
                        }
                    },
                    {
                        name: 'max_withdrawal_queue_length',
                        type: 'int'
                    },
                    {
                        name: 'debug_last_cb_values',
                        type: {
                            tuple: ['int', 'int', 'bool']
                        }
                    },
                    {
                        name: 'debug_mainstaking_available_balance',
                        type: 'int'
                    },
                    {
                        name: 'debug_last_withdrawn_amount',
                        type: 'int'
                    }
                ]
            },
            typedefs: [
                {
                    name: 'delegated_stake',
                    typedef: {
                        record: [
                            {
                                name: 'delegator',
                                type: 'address'
                            },
                            {
                                name: 'stake_amount',
                                type: 'int'
                            },
                            {
                                name: 'from_epoch',
                                type: 'int'
                            },
                            {
                                name: 'reward',
                                type: 'int'
                            }
                        ]
                    },
                    vars: []
                },
                {
                    name: 'pending_withdrawal',
                    typedef: {
                        record: [
                            {
                                name: 'amount',
                                type: 'int'
                            },
                            {
                                name: 'from_epoch',
                                type: 'int'
                            }
                        ]
                    },
                    vars: []
                }
            ]
        }
    }
];
