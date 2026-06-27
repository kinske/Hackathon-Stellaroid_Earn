#![no_std]
//! Soroban example: authorization check.
//!
//! This demonstrates Soroban's built-in auth primitive:
//! - A caller-provided `Address` can be required to authorize the call.
//! - `require_auth()` enforces signature/authorization at runtime.
//! - This pattern is the basis for owner/admin protected methods.
use soroban_sdk::{contract, contractimpl, Address};

#[contract]
pub struct AuthCheck;

#[contractimpl]
impl AuthCheck {
    /// Requires `owner` authorization for this call.
    ///
    /// If `owner` did not authorize this invocation, the call fails.
    pub fn require_owner(owner: Address) {
        owner.require_auth();
    }
}

#[cfg(test)]
mod test;
