#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::StateStorageContract;

#[test]
fn increments_and_reads_state() {
    let env = Env::default();
    assert_eq!(StateStorageContract::get_count(env.clone()), 0);
    assert_eq!(StateStorageContract::increment(env.clone()), 1);
    assert_eq!(StateStorageContract::increment(env.clone()), 2);
    assert_eq!(StateStorageContract::get_count(env), 2);
}
