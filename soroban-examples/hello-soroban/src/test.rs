#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::HelloSoroban;

#[test]
fn greet_returns_message() {
    let env = Env::default();
    let msg = HelloSoroban::greet(env);
    assert_eq!(msg.to_string(), "Hello from Soroban examples!");
}
