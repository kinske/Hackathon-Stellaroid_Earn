#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::StorageTtlContract;

#[test]
fn sets_and_gets_temporary_value() {
    let env = Env::default();
    assert_eq!(StorageTtlContract::get_value(env.clone()), 0);
    StorageTtlContract::set_value(env.clone(), 88);
    assert_eq!(StorageTtlContract::get_value(env), 88);
}
