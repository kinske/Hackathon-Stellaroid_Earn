#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::VariablesContract;

#[test]
fn builds_expected_vector() {
    let env = Env::default();
    let result = VariablesContract::make_vector(env);
    assert_eq!(result.len(), 2);
    assert_eq!(result.get(0).unwrap(), 10);
    assert_eq!(result.get(1).unwrap(), 15);
}
