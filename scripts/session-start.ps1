# Hook SessionStart (Docs/05): snapshot + detekcja Pinegrow
# 1. Ostrzega, jesli Pinegrow jest otwarty (zasada wylacznosci PG <-> Claude)
# 2. Robi commit-snapshot stanu przed sesja Claude (ratunek = git checkout)

$pg = Get-Process -Name 'Pinegrow' -ErrorAction SilentlyContinue
if ($pg) {
    Write-Output "UWAGA: Pinegrow jest OTWARTY. Popros uzytkownika o 'Save All' w Pinegrow przed edycja plikow i przypominaj o 'Reload project' po zmianach."
}

if (Test-Path (Join-Path $PSScriptRoot '..\.git')) {
    Push-Location (Join-Path $PSScriptRoot '..')
    $status = git status --porcelain
    if ($status) {
        git add -A 2>$null
        git commit -m "snapshot: stan przed sesja Claude" --quiet 2>$null
        Write-Output "Snapshot git wykonany (stan przed sesja Claude)."
    }
    Pop-Location
}
