$htmlFiles = Get-ChildItem -Filter *.html
$usage = @{}

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $matches = [regex]::Matches($content, 'assets/images/[a-zA-Z0-9_\-\.]+')
    foreach ($m in $matches) {
        $img = $m.Value
        if ($img -eq 'assets/images/favicon.svg') { continue }
        if (-not $usage.ContainsKey($img)) { $usage[$img] = @() }
        $usage[$img] += $file.Name
    }
}

foreach ($k in ($usage.Keys | Sort-Object)) {
    $pages = ($usage[$k] | Group-Object | ForEach-Object { "$($_.Name) ($($_.Count)x)" }) -join ", "
    Write-Output "$k => $pages"
}

