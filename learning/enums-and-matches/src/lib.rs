#![no_std]
//! Learning module: enums and `match` expressions in contract code.
//!
//! Main idea:
//! - model semantic state with an enum (`Active`/`Paused`),
//! - then map enum variants to values with `match`.
use soroban_sdk::{contract, contractimpl};

#[derive(Clone, Copy)]
pub enum Status {
    Active,
    Paused,
}

#[contract]
pub struct EnumsMatchesContract;

#[contractimpl]
impl EnumsMatchesContract {
    /// Returns `1` when active and `0` when paused.
    ///
    /// This function shows boolean-to-enum-to-code transformation.
    pub fn status_code(is_active: bool) -> u32 {
        let status = if is_active { Status::Active } else { Status::Paused };
        match status {
            Status::Active => 1,
            Status::Paused => 0,
        }
    }
}

#[cfg(test)]
mod test;
