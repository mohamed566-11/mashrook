# ===== Load the publish profile =====
$publishSettingsPath = "publishSettings.publishSettings"
$publishProfile = [xml](Get-Content $publishSettingsPath)

$publishUrl   = $publishProfile.publishData.publishProfile.publishUrl
$siteName     = $publishProfile.publishData.publishProfile.msdeploySite
$userName     = $publishProfile.publishData.publishProfile.userName
$password     = $publishProfile.publishData.publishProfile.userPWD

# ===== Build and publish files locally =====
Write-Host "Building project..." -ForegroundColor Green
dotnet publish -c Release -o publish

$appPath = (Resolve-Path "./publish").Path

# ===== Deploy using WebDeploy =====
Write-Host "Deploying to server..." -ForegroundColor Green

& "C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy.exe" `
  -source:contentPath="$appPath" `
  -dest:contentPath="$siteName",computerName="https://$publishUrl/msdeploy.axd?site=$siteName",userName="$userName",password="$password",authType="Basic" `
  -verb:sync `
  -allowUntrusted `
  -enableRule:DoNotDeleteRule

Write-Host "Deployment Completed Successfully!" -ForegroundColor Cyan
