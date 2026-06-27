#![no_std]
//! Learning module: looping and accumulator patterns in contract logic.
//!
//! Shows a common pattern used in constrained environments:
//! - initialize an accumulator,
//! - iterate with explicit loop bounds,
//! - return computed aggregate.
use soroban_sdk::{contract, contractimpl};

#[contract]
pub struct ConditionalsContract;

#[contractimpl]
impl ConditionalsContract {
    /// Returns the sum of all integers from `0` through `limit`.
    ///
    /// For example, `sum_to(4)` returns `10`.
    pub fn sum_to(limit: u32) -> u32 {
        let mut total = 0;
        let mut i = 0;

        while i <= limit {
            total += i;
            i += 1;
        }

        total
    }
}

#[cfg(test)]
mod test;
