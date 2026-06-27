#![no_std]
//! Learning module: mapping addresses to values with Soroban `Map`.
//!
//! Learning goals:
//! - Store keyed records (`Address -> score`) in contract storage.
//! - Read existing map data safely with a default empty map.
//! - Iterate over map entries to build a return payload.
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Map, Symbol, Vec};

const USERS_KEY: Symbol = symbol_short!("users");

#[contract]
pub struct MapsKeysContract;

#[contractimpl]
impl MapsKeysContract {
    /// Stores or updates a score for a user address.
    ///
    /// If the user already exists, the score is overwritten.
    pub fn register(env: Env, user: Address, score: u32) {
        let mut users: Map<Address, u32> = env
            .storage()
            .persistent()
            .get(&USERS_KEY)
            .unwrap_or(Map::new(&env));
        users.set(user, score);
        env.storage().persistent().set(&USERS_KEY, &users);
    }

    /// Returns all score values currently stored in the map.
    ///
    /// Note: map iteration order should not be treated as business-critical.
    pub fn list_scores(env: Env) -> Vec<u32> {
        let users: Map<Address, u32> = env
            .storage()
            .persistent()
            .get(&USERS_KEY)
            .unwrap_or(Map::new(&env));
        let mut out = Vec::new(&env);
        for (_, value) in users.iter() {
            out.push_back(value);
        }
        out
    }
}

#[cfg(test)]
mod test;
