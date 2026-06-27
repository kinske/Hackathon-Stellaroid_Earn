#![no_std]
//! Learning module: basic Rust syntax inside a contract function.
//!
//! Covers:
//! - Function parameters and primitive numeric types.
//! - Expression-based return values.
//! - Keeping contract functions pure and testable.
use soroban_sdk::{contract, contractimpl};

#[contract]
pub struct SyntaxContract;

#[contractimpl]
impl SyntaxContract {
    /// Adds two numbers and returns the sum.
    ///
    /// Used to demonstrate basic argument passing in contract calls.
    pub fn add(a: u32, b: u32) -> u32 {
        a + b
    }
}

#[cfg(test)]
mod test;
