$c = Get-Content 'blog.html' -Raw
$m = [regex]::Matches($c, 'assets/images/[a-zA-Z0-9_\-\.]+')
$m | ForEach-Object { $_.Value }

