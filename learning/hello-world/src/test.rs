#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::HelloWorldContract;

#[test]
fn returns_hello_message() {
    let env = Env::default();
    let output = HelloWorldContract::hello(env);
    assert_eq!(output.to_string(), "Hello, Soroban!");
}
