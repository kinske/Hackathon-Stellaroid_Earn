#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::AuthAdminContract;

#[test]
fn allows_admin_caller() {
    let env = Env::default();
    let admin = env.accounts().generate();
    AuthAdminContract::init_admin(env.clone(), admin.clone());
    AuthAdminContract::protected_action(env, admin);
}
