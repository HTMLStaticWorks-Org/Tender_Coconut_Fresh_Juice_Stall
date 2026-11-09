$htmlFiles = Get-ChildItem -Filter *.html
$missingAssets = 0
$totalRefs = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $pattern = '(?:src|href)="([^"]+)"'
    $matches = [regex]::Matches($content, $pattern)
    foreach ($m in $matches) {
        $path = $m.Groups[1].Value
        if ($path -match '^(http|#|mailto|tel|javascript:)') { continue }
        $cleanPath = $path.Split('?')[0].Split('#')[0]
        if (-not [string]::IsNullOrWhiteSpace($cleanPath)) {
            $totalRefs++
            if (-not (Test-Path $cleanPath)) {
                Write-Output "MISSING: $cleanPath in $($file.Name)"
                $missingAssets++
            }
        }
    }
}

Write-Output "Checked $totalRefs references across $($htmlFiles.Count) HTML files."
Write-Output "Missing assets: $missingAssets"

