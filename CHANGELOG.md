# Changelog

## [1.1.0](https://github.com/aeternity/aepp-hyperchains-initiator/compare/v1.0.0...v1.1.0) (2025-01-29)


### Features

* add beta label ([197a571](https://github.com/aeternity/aepp-hyperchains-initiator/commit/197a57147eb53be8a775c5b318d68a248867a8cc))
* add disclaimer dialog to main page and adjust button text ([cc93065](https://github.com/aeternity/aepp-hyperchains-initiator/commit/cc930652ce8eb1d85f3886e18a70f8987f81fa67))
* add docker to tutorial steps ([ba8c3c7](https://github.com/aeternity/aepp-hyperchains-initiator/commit/ba8c3c7aac06c0afddf982ad5ba1a11892f2bf2a))
* add faucetInitBalance and treasuryInitBalance form fields ([9215404](https://github.com/aeternity/aepp-hyperchains-initiator/commit/92154048e233d89f30f7849ba697d65492c01b55))
* adjust font in faq content ([7ae435f](https://github.com/aeternity/aepp-hyperchains-initiator/commit/7ae435f79a4ceb5460ade45ac93d6b4ba3c236db))
* adjust header and footer ([8b26676](https://github.com/aeternity/aepp-hyperchains-initiator/commit/8b266765abf33b22d527e882119f85b57fb4af09))
* adjust link in faq section ([1a4517c](https://github.com/aeternity/aepp-hyperchains-initiator/commit/1a4517cc1c1a917b76ec563f4bea03dd4d3d4a79))
* adjust main page subtitle text ([0e26890](https://github.com/aeternity/aepp-hyperchains-initiator/commit/0e268900080d229eaf56525d0b7200c91d280df8))
* remove terms of services link ([7bf25c1](https://github.com/aeternity/aepp-hyperchains-initiator/commit/7bf25c1bed690538aee579f6dd733121a681b1c9))
* **tooltips:** add tooltips for faucet and treasury init balance ([9f8af5e](https://github.com/aeternity/aepp-hyperchains-initiator/commit/9f8af5ea66b6d03a290b2e2293c6f5f5013a9491))
* update external links ([26225e2](https://github.com/aeternity/aepp-hyperchains-initiator/commit/26225e2ab9c629b5185c2f8726b3eb4e3302e28d))
* update faq texts ([6e09ce4](https://github.com/aeternity/aepp-hyperchains-initiator/commit/6e09ce438a08a8cceb34cbeb84a72c1202114b68))
* update favicon ([dc79614](https://github.com/aeternity/aepp-hyperchains-initiator/commit/dc7961485a16c64b0665bf6abc214c32b86ee9a6))


### Bug Fixes

* add break-all to code component to fix layout on last page ([17c68d3](https://github.com/aeternity/aepp-hyperchains-initiator/commit/17c68d358a80ee41ed01cd6a36e4242ec3e9f4c6))
* add cross field validation for validatorBalance and validatorMinStake ([b281b02](https://github.com/aeternity/aepp-hyperchains-initiator/commit/b281b02830e74af083dbc05704a7fab6303a27ac))
* adjust page three text, adjust faq and last page link ([057b1fd](https://github.com/aeternity/aepp-hyperchains-initiator/commit/057b1fd1af40ae93c50eb932735b995f5f8640a5))
* change default value of childBlockTime ([daa1c43](https://github.com/aeternity/aepp-hyperchains-initiator/commit/daa1c439484cd2e28e02435958fb9e4c11c11c10))
* disable validatorBalance vs validatorMinStake validation if validatorCount is 0 ([c7dcc4c](https://github.com/aeternity/aepp-hyperchains-initiator/commit/c7dcc4cd3c177177c710d4b3d457a54ab8fb2db3))
* fix rounding of child epoch length ([b0d8c67](https://github.com/aeternity/aepp-hyperchains-initiator/commit/b0d8c674be5cffc37afc0d16f3374cbbb92b588f))
* improve form validation and error messages ([db7b429](https://github.com/aeternity/aepp-hyperchains-initiator/commit/db7b429b8609704657d72082e06c4a8973fd4465))
* **init.yaml:** use correct parent.nodeURL, fix type of validators.count ([4fd0586](https://github.com/aeternity/aepp-hyperchains-initiator/commit/4fd058693b592ff2460531f2493f14ca81417365))
* **mobile:** fix step and faq layout on mobile ([25c482b](https://github.com/aeternity/aepp-hyperchains-initiator/commit/25c482baebb5d68222782ba4ba0a9f0e85f1e845))
* set minimum and default parent epoch length to 10 ([b828c67](https://github.com/aeternity/aepp-hyperchains-initiator/commit/b828c673e61fd6825d0c184c90d19dc7dc963f71))
* show step descriptions also on md+ screens ([393b8ca](https://github.com/aeternity/aepp-hyperchains-initiator/commit/393b8cad5e2993404ca58fc3fe70279ebc0e549f))
* **texts:** change wording to pinning chain in step 2 ([8f86c24](https://github.com/aeternity/aepp-hyperchains-initiator/commit/8f86c24c2b8b3a3e27523d3bb77098e5333f3c02))

## 1.0.0 (2025-01-24)


### Features

* add form data error handling to last page ([fafc568](https://github.com/aeternity/aepp-hyperchains-initiator/commit/fafc56814ce507cceffe3f4b90bb90374d7cd3a6))
* add Next.js 15 (tailwind) starter ([f736306](https://github.com/aeternity/aepp-hyperchains-initiator/commit/f736306022b4012ea6707499fd6cd2eb42ef6b28))
* add shadcn/ui, add nav bar component ([6cee16d](https://github.com/aeternity/aepp-hyperchains-initiator/commit/6cee16dbb28926ff0e6d943abcc03f815d6283e5))
* add tooltip texts, adjust default values, adjust form layout ([fa425f7](https://github.com/aeternity/aepp-hyperchains-initiator/commit/fa425f70b343c20ca2bd9c7cdf91e662055b0f1e))
* adjust application title ([f09cd17](https://github.com/aeternity/aepp-hyperchains-initiator/commit/f09cd17cec0620ee993b0cba5cc2c07dce273368))
* allow entering all possible valid numbers, remove input restrictions but add bulletproof form validation ([6a9931c](https://github.com/aeternity/aepp-hyperchains-initiator/commit/6a9931c12a04020fd00a773860977146e9236e7b))
* **ci:** add code check github action ([b1b19a9](https://github.com/aeternity/aepp-hyperchains-initiator/commit/b1b19a9c42152064b59fd4e29c492cee3265848d))
* clear cache after downloading and closing last page ([6f36bd8](https://github.com/aeternity/aepp-hyperchains-initiator/commit/6f36bd84c9ec335b463f1916bcebae787b8138f1))
* display numbers as decimal numbers, improve error handling ([8466388](https://github.com/aeternity/aepp-hyperchains-initiator/commit/8466388f60bf7314294906b5dd04602a74e06718))
* **home:** WIP implement ui ([6f26027](https://github.com/aeternity/aepp-hyperchains-initiator/commit/6f260279bad9ccfc6623156d05d6564d0a74e0a9))
* **initiate:** adds success image ([1a26df5](https://github.com/aeternity/aepp-hyperchains-initiator/commit/1a26df5ae3bd455d77c86616868599f23f96c060))
* **initiate:** pack content in downloadable file ([a577d76](https://github.com/aeternity/aepp-hyperchains-initiator/commit/a577d76f19886f4a4151f22310b26fe427c994fa))
* **initiate:** step 5 ([9a44aa4](https://github.com/aeternity/aepp-hyperchains-initiator/commit/9a44aa45cda9c97125e6fcff1d52a08914c6dfe2))
* **initiator:** add page 1 form ([7e509c7](https://github.com/aeternity/aepp-hyperchains-initiator/commit/7e509c7b643c1578e6717eb4505dc49e5ebe5032))
* **initiator:** add page 2 form ([993a1ad](https://github.com/aeternity/aepp-hyperchains-initiator/commit/993a1adcf64184f9295ae7aa0dfdc8c9fc7d0563))
* **initiator:** store form state in local storage ([7f7a8fc](https://github.com/aeternity/aepp-hyperchains-initiator/commit/7f7a8fc6f4157f4f9f738cbe5d7c693340f599fb))
* **layout:** add initiator pages ([36dff97](https://github.com/aeternity/aepp-hyperchains-initiator/commit/36dff97eac0d3888c96b43b0fda0b18b7d31a50f))
* **layout:** adds faq ([cfa52d5](https://github.com/aeternity/aepp-hyperchains-initiator/commit/cfa52d54b04093b28d3d4e7c3af1d7b657650497))
* **layout:** adds footer ([0565fd0](https://github.com/aeternity/aepp-hyperchains-initiator/commit/0565fd0687dd8a02594d1b6870dfbe06e976a12b))
* **layout:** change accordion trigger icons to Plus/Minus ([51a369e](https://github.com/aeternity/aepp-hyperchains-initiator/commit/51a369ed17f04eadff29b8bd2ca4e30d886a64e6))
* **layout:** improve styling of nav bar and home page ([a7bf38e](https://github.com/aeternity/aepp-hyperchains-initiator/commit/a7bf38e1e3dd2f1010c578037aab424d8d478606))
* **layout:** make home page and steps responsive for mobile ([b747f29](https://github.com/aeternity/aepp-hyperchains-initiator/commit/b747f2916e44bdbf25c0e36fe3f76f918bda8ded))
* make toast more visible ([26aec2f](https://github.com/aeternity/aepp-hyperchains-initiator/commit/26aec2f73360e2ac01eb2f4396ad451882fb41e0))
* **ui:** improve layout of last page ([9c8cc5c](https://github.com/aeternity/aepp-hyperchains-initiator/commit/9c8cc5c570635f1d200edd8325a50e3cee45fea2))
* update form to match data required for init.yaml ([3fccc90](https://github.com/aeternity/aepp-hyperchains-initiator/commit/3fccc9058f71e046857b54b8182dae9d74c6b4cb))
* update tutorial steps on last page ([ddb08ea](https://github.com/aeternity/aepp-hyperchains-initiator/commit/ddb08ea12437f0d9fc0bb11bbaa4b92838b8950a))


### Bug Fixes

* adjust header, footer and faq width ([064e35e](https://github.com/aeternity/aepp-hyperchains-initiator/commit/064e35e860384d133fd7ae75e85abe1af5780ed2))
* adjust placeholder values for number intputs ([f137816](https://github.com/aeternity/aepp-hyperchains-initiator/commit/f137816da6c7a0e55f143338bad982a0c2b6c21a))
* **eslint:** fix eslint problems ([268ca1f](https://github.com/aeternity/aepp-hyperchains-initiator/commit/268ca1f684615ac3600ef5073d3693715eeb6df0))
* **faq:** removes old code ([305a359](https://github.com/aeternity/aepp-hyperchains-initiator/commit/305a359883d369fb8222f19ad644759636b7aa03))
* **initiator:** add page 3 form ([317de10](https://github.com/aeternity/aepp-hyperchains-initiator/commit/317de1010c6a81d840388fa5d60c8b9bf8ce6b82))
* **initiator:** add page 4 form ([bddd1de](https://github.com/aeternity/aepp-hyperchains-initiator/commit/bddd1de3fec94fc51457d7f70f5abfc456e17d22))
* **initiator:** always avoid hydration errors with local storage ([cdc438b](https://github.com/aeternity/aepp-hyperchains-initiator/commit/cdc438bb697c84ce5749356de8da3bea5fece07f))
* next build ([5887922](https://github.com/aeternity/aepp-hyperchains-initiator/commit/588792264f0ac49ec0be3bfce590a4aa85b3eca1))
* **ui:** fix navbar width, fix first page margins ([23d47eb](https://github.com/aeternity/aepp-hyperchains-initiator/commit/23d47ebd2db631c63c579dbc2ac8b61deeea8b09))
* **ui:** improve last page layout on mobile ([90c9c18](https://github.com/aeternity/aepp-hyperchains-initiator/commit/90c9c188571a949f9cdb83ebc3785b29846b25df))
* **ui:** replace home page images with high res versions ([00e862f](https://github.com/aeternity/aepp-hyperchains-initiator/commit/00e862fe4f9583fcdd3b53357b7894f12469004c))
* validation of step 1 & 2, empty state of step 3 ([12b278a](https://github.com/aeternity/aepp-hyperchains-initiator/commit/12b278af105caa184aafed1bc86ef77a44b53ffc))
