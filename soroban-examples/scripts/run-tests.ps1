$modules = @(
  "hello-soroban",
  "counter-storage",
  "auth-check",
  "events-demo",
  "simple-voting"
)

foreach ($module in $modules) {
  Write-Host "Running tests for $module..."
  Push-Location "$PSScriptRoot\..\$module"
  cargo test
  Pop-Location
}

Write-Host "All soroban-examples tests completed."
