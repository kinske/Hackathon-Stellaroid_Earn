#![no_std]
//! Learning module: fallible functions and custom error types.
//!
//! This file introduces:
//! - Domain-specific error enums for contract logic.
//! - Returning `Result<T, E>` instead of panicking.
//! - Handling invalid input (`b == 0`) in a predictable way.
use soroban_sdk::{contract, contracterror, contractimpl};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum MathError {
    /// Returned when attempting to divide by zero.
    DivisionByZero = 1,
}

#[contract]
pub struct FunctionsContract;

#[contractimpl]
impl FunctionsContract {
    /// Safely divides `a` by `b`.
    ///
    /// Returns:
    /// - `Ok(quotient)` when `b > 0`
    /// - `Err(MathError::DivisionByZero)` when `b == 0`
    pub fn safe_divide(a: u32, b: u32) -> Result<u32, MathError> {
        if b == 0 {
            return Err(MathError::DivisionByZero);
        }
        Ok(a / b)
    }
}

#[cfg(test)]
mod test;
