#![cfg(test)]
extern crate std;

use soroban_sdk::{Env, String};
use super::EventsContract;

#[test]
fn emits_without_error() {
    let env = Env::default();
    let name = String::from_str(&env, "Stellar");
    EventsContract::emit_greeting(env, name);
}
