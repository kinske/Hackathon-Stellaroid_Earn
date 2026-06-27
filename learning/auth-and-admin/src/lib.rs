#![no_std]
//! Learning module: basic admin access control.
//!
//! Teaches:
//! - One-time initialization of an admin address.
//! - Reading admin state from instance storage.
//! - Guarding privileged functions with explicit caller checks.
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

const ADMIN_KEY: Symbol = symbol_short!("admin");

#[contract]
pub struct AuthAdminContract;

#[contractimpl]
impl AuthAdminContract {
    /// Initializes admin address once.
    ///
    /// Panics if admin has already been initialized previously.
    pub fn init_admin(env: Env, admin: Address) {
        if env.storage().instance().has(&ADMIN_KEY) {
            panic!("admin already initialized");
        }
        env.storage().instance().set(&ADMIN_KEY, &admin);
    }

    /// Allows execution only when `caller` matches the stored admin.
    ///
    /// This function represents the gate you would put in front of
    /// admin-only operations such as upgrades or treasury actions.
    pub fn protected_action(env: Env, caller: Address) {
        let admin: Address = env
            .storage()
            .instance()
            .get(&ADMIN_KEY)
            .expect("admin not initialized");
        if caller != admin {
            panic!("not admin");
        }
    }
}

#[cfg(test)]
mod test;
