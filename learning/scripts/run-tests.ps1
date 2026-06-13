$modules = @(
  "hello-world",
  "rust-syntax",
  "variables-and-types",
  "conditionals-and-loops",
  "functions-and-errors",
  "state-storage",
  "events",
  "auth-and-admin",
  "maps-and-keys",
  "token-ledger-basics",
  "enums-and-matches",
  "structs-and-methods",
  "storage-ttl"
)

foreach ($module in $modules) {
  Write-Host "Running tests for $module..."
  Push-Location "$PSScriptRoot\..\$module"
  cargo test
  Pop-Location
}

Write-Host "All learning module tests completed."
