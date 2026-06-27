#![no_std]
//! Learning module: basic "hello world" return value in Soroban.
//!
//! This starter contract is intentionally simple so learners can focus on:
//! - Contract declaration and implementation macros.
//! - Soroban `Env` usage for value construction.
//! - Return types and deterministic behavior.
use soroban_sdk::{contract, contractimpl, String, Env};

#[contract]
pub struct HelloWorldContract;

#[contractimpl]
impl HelloWorldContract {
    /// Returns a static greeting string for first-time Soroban learners.
    ///
    /// This method is often used as a first test target and deploy check.
    pub fn hello(env: Env) -> String {
        String::from_str(&env, "Hello, Soroban!")
    }
}

#[cfg(test)]
mod test;
