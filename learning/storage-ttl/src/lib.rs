#![no_std]
//! Learning module: temporary storage usage.
//!
//! Temporary storage is useful for short-lived state where persistence
//! guarantees are weaker than `persistent()` data.
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const VALUE_KEY: Symbol = symbol_short!("value");

#[contract]
pub struct StorageTtlContract;

#[contractimpl]
impl StorageTtlContract {
    /// Writes a value to temporary storage under `VALUE_KEY`.
    pub fn set_value(env: Env, value: u32) {
        env.storage().temporary().set(&VALUE_KEY, &value);
    }

    /// Reads a value from temporary storage, defaulting to `0`.
    pub fn get_value(env: Env) -> u32 {
        env.storage().temporary().get(&VALUE_KEY).unwrap_or(0)
    }
}

#[cfg(test)]
mod test;
