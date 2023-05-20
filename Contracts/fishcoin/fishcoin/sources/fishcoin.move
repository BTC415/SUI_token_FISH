module fishcoin::fish {

    use std::option;
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::url;
    use sui::event::emit;

    const FISHCOIN_MINT_AMOUNT: u64 = 10_000_000_000;  // 10 billion

    struct FISH has drop {}

    // Event
    struct TransferFishEvent has copy, drop {
        amount: u64,
        sender: address,
        recipient: address,
    }

    fun init(witness: FISH, ctx: &mut TxContext) {
        let (treasurycap, metadata) = coin::create_currency<FISH>(
            witness, 
            0,
            b"FISH",
            b"FISH Token",
            b"FISH Token description",
            option::some(url::new_unsafe_from_bytes(b"https://fishui.xyz/wp-content/uploads/2023/05/11-1-1011x1024.jpg")), // icon_url
            ctx
        );

        let fish_coin: Coin<FISH> = coin::mint(&mut treasurycap, FISHCOIN_MINT_AMOUNT, ctx);

        transfer::public_transfer(fish_coin, tx_context::sender(ctx));
        transfer::public_freeze_object(treasurycap);
        // transfer::public_transfer(treasurycap, tx_context::sender(ctx));
        transfer::public_freeze_object(metadata);
    }

    public fun split(fish_coin: &mut Coin<FISH>, amount: u64, ctx: &mut TxContext): Coin<FISH> {
        coin::split<FISH>(fish_coin, amount, ctx)
    }

    public entry fun transfer(fish_coin: &mut Coin<FISH>, amount: u64, recipient: address, ctx: &mut TxContext) {
        let to_send_coin: Coin<FISH> = split(fish_coin, amount, ctx);
        emit(TransferFishEvent {
            amount: amount,
            sender: tx_context::sender(ctx),
            recipient: recipient,
        });
        transfer::public_transfer(to_send_coin, recipient);
    }
}