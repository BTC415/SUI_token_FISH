module fishnft::fishnft {

    use std::vector;
    use std::string::{Self, utf8, String};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::vec_map::{Self, VecMap};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use sui::transfer;
    use sui::event;
    use sui::package;
    use sui::display;

    const GENERAL_MAX_AMOUNT: u64 = 8000;
    const COMMEMORATIVE_MAX_AMOUNT: u64 = 2000;
    const THREE_HOURS_IN_MS: u64 = 10_800_000;
    const MAX_MINT_FOR_EACH: u8 = 8;
    const NUM_VEC: vector<u8> = b"0123456789";
    const SUI_DECIMAL: u64 = 1_000_000_000;

    // Events
    struct WithdrawFee has copy, drop {
        amount: u64
    }

    struct GeneralMinted has copy, drop {
        owner: address,
        num: u64,
    }

    struct CommemorativeMinted has copy, drop {
        owner: address,
        num: u64,
    }

    // Errors
    const ENotStart: u64 = 0;
    const EMintClose: u64 = 1;
    const EMintOverflow: u64 = 2;
    const ENoGeneralLeft: u64 = 3;
    const ENoCommemrativeLeft: u64 = 4;
    const ENotEnoughCoin: u64 = 5;
    const EWithdrawTooLarge: u64 = 6;

    // One-Time-Witness for the module.
    struct FISHNFT has drop {}

    struct FishAdminCap has key {
        id: UID
    }

    struct FishNFTMintInfo has key {
        id: UID,
        balance: Balance<SUI>,
        general_minted_num: u64,
        commemorative_minted_num: u64,
        general_price: u64,
        commemorative_price: u64,
        minted_count: VecMap<address, u8>,
        start: u64,
    }

    struct General has key, store {
        id: UID,
        name: String,
    }

    struct Commemorative has key, store {
        id: UID,
        name: String,
    }

    fun init(otw: FISHNFT, ctx: &mut TxContext) {

        let publisher = package::claim(otw, ctx);

        let g_keys = vector[
            utf8(b"name"),
            utf8(b"link"),
            utf8(b"image_url"),
        ];

        let g_values = vector[
            // For `name` one can use the `Hero.name` property
            utf8(b"NORMAL #{name}"),
            // For `link` one can build a URL using an `id` property
            utf8(b"https://fishui.xyz/"),
            // For `image_url` general image url
            utf8(b"https://bafybeicjhfimpqx3dzwdyglmxkpfvg4fp32256at56hcsqhlx7x6of2pvm.ipfs.nftstorage.link/MEMORIAL%20EDITION.png"),
        ];

        let g_display = display::new_with_fields<General>(
            &publisher, g_keys, g_values, ctx
        );
        display::update_version(&mut g_display);

        let c_keys = vector[
            utf8(b"name"),
            utf8(b"link"),
            utf8(b"image_url"),
        ];

        let c_values = vector[
            // For `name` one can use the `Hero.name` property
            utf8(b"MEMORIAL EDITION #{name}"),
            // For `link` one can build a URL using an `id` property
            utf8(b"https://fishui.xyz/"),
            // For `image_url` for commemorative image url
            utf8(b"https://bafybeicjhfimpqx3dzwdyglmxkpfvg4fp32256at56hcsqhlx7x6of2pvm.ipfs.nftstorage.link/MEMORIAL%20EDITION.png"),
        ];

        let c_display = display::new_with_fields<Commemorative>(
            &publisher, c_keys, c_values, ctx
        );
        display::update_version(&mut c_display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(g_display, tx_context::sender(ctx));
        transfer::public_transfer(c_display, tx_context::sender(ctx));

        transfer::transfer(
            FishAdminCap {
                id: object::new(ctx)
            },
            tx_context::sender(ctx)
        );

        transfer::share_object(
            FishNFTMintInfo {
                id: object::new(ctx),
                balance: balance::zero<SUI>(),
                general_minted_num: 0,
                commemorative_minted_num: 0,
                general_price: 10 * SUI_DECIMAL,
                commemorative_price: 50 * SUI_DECIMAL,
                minted_count: vec_map::empty(),
                start: 0
            }
        );
    }

    // Public Entry
    public entry fun mint_general(
        nftmint: &mut FishNFTMintInfo, money: &mut Coin<SUI>, clock_object: &Clock, ctx: &mut TxContext
    ) {
        let sender: address = tx_context::sender(ctx);
        assert!(nftmint.start > 0, ENotStart);
        assert!(clock::timestamp_ms(clock_object) <= nftmint.start + THREE_HOURS_IN_MS, EMintClose);
        if (!vec_map::contains(&nftmint.minted_count, &sender)) {
            vec_map::insert(&mut nftmint.minted_count, sender, 0);
        };
        let mint_count = vec_map::get_mut(&mut nftmint.minted_count, &sender);
        assert!(*mint_count <= MAX_MINT_FOR_EACH - 1, EMintOverflow);
        assert!(nftmint.general_minted_num <= GENERAL_MAX_AMOUNT - 1, EMintOverflow);

        let rec_coin: Coin<SUI> = coin::split(money, nftmint.general_price, ctx);
        let cnt: u64 = nftmint.general_minted_num + 1;
        let name: String = intToString(cnt);
        nftmint.general_minted_num = nftmint.general_minted_num + 1;
        *mint_count = *mint_count + 1;
        let treasury_balance = &mut nftmint.balance;
        coin::put(treasury_balance, rec_coin);

        event::emit(GeneralMinted { owner: sender, num: cnt });
        let general = new_general(name, ctx);
        transfer::public_transfer(general, sender);
    }

    public entry fun mint_commemorative(
        nftmint: &mut FishNFTMintInfo, money: &mut Coin<SUI>, clock_object: &Clock, ctx: &mut TxContext
    ) {
        let sender: address = tx_context::sender(ctx);
        assert!(nftmint.start > 0, ENotStart);
        assert!(clock::timestamp_ms(clock_object) <= nftmint.start + THREE_HOURS_IN_MS, EMintClose);
        if (!vec_map::contains(&nftmint.minted_count, &sender)) {
            vec_map::insert(&mut nftmint.minted_count, sender, 0);
        };
        let mint_count = vec_map::get_mut(&mut nftmint.minted_count, &sender);
        assert!(*mint_count <= MAX_MINT_FOR_EACH - 1, EMintOverflow);
        assert!(nftmint.commemorative_minted_num <= COMMEMORATIVE_MAX_AMOUNT - 1, EMintOverflow);

        let rec_coin: Coin<SUI> = coin::split(money, nftmint.commemorative_price, ctx);
        let cnt: u64 = nftmint.commemorative_minted_num + 1;
        let name: String = intToString(cnt);
        nftmint.commemorative_minted_num = nftmint.commemorative_minted_num + 1;
        *mint_count = *mint_count + 1;
        let treasury_balance = &mut nftmint.balance;
        coin::put(treasury_balance, rec_coin);

        event::emit(CommemorativeMinted { owner: sender, num: cnt });
        let commemorative = new_commemorative(name, ctx);
        transfer::public_transfer(commemorative, sender);
    }

    // === Admin-only functionality ===
    public entry fun withdraw(
        self: &mut FishNFTMintInfo, _: &FishAdminCap, amount: u64, ctx: &mut TxContext
    ) {
        let treasury_balance = &mut self.balance;
        assert!(balance::value(treasury_balance) >= amount, EWithdrawTooLarge);
        let withdraw_coin = coin::take(treasury_balance, amount, ctx);
        event::emit(WithdrawFee { amount: amount});
        transfer::public_transfer(withdraw_coin, tx_context::sender(ctx))
    }

    public entry fun withdraw_all(
        self: &mut FishNFTMintInfo, _: &FishAdminCap, ctx: &mut TxContext
    ) {
        let treasury_balance = &mut self.balance;
        let amount: u64 = balance::value(treasury_balance);
        let withdraw_coin = coin::take(treasury_balance, amount, ctx);
        event::emit(WithdrawFee { amount: amount});
        transfer::public_transfer(withdraw_coin, tx_context::sender(ctx))
    }

    public entry fun start_timing(
        self: &mut FishNFTMintInfo, _: &FishAdminCap, clock_object: &Clock
    ) {
        self.start = clock::timestamp_ms(clock_object);
    }
    
    public entry fun set_general_price(fishNFT_info: &mut FishNFTMintInfo, _: &FishAdminCap, price: u64) {
        fishNFT_info.general_price = price * SUI_DECIMAL
    }

    public entry fun set_commemorative_price(fishNFT_info: &mut FishNFTMintInfo, _: &FishAdminCap, price: u64) {
        fishNFT_info.commemorative_price = price * SUI_DECIMAL
    }

    // Private
    fun new_general(name: String, ctx: &mut TxContext): General {
        General {
            id: object::new(ctx),
            name,
        }
    }

    fun new_commemorative(name: String, ctx: &mut TxContext): Commemorative {
        Commemorative {
            id: object::new(ctx),
            name,
        }
    }

    fun intToString(_n: u64): String {
        let v = _n;
        let str_b = b"";
        if(v > 0) {
            while (v > 0) {
                let rest = v % 10;
                v = v / 10;
                vector::push_back(&mut str_b, *vector::borrow(&NUM_VEC, rest));
            };
            vector::reverse(&mut str_b);
        } else {
            vector::append(&mut str_b, b"0");
        };
        string::utf8(str_b)
    }

}