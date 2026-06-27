#!/usr/bin/env bash
set -euo pipefail

MODULES=(
  "hello-soroban"
  "counter-storage"
  "auth-check"
  "events-demo"
  "simple-voting"
)

for module in "${MODULES[@]}"; do
  echo "Running tests for $module..."
  (cd "$(dirname "$0")/../$module" && cargo test)
done

echo "All soroban-examples tests completed."
