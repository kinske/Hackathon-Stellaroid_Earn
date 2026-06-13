#![no_std]
//! Soroban example: persistent counter state.
//!
//! Core concepts:
//! - Persistent storage survives across invocations.
//! - `Symbol` keys are used as deterministic storage identifiers.
//! - Read-modify-write is the common state update pattern.
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const COUNTER_KEY: Symbol = symbol_short!("counter");

#[contract]
pub struct CounterStorage;

#[contractimpl]
impl CounterStorage {
    /// Increments and stores the counter, then returns the new value.
    ///
    /// This is a canonical "state mutation" pattern:
    /// - read current value,
    /// - compute next value,
    /// - write value back,
    /// - return result.
    pub fn increment(env: Env) -> u32 {
        let current: u32 = env.storage().persistent().get(&COUNTER_KEY).unwrap_or(0);
        let next = current + 1;
        env.storage().persistent().set(&COUNTER_KEY, &next);
        next
    }
}

#[cfg(test)]
mod test;
