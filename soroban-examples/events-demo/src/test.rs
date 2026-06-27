#![cfg(test)]
extern crate std;

use soroban_sdk::{Env, String};
use super::EventsDemo;

#[test]
fn emits_event_without_panic() {
    let env = Env::default();
    EventsDemo::emit_note(env.clone(), String::from_str(&env, "hello event"));
}
