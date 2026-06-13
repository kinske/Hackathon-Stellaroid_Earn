#![no_std]
//! Soroban example: a minimal on-chain voting counter.
//!
//! What this example demonstrates:
//! - How to define and reuse `Symbol` keys for storage slots.
//! - How to read values from persistent storage with defaults.
//! - How to write updated values back after state transitions.
//! - How to keep contract functions small and composable.
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const YES_KEY: Symbol = symbol_short!("yes");
const NO_KEY: Symbol = symbol_short!("no");

#[contract]
pub struct SimpleVoting;

#[contractimpl]
impl SimpleVoting {
    /// Increments the "yes" vote counter and returns the new total.
    ///
    /// Flow:
    /// 1. Load current `yes` count (or `0` if not yet initialized).
    /// 2. Increment the count by one.
    /// 3. Persist the updated value under `YES_KEY`.
    /// 4. Return the updated total to the caller.
    pub fn vote_yes(env: Env) -> u32 {
        let current: u32 = env.storage().persistent().get(&YES_KEY).unwrap_or(0);
        let next = current + 1;
        env.storage().persistent().set(&YES_KEY, &next);
        next
    }

    /// Increments the "no" vote counter and returns the new total.
    ///
    /// This mirrors [`Self::vote_yes`] but writes to the `NO_KEY` slot.
    pub fn vote_no(env: Env) -> u32 {
        let current: u32 = env.storage().persistent().get(&NO_KEY).unwrap_or(0);
        let next = current + 1;
        env.storage().persistent().set(&NO_KEY, &next);
        next
    }
}

#[cfg(test)]
mod test;
