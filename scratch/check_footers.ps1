Get-ChildItem -Path . -Filter *.html | ForEach-Object {
    $file = $_.Name
    $content = Get-Content $_.FullName -Raw
    $pos = $content.IndexOf('id="site-footer-mount"')
    if ($pos -gt 0) {
        $start = [Math]::Max(0, $pos - 1200)
        $len = $pos - $start
        $snippet = $content.Substring($start, $len)
        Write-Output "=== FILE: $file ==="
        $lines = ($snippet -split "`r?`n") | Select-Object -Last 15
        Write-Output ($lines -join "`n")
    }
}

