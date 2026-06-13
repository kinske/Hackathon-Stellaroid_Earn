#![cfg(test)]
extern crate std;

use soroban_sdk::Env;
use super::SimpleVoting;

#[test]
fn records_votes() {
    let env = Env::default();
    assert_eq!(SimpleVoting::vote_yes(env.clone()), 1);
    assert_eq!(SimpleVoting::vote_yes(env.clone()), 2);
    assert_eq!(SimpleVoting::vote_no(env), 1);
}
