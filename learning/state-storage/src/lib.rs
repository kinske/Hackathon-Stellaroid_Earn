#![no_std]
//! Learning module: persistent contract storage.
//!
//! Focus:
//! - Storing state between invocations.
//! - Updating values with read-modify-write.
//! - Providing query methods for currently stored state.
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const COUNT_KEY: Symbol = symbol_short!("count");

#[contract]
pub struct StateStorageContract;

#[contractimpl]
impl StateStorageContract {
    /// Increments a persistent counter and returns the new value.
    ///
    /// Counter is initialized to `0` on first access.
    pub fn increment(env: Env) -> u32 {
        let current = env.storage().persistent().get(&COUNT_KEY).unwrap_or(0u32);
        let next = current + 1;
        env.storage().persistent().set(&COUNT_KEY, &next);
        next
    }

    /// Returns the current persistent counter value, defaulting to `0`.
    pub fn get_count(env: Env) -> u32 {
        env.storage().persistent().get(&COUNT_KEY).unwrap_or(0u32)
    }
}

#[cfg(test)]
mod test;
