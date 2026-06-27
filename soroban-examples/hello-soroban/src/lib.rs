#![no_std]
//! Soroban example: minimal greeting contract.
//!
//! Why this exists:
//! - It is the smallest possible contract you can build and deploy.
//! - It validates toolchain setup (`cargo test`, contract build, deploy).
//! - It shows returning Soroban SDK types (`String`) from contract methods.
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct HelloSoroban;

#[contractimpl]
impl HelloSoroban {
    /// Returns a static greeting for demo purposes.
    ///
    /// Use this method when validating that:
    /// - Contract wiring works end-to-end.
    /// - Function invocation returns expected deterministic output.
    pub fn greet(env: Env) -> String {
        String::from_str(&env, "Hello from Soroban examples!")
    }
}

#[cfg(test)]
mod test;
