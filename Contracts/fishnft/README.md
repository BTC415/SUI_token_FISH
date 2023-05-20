# Deployment process

After you deploy fishNFT contract, `mint_commemorative` entry fun and `mint_general` entry fun can't be executed until you call `start_timing`.

After contract deployment, publisher address will receive 
- FishAdminCap
- Publisher
- display<General>
- display<Commemorative>
- UpgradeCap
  
Do remember to record FishAdminCap object ID, which is essential to call Admin function like `start_timing`, `set_general_price`, `set_commemorative_price`, `withdraw`, `withdraw_all`. 

Immutable object is Package ID.   

Shared object is `FishNFTMintInfo`. Which is the first parameters for all public entry function. 

object ID for Clock object is `0x6`. Set it as default parameters every time calling entry function if necessary. 

[How to call function using sui client](https://docs.sui.io/build/cli-client#calling-move-code).


## Minted Information
To get shared object information like minted number, take a look on [get-object](https://github.com/MystenLabs/sui/tree/main/sdk/typescript#get-object).


## Error Hints

Example Error
```
Transaction failed
Transaction failed with the following error. Dry run failed, could not automatically determine a budget: MoveAbort(MoveLocation { module: ModuleId { address: b6152b825ecd099c6717f066a14caa506d5a9f94d6013b1acc8c1cfe98affd19, name: Identifier("fishnft") }, function: 1, instruction: 72, function_name: Some("mint_general") }, 2) in command 0
```

`2` is Error Code, corresponding to Errors definition `const EMintOverflow: u64 = 2;` 

