#![no_std]
//! Learning module: structs and field access patterns.
//!
//! Teaches how to:
//! - model data in a custom struct,
//! - construct values from function input,
//! - read fields for final computation.
use soroban_sdk::{contract, contractimpl};

#[derive(Clone, Copy)]
pub struct Counter {
    pub value: u32,
}

#[contract]
pub struct StructsMethodsContract;

#[contractimpl]
impl StructsMethodsContract {
    /// Creates a `Counter` from the input and returns incremented value.
    ///
    /// This is a lightweight example of object-style state organization.
    pub fn increment_from(start: u32) -> u32 {
        let counter = Counter { value: start };
        counter.value + 1
    }
}

#[cfg(test)]
mod test;
