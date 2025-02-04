describe('Form flow', () => {
    it('Successfully download correct init.yaml', () => {
        // Home
        cy.visit('http://localhost:3000/');
        cy.get('button[data-cy=button-get-started]').click();
        cy.get('button[data-cy=button-agree]').click();
        //Step 1
        cy.url().should('eq', 'http://localhost:3000/initiate/1');
        cy.get('input[data-cy=input-hyperchain-id]').clear().type('hc_test');
        cy.get('input[data-cy=input-hyperchain-block-time]').clear().type('4000');
        cy.get('button[data-cy=button-next]').click();
        //Step 2
        cy.url().should('eq', 'http://localhost:3000/initiate/2');
        cy.get('input[data-cy=input-pinning-chain-network-id]').type('ae_uat');
        cy.get('input[data-cy=input-pinning-chain-node-url]').type('https://testnet.aeternity.io');
        cy.get('input[data-cy=input-pinning-chain-epoch-length]').clear().type('20');
        cy.get('button[data-cy=button-next]').click();
        //Step 3
        cy.url().should('eq', 'http://localhost:3000/initiate/3');
        cy.get('input[data-cy=input-block-reward]').type('100.5');
        cy.get('input[data-cy=input-pinning-reward]').type('100.5');
        cy.get('button[data-cy=button-next]').click();
        // Step 4
        cy.url().should('eq', 'http://localhost:3000/initiate/4');
        cy.get('input[data-cy=input-validator-count]').type('3');
        cy.get('input[data-cy=input-validator-balance]').type('100.5');
        cy.get('input[data-cy=input-minimum-staking-amount]').type('100.5');
        cy.get('input[data-cy=input-faucet-init-balance]').type('100.5');
        cy.get('input[data-cy=input-treasury-init-balance]').type('100.5');
        cy.get('button[data-cy=button-finish]').click();
        // Step 5
        cy.url().should('eq', 'http://localhost:3000/initiate/5');
        cy.get('button[data-cy=button-download]').click();
        // eslint-disable-next-line promise/always-return
        cy.fixture('init.yaml').then((fixture) => {
            // eslint-disable-next-line promise/always-return
            cy.readFile('cypress/downloads/init.yaml').then((download) => {
                expect(fixture).to.eq(download);
            });
        });
    });

    it('Correctly validate step 1 form', () => {
        cy.visit('http://localhost:3000/initiate/1');

        const inputHyperchainId = cy.get('input[data-cy=input-hyperchain-id]');
        const inputChildBlockTime = cy.get('input[data-cy=input-hyperchain-block-time]');
        const buttonNext = cy.get('button[data-cy=button-next]');

        // Validate required fields
        inputHyperchainId.clear().blur();
        inputChildBlockTime.clear().blur();

        cy.contains('Hyperchain ID is required').should('be.visible');
        cy.contains('Hyperchain Block Time is required').should('be.visible');

        // Validate invalid numbers
        inputChildBlockTime.clear().type('abc').blur();
        cy.contains('Hyperchain Block Time is not a valid number').should('be.visible');

        // Validate minimum constraint
        inputChildBlockTime.clear().type('2000').blur();
        cy.contains('Hyperchain Block Time must be at least 3000').should('be.visible');

        // Validate maximum constraint
        inputChildBlockTime.clear().type('11000').blur();
        cy.contains('Hyperchain Block Time must be at most 10000').should('be.visible');

        // Validate decimal restriction (must be a whole number)
        inputChildBlockTime.clear().type('4000.5').blur();
        cy.contains('Only whole numbers are allowed').should('be.visible');

        // Ensure we stay on the page due to validation errors
        buttonNext.click();
        cy.url().should('eq', 'http://localhost:3000/initiate/1');

        // Enter valid values and proceed
        inputHyperchainId.clear().type('hc_test');
        inputChildBlockTime.clear().type('4000'); // Whole number
        buttonNext.click();

        // Ensure we proceed to the next step
        cy.url().should('not.eq', 'http://localhost:3000/initiate/1');
    });

    it('Correctly validate step 2 form', () => {
        cy.visit('http://localhost:3000/initiate/2');

        const inputNetworkId = cy.get('input[data-cy=input-pinning-chain-network-id]');
        const inputNodeUrl = cy.get('input[data-cy=input-pinning-chain-node-url]');
        const inputEpochLength = cy.get('input[data-cy=input-pinning-chain-epoch-length]');
        const buttonNext = cy.get('button[data-cy=button-next]');

        // Validate required fields
        inputNetworkId.clear().blur();
        inputNodeUrl.clear().blur();
        inputEpochLength.clear().blur();

        cy.contains('Pinning Chain Network ID is required').should('be.visible');
        cy.contains('Pinning Chain Node URL is required').should('be.visible');
        cy.contains('Pinning Chain Epoch Length is required').should('be.visible');

        // Validate invalid numbers
        inputEpochLength.clear().type('abc').blur();
        cy.contains('Pinning Chain Epoch Length is not a valid number').should('be.visible');

        // Validate URL format
        inputNodeUrl.clear().type('invalid-url').blur();
        cy.contains('Pinning Chain Node URL is not a valid HTTPS URL').should('be.visible');

        inputNodeUrl.clear().type('http://testnet.aeternity.io').blur();
        cy.contains('Pinning Chain Node URL is not a valid HTTPS URL').should('be.visible');

        inputNodeUrl.clear().type('https://testnet').blur();
        cy.contains('Pinning Chain Node URL is not a valid HTTPS URL').should('be.visible');

        // Validate minimum constraint
        inputEpochLength.clear().type('5').blur();
        cy.contains('Pinning Chain Epoch Length must be at least 10').should('be.visible');

        // Validate maximum constraint
        inputEpochLength.clear().type('150').blur();
        cy.contains('Pinning Chain Epoch Length must be at most 100').should('be.visible');

        // Validate decimal restriction (must be a whole number)
        inputEpochLength.clear().type('20.5').blur();
        cy.contains('Only whole numbers are allowed').should('be.visible');

        // Ensure we stay on the page due to validation errors
        buttonNext.click();
        cy.url().should('eq', 'http://localhost:3000/initiate/2');

        // Enter valid values and proceed
        inputNetworkId.clear().type('ae_uat');
        inputNodeUrl.clear().type('https://testnet.aeternity.io');
        inputEpochLength.clear().type('20'); // Whole number
        buttonNext.click();

        // Ensure we proceed to the next step
        cy.url().should('not.eq', 'http://localhost:3000/initiate/2');
    });

    it('Correctly validate step 3 form', () => {
        cy.visit('http://localhost:3000/initiate/3');

        const inputBlockReward = cy.get('input[data-cy=input-block-reward]');
        const inputPinningReward = cy.get('input[data-cy=input-pinning-reward]');
        const buttonNext = cy.get('button[data-cy=button-next]');

        // Validate required fields
        inputBlockReward.clear().blur();
        inputPinningReward.clear().blur();

        cy.contains('Block Reward is required').should('be.visible');
        cy.contains('Pinning Reward is required').should('be.visible');

        // Validate invalid numbers
        inputBlockReward.clear().type('abc').blur();
        cy.contains('Block Reward is not a valid number (use . as a separator)').should('be.visible');

        inputPinningReward.clear().type('1,123').blur();
        cy.contains('Pinning Reward is not a valid number (use . as a separator)').should('be.visible');

        // Validate positive number constraint
        inputBlockReward.clear().type('0').blur();
        cy.contains('Block Reward must be greater than 0').should('be.visible');

        inputPinningReward.clear().type('-10').blur();
        cy.contains('Pinning Reward must be greater than 0').should('be.visible');

        // Validate decimal places (up to 18 decimals allowed)
        inputBlockReward.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        inputPinningReward.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        // Validate exceeding 18 decimals
        inputBlockReward.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        inputPinningReward.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        // Ensure we stay on the page due to validation errors
        buttonNext.click();
        cy.url().should('eq', 'http://localhost:3000/initiate/3');

        // Enter valid values and proceed
        inputBlockReward.clear().type('100.123456789012345678'); // 18 decimals
        inputPinningReward.clear().type('100.123456789012345678'); // 18 decimals
        buttonNext.click();

        // Ensure we proceed to the next step
        cy.url().should('not.eq', 'http://localhost:3000/initiate/3');
    });

    it('Correctly validate step 4 form', () => {
        cy.visit('http://localhost:3000/initiate/4');

        const inputValidatorCount = cy.get('input[data-cy=input-validator-count]');
        const inputValidatorBalance = cy.get('input[data-cy=input-validator-balance]');
        const inputMinStakingAmount = cy.get('input[data-cy=input-minimum-staking-amount]');
        const inputFaucetInitBalance = cy.get('input[data-cy=input-faucet-init-balance]');
        const inputTreasuryInitBalance = cy.get('input[data-cy=input-treasury-init-balance]');
        const buttonFinish = cy.get('button[data-cy=button-finish]');

        // Validate required fields
        inputValidatorCount.clear().blur();
        inputValidatorBalance.clear().blur();
        inputMinStakingAmount.clear().blur();
        inputFaucetInitBalance.clear().blur();
        inputTreasuryInitBalance.clear().blur();

        cy.contains('Number Of Validators is required').should('be.visible');
        cy.contains('Validator Balance is required').should('be.visible');
        cy.contains('Minimum Staking Amount is required').should('be.visible');
        cy.contains('Faucet Init Balance is required').should('be.visible');
        cy.contains('Treasury Init Balance is required').should('be.visible');

        // Validate invalid numbers
        inputValidatorCount.clear().type('abc').blur();
        cy.contains('Number Of Validators is not a valid number').should('be.visible');

        inputValidatorBalance.clear().type('xyz').blur();
        cy.contains('Validator Balance is not a valid number (use . as a separator)').should('be.visible');

        inputMinStakingAmount.clear().type('%$@#').blur();
        cy.contains('Minimum Staking Amount is not a valid number (use . as a separator)').should('be.visible');

        inputFaucetInitBalance.clear().type('abcd').blur();
        cy.contains('Faucet Init Balance is not a valid number (use . as a separator)').should('be.visible');

        inputTreasuryInitBalance.clear().type('*&^%$').blur();
        cy.contains('Treasury Init Balance is not a valid number (use . as a separator)').should('be.visible');

        // Validate validator count (whole numbers only)
        inputValidatorCount.clear().type('3.5').blur();
        cy.contains('Only whole numbers are allowed').should('be.visible');

        // Validate positive number constraint
        inputValidatorBalance.clear().type('-10').blur();
        cy.contains('Validator Balance must be greater than 0').should('be.visible');

        inputMinStakingAmount.clear().type('-5').blur();
        cy.contains('Minimum Staking Amount must be greater than 0').should('be.visible');

        inputFaucetInitBalance.clear().type('-20').blur();
        cy.contains('Faucet Init Balance must be greater than 0').should('be.visible');

        inputTreasuryInitBalance.clear().type('-50').blur();
        cy.contains('Treasury Init Balance must be greater than 0').should('be.visible');

        // Validate decimal places (up to 18 decimals allowed)
        inputValidatorBalance.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        inputMinStakingAmount.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        inputFaucetInitBalance.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        inputTreasuryInitBalance.clear().type('100.123456789012345678').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('not.exist');

        // Validate exceeding 18 decimals (should fail)
        inputValidatorBalance.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        inputMinStakingAmount.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        inputFaucetInitBalance.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        inputTreasuryInitBalance.clear().type('100.1234567890123456789').blur();
        cy.contains('Only up to 18 decimal places are allowed').should('be.visible');

        // Validate Validator Balance vs. Minimum Staking Amount logic
        inputValidatorCount.clear().type('3');
        inputFaucetInitBalance.clear().type('100.5');
        inputTreasuryInitBalance.clear().type('100.5');
        inputValidatorBalance.clear().type('50');
        inputMinStakingAmount.clear().type('100');
        buttonFinish.click();

        cy.contains('Validator Balance can not be smaller than Minimum Staking Amount').should('be.visible');
        cy.contains('Minimum Staking Amount can not be greater than Validator Balance').should('be.visible');

        // Ensure we stay on the page due to validation errors
        buttonFinish.click();
        cy.url().should('eq', 'http://localhost:3000/initiate/4');

        // Enter valid values and proceed
        inputValidatorCount.clear().type('3'); // Whole number
        inputValidatorBalance.clear().type('100.5'); // 18 decimals max
        inputMinStakingAmount.clear().type('50'); // Less than or equal to validator balance
        inputFaucetInitBalance.clear().type('100.5'); // 18 decimals max
        inputTreasuryInitBalance.clear().type('100.5'); // 18 decimals max
        buttonFinish.click();

        // Ensure we proceed to the next step
        cy.url().should('not.eq', 'http://localhost:3000/initiate/4');
    });

    it('Show an error on last page if form has not been filled completely', () => {
        cy.visit('http://localhost:3000/initiate/5');
        cy.contains('Error parsing form data').should('be.visible');
        cy.contains('Go back to Step 1 to fix the problem.').should('be.visible');
    });
});
