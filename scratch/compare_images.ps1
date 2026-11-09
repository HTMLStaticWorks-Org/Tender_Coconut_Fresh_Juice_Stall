$h1Content = Get-Content 'index.html' -Raw
$h2Content = Get-Content 'home-2.html' -Raw

$h1Matches = [regex]::Matches($h1Content, 'assets/images/[a-zA-Z0-9_\-\.]+') | ForEach-Object { $_.Value } | Select-Object -Unique
$h2Matches = [regex]::Matches($h2Content, 'assets/images/[a-zA-Z0-9_\-\.]+') | ForEach-Object { $_.Value } | Select-Object -Unique

Write-Output "--- IMAGES IN HOME 1 (index.html) ---"
$h1Matches | ForEach-Object { Write-Output "H1: $_" }

Write-Output "`n--- IMAGES IN HOME 2 (home-2.html) ---"
$h2Matches | ForEach-Object { Write-Output "H2: $_" }

Write-Output "`n--- REPEATING IMAGES IN BOTH HOME 1 AND HOME 2 ---"
$overlap = $h1Matches | Where-Object { $h2Matches -contains $_ }
$overlap | ForEach-Object { Write-Output "DUPLICATE: $_" }

