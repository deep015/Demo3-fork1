# LAB EX30: Fork + branch + PR to the original repository

Upstream: https://github.com/octocat/Spoon-Knife
Fork: https://github.com/JoanathanPS/Spoon-Knife (already forked for EX14/15)
PR opened to upstream: https://github.com/octocat/Spoon-Knife/pull/41085

## Steps
```powershell
# 1. Fork already exists from EX14: JoanathanPS/Spoon-Knife
git clone https://github.com/JoanathanPS/Spoon-Knife.git
cd Spoon-Knife
git checkout main
git pull origin main

# 2. New branch for the feature
git checkout -b exp30-feature

# 3. Implement changes -- edited the greeting text in index.html
git add index.html
git commit -m "EX30: update greeting for fork -> branch -> PR workflow"

# 4. Push to MY fork
git push -u origin exp30-feature

# 5. Open a PR from my fork's branch to the ORIGINAL repo's main branch
#    (head: JoanathanPS:exp30-feature -> base: octocat/Spoon-Knife:main)
```
Opened via GitHub's "Compare & pull request" (cross-fork), title
*"LAB EX30: fork + branch + PR workflow (JoanathanPS)"*.

Note: `octocat/Spoon-Knife` is GitHub's own official demo repo, built
specifically for people to practice exactly this fork -> branch -> PR flow
(that's the whole point of the "Fork me!" octocat), so opening a real PR
against it is expected and safe -- it won't be merged into anything that
matters, and the maintainers are used to closing these practice PRs.

## Screenshots to save here (1.png ... 5.png, max 5)
1. `git push -u origin exp30-feature` output.
2. GitHub "Compare & pull request" banner on the fork, cross-repo compare view.
3. The created PR page on `octocat/Spoon-Knife` (#41085) showing base/head repos.
4. Files changed tab showing the index.html diff.
5. (optional) PR conversation tab / any automated checks.
