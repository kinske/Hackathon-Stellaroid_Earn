#![no_std]
//! Soroban example: emitting application events.
//!
//! Event usage notes:
//! - Events are useful for off-chain indexing and activity feeds.
//! - Topic tuples (like `note`) help consumers filter event streams.
//! - Payloads can carry user-facing data (here: a `String` message).
use soroban_sdk::{contract, contractimpl, symbol_short, Env, String};

#[contract]
pub struct EventsDemo;

#[contractimpl]
impl EventsDemo {
    /// Emits a `note` event with provided string payload.
    ///
    /// The event topic is `("note",)` and payload is the provided message.
    pub fn emit_note(env: Env, note: String) {
        env.events().publish((symbol_short!("note"),), note);
    }
}

#[cfg(test)]
mod test;
