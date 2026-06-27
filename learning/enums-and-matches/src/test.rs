#![cfg(test)]
extern crate std;

use super::EnumsMatchesContract;

#[test]
fn returns_active_code() {
    assert_eq!(EnumsMatchesContract::status_code(true), 1);
}

#[test]
fn returns_paused_code() {
    assert_eq!(EnumsMatchesContract::status_code(false), 0);
}
