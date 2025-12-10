# Script to merge all feature branches into main
# Usage: .\merge-all-branches.ps1

Write-Host "Starting merge process..." -ForegroundColor Green

# Save current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "You have uncommitted changes. Please commit or stash them first." -ForegroundColor Red
    Write-Host "Uncommitted files:" -ForegroundColor Red
    git status --short
    exit 1
}

# List of branches to merge
$branches = @(
    "berita-dan-pengumuman",
    "feature/galeri",
    "feature/paroki",
    "feature/ui-improvements",
    "page-sakramen"
)

# Switch to main branch
Write-Host "`nSwitching to main branch..." -ForegroundColor Cyan
git checkout main

# Pull latest changes from remote main
Write-Host "Pulling latest changes from origin/main..." -ForegroundColor Cyan
git pull origin main

# Merge each branch
foreach ($branch in $branches) {
    Write-Host "`n========================================" -ForegroundColor Magenta
    Write-Host "Merging branch: $branch" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Magenta
    
    git merge $branch --no-ff -m "Merge branch '$branch' into main"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Merge conflict detected in branch: $branch" -ForegroundColor Red
        Write-Host "Please resolve conflicts manually, then run:" -ForegroundColor Yellow
        Write-Host "  git add ." -ForegroundColor Yellow
        Write-Host "  git commit" -ForegroundColor Yellow
        Write-Host "  .\merge-all-branches.ps1" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "Successfully merged $branch" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "All branches merged successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Ask if user wants to push to remote
Write-Host "`nDo you want to push to origin/main? (y/n): " -ForegroundColor Yellow -NoNewline
$push = Read-Host

if ($push -eq 'y' -or $push -eq 'Y') {
    Write-Host "Pushing to origin/main..." -ForegroundColor Cyan
    git push origin main
    Write-Host "Pushed to origin/main successfully!" -ForegroundColor Green
} else {
    Write-Host "Skipping push. You can push manually later with: git push origin main" -ForegroundColor Yellow
}

Write-Host "`nMerge process completed!" -ForegroundColor Green
