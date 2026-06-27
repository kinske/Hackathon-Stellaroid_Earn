#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::MapsKeysContract;

#[test]
fn registers_and_lists_scores() {
    let env = Env::default();
    let user = env.accounts().generate();
    MapsKeysContract::register(env.clone(), user, 42);
    let values = MapsKeysContract::list_scores(env);
    assert_eq!(values.len(), 1);
    assert_eq!(values.get(0).unwrap(), 42);
}
