# Update sidebars to add lifecycle-events and form-object links

$basePath = "c:\laragon\www\Belajar_livewire\Materi Laravel Livewire\materi"

# All HTML files
$files = Get-ChildItem -Path $basePath -Recurse -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false

    # Skip if already has lifecycle-events link
    if ($content -notmatch 'lifecycle-events\.html') {
        # Determine prefix based on folder
        $folder = $file.Directory.Name
        
        if ($folder -eq "minggu-2") {
            $lifecycleLink = '                    <li><a href="lifecycle-events.html">🔄 Lifecycle & Events</a></li>'
        } elseif ($folder -eq "minggu-1") {
            $lifecycleLink = '                    <li><a href="../minggu-2/lifecycle-events.html">🔄 Lifecycle & Events</a></li>'
        } elseif ($folder -eq "minggu-3") {
            $lifecycleLink = '                    <li><a href="../minggu-2/lifecycle-events.html">🔄 Lifecycle & Events</a></li>'
        }

        # Insert after autentikasi line
        $content = $content -replace '(Autentikasi</a></li>)\r?\n', "`$1`r`n$lifecycleLink`r`n"
        $modified = $true
    }

    # Skip if already has form-object link
    if ($content -notmatch 'form-object\.html') {
        $folder = $file.Directory.Name
        
        if ($folder -eq "minggu-3") {
            $formLink = '                    <li><a href="form-object.html">📋 Form Objects</a></li>'
        } elseif ($folder -eq "minggu-1" -or $folder -eq "minggu-2") {
            $formLink = '                    <li><a href="../minggu-3/form-object.html">📋 Form Objects</a></li>'
        }

        # Insert before project-elibrary line
        $content = $content -replace '(<li><a href="[^"]*project-elibrary\.html")', "$formLink`r`n                    `$1"
        $modified = $true
    }

    if ($modified) {
        Set-Content $file.FullName $content -NoNewline -Encoding UTF8
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Done!"
