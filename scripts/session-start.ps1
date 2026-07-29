# Hook SessionStart (Docs/05): snapshot + detekcja Pinegrow
# 1. Ostrzega, jesli Pinegrow jest otwarty (zasada wylacznosci PG <-> Claude)
# 2. Robi commit-snapshot stanu przed sesja Claude (ratunek = git checkout)
# Skrypt nigdy nie przerywa startu sesji - wszystkie bledy sa polykane.

try {
    $pg = Get-Process -Name 'Pinegrow' -ErrorAction SilentlyContinue
    if ($pg) {
        Write-Output "UWAGA: Pinegrow jest OTWARTY. Popros uzytkownika o 'Save All' w Pinegrow przed edycja plikow i przypominaj o 'Reload project' po zmianach."
    }

    $root = Join-Path $PSScriptRoot '..'
    if (Test-Path (Join-Path $root '.git')) {
        Push-Location $root
        $status = git status --porcelain 2>$null
        if ($status) {
            git add -A 2>$null
            # -c ... : tozsamosc awaryjna, gdyby git nie mial ustawionego user.name/email
            git -c user.name="Claude snapshot" -c user.email="team@waybetter.pl" commit -m "snapshot: stan przed sesja Claude" --quiet 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Output "Snapshot git wykonany (stan przed sesja Claude)."
            }
        }
        Pop-Location
    }
} catch {
    # cisza - hook nie moze psuc startu sesji
}
