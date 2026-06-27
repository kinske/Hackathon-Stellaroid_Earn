#!/usr/bin/env bash
set -euo pipefail

MODULES=(
  "hello-world"
  "rust-syntax"
  "variables-and-types"
  "conditionals-and-loops"
  "functions-and-errors"
  "state-storage"
  "events"
  "auth-and-admin"
  "maps-and-keys"
  "token-ledger-basics"
  "enums-and-matches"
  "structs-and-methods"
  "storage-ttl"
)

for module in "${MODULES[@]}"; do
  echo "Running tests for $module..."
  (cd "$(dirname "$0")/../$module" && cargo test)
done

echo "All learning module tests completed."
