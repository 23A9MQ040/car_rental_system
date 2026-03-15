# AP Car Rentals - Test Runner Script
# This script attempts to find a compatible JDK (17+) and run Maven tests.

$javaPaths = @(
    "C:\Program Files\Java\jdk-17\bin\java.exe",
    "C:\Program Files\Java\jdk-21\bin\java.exe",
    "$env:USERPROFILE\.antigravity\extensions\redhat.java-1.53.0-win32-x64\jre\bin\java.exe",
    "C:\Program Files\Common Files\Oracle\Java\javapath\java.exe"
)

$foundJava = $null
foreach ($path in $javaPaths) {
    if (Test-Path $path) {
        $version = & $path -version 2>&1 | Out-String
        if ($version -match "17" -or $version -match "21") {
            $foundJava = $path
            break
        }
    }
}

if ($foundJava) {
    Write-Host "Found compatible Java at: $foundJava" -ForegroundColor Green
    $env:JAVA_HOME = Split-Path (Split-Path $foundJava -Parent) -Parent
    $env:Path = "$(Split-Path $foundJava -Parent);$env:Path"
    mvn test
} else {
    Write-Host "No compatible JDK (17+) found automatically." -ForegroundColor Yellow
    Write-Host "Attempting build with system default..."
    mvn test
}
