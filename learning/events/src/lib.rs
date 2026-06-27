#![no_std]
//! Learning module: event publishing.
//!
//! Event design basics:
//! - Use short topic keys so listeners can filter cheaply.
//! - Emit payloads with user/domain data.
//! - Keep event contracts deterministic and side-effect focused.
use soroban_sdk::{contract, contractimpl, symbol_short, Env, String};

#[contract]
pub struct EventsContract;

#[contractimpl]
impl EventsContract {
    /// Publishes a greeting event with the provided name payload.
    ///
    /// Topic: `("greet",)`
    /// Payload: provided `name`.
    pub fn emit_greeting(env: Env, name: String) {
        env.events().publish((symbol_short!("greet"),), name);
    }
}

#[cfg(test)]
mod test;
