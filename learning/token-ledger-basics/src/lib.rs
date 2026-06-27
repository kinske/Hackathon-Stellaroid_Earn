#![no_std]
//! Learning module: reading balances through the Soroban token interface.
//!
//! This pattern is common when one contract needs read-access to another
//! contract's state using an SDK client (`token::Client` in this case).
use soroban_sdk::{contract, contractimpl, token, Address, Env};

#[contract]
pub struct TokenLedgerBasicsContract;

#[contractimpl]
impl TokenLedgerBasicsContract {
    /// Reads a user's balance from an existing token contract.
    ///
    /// Inputs:
    /// - `token_address`: address of deployed token contract
    /// - `user`: account/contract address to query
    pub fn read_balance(env: Env, token_address: Address, user: Address) -> i128 {
        let client = token::Client::new(&env, &token_address);
        client.balance(&user)
    }
}

#[cfg(test)]
mod test;
