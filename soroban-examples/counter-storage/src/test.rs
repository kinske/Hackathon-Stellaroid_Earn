#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::CounterStorage;

#[test]
fn increment_changes_state() {
    let env = Env::default();
    assert_eq!(CounterStorage::increment(env.clone()), 1);
    assert_eq!(CounterStorage::increment(env), 2);
}
