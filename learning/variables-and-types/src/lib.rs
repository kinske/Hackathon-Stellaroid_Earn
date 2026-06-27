#![no_std]
//! Learning module: variables, numeric types, and Soroban `Vec`.
//!
//! Demonstrates:
//! - Declaring typed local variables.
//! - Using mutable collections in no-std contract code.
//! - Returning SDK collection types to callers/tests.
use soroban_sdk::{contract, contractimpl, Vec, Env};

#[contract]
pub struct VariablesContract;

#[contractimpl]
impl VariablesContract {
    /// Builds and returns a vector with two values derived from a base number.
    ///
    /// Example output for this implementation: `[10, 15]`.
    pub fn make_vector(env: Env) -> Vec<u32> {
        let mut values = Vec::new(&env);
        let base: u32 = 10;
        values.push_back(base);
        values.push_back(base + 5);
        values
    }
}

#[cfg(test)]
mod test;
