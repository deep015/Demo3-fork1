### Well hello there!

This repository is meant to provide an example for *forking* a repository on GitHub.

Creating a *fork* is producing a personal copy of someone else's project. Forks act as a sort of bridge between the original repository and your personal copy. You can submit *Pull Requests* to help make other people's projects better by offering your changes up to the original project. Forking is at the core of social coding at GitHub.

After forking this repository, you can make some changes to the project, and submit [a Pull Request](https://github.com/octocat/Spoon-Knife/pulls) as practice.

For some more information on how to fork a repository, [check out our guide, "Forking Projects""](http://guides.github.com/overviews/forking/). Thanks! :sparkling_heart:


# 为存储库创建分支

创建存储库分支 GitHub ，以便提出更改、协作处理项目以及管理自己的代码库副本。

## 关于分叉

通过分叉存储库，可以建议对项目进行更改，而不会影响上游存储库。 请参阅“[关于分叉](/zh/pull-requests/get-started/about-forks)”。

## 先决条件

如果你尚未完成相关设置，请设置 Git 并完成与 GitHub.com 的身份验证。 请参阅“[设置 Git](/zh/get-started/git-basics/set-up-git)”。

## 派生存储库

<div class="ghd-tool webui">

你可能为了对上游存储库提议更改而创建项目分支。 在这种情况下，最好定期将分支与上游存储库同步。 为此，您需要在命令行上使用 Git。 可以使用刚才已创建分支的同一 [octocat/Spoon-Knife](https://github.com/octocat/Spoon-Knife) 存储库来练习设置上游存储库。

1. 在GitHub中，前往[octocat/Spoon-Knife](https://github.com/octocat/Spoon-Knife)仓库。
2. 在页面右上角，单击“分支”\*\*\*\*。

   ![存储库的主页的屏幕截图。 带有“Fork”图标和“Fork 59.3k”标签的按钮被深橙色框出。](/assets/images/help/repository/fork-button.png)
3. 在“所有者”下，选择下拉菜单，然后单击分支存储库的所有者。
4. 默认情况下，分支的名称与其上游存储库的名称相同。 （可选）在“存储库名称”字段中，键入不同的名称来区分分支。
5. （可选）在“描述”字段中键入分支的描述。
6. （可选）选中“仅复制默认分支”\*\*\*\*。

   对于许多分支场景（例如参与开源项目），你只需复制默认分支。 如果未选择此选项，所有分支都将复制到新分支中。
7. 单击“创建分支”\*\*\*\*。

> \[!NOTE]
> 如果要从上游存储库复制其他分支，可从“分支”页执行此操作\*\*\*\*。 请参阅“[管理存储库中的分支](/zh/pull-requests/how-tos/commit-changes/managing-branches-within-your-repository)”。

</div>

<div class="ghd-tool cli">

> \[!NOTE]
> 若要详细了解 GitHub CLI，请参阅“[关于 GitHub CLI](/zh/github-cli/github-cli/about-github-cli)”。

若要创建存储库的分支，请使用 `gh repo fork` 子命令。

```shell
gh repo fork REPOSITORY
```

若要在组织中创建分支，请使用 `--org` 标记。

```shell
gh repo fork REPOSITORY --org "octo-org"
```

</div>

<div class="ghd-tool desktop">

可以在 . 上 GitHub.com 或中 GitHub Desktop分叉存储库。 有关在 GitHub.com 上创建分支的信息，请参阅[本文的网页版](/zh/pull-requests/how-tos/work-with-forks/fork-a-repo?tool=webui)。

在 GitHub Desktop 中，如果你克隆了一个你没有写权限的仓库，然后尝试向该仓库推送更改，系统会为你创建一个派生。

1. 在“文件”菜单中，单击“克隆存储库” 。

   <div class="ghd-tool mac">

   ![Mac 上的菜单栏的屏幕截图。 “文件”下拉菜单已展开，“克隆存储库”选项以橙色边框突出显示。](/assets/images/help/desktop/clone-file-menu-mac.png)

   </div>

   <div class="ghd-tool windows">

   ![Windows 上的“GitHub Desktop”菜单栏的屏幕截图。 已展开“文件”下拉菜单，并以橙色框出了“克隆仓库”选项。](/assets/images/help/desktop/clone-file-menu-windows.png)

   </div>

2. 单击与要克隆的仓库位置对应的选项卡。 在此示例中，我们单击“URL”选项卡。

   ![“Clone a repository”窗口的“URL”选项卡的屏幕截图。 “GitHub.com”、“GitHub Enterprise”和“URL”选项卡以深橙色边框显示。](/assets/images/help/desktop/choose-repository-location-url-tab-windows.png)

3. 输入要克隆的仓库的 URL 或路径。

   ![“Clone a repository”窗口的“URL”选项卡的屏幕截图。 包含“octocat/Spoon-Knife”的输入以橙色轮廓突出显示。](/assets/images/help/desktop/clone-a-repository-url-tab-name-input.png)

4. 若要选择要将存储库克隆到其中的本地目录，请单击“本地路径”字段旁的“选择...”，然后导航到该目录。

   ![“Clone a repository”窗口的“URL”选项卡的屏幕截图。 标有“选择”的按钮用橙色边框突出显示。](/assets/images/help/desktop/clone-choose-button-url-windows.png)

5. 在“克隆存储库”窗口的底部，单击“克隆”。

6. 若要创建派生，请尝试将更改推送到仓库。 例如，创建新的分支并发布它。 将会出现一个提示，询问你是否要派生此仓库。

   ![“Create a fork prompt”窗口的屏幕截图。 标有“Fork this repository”的按钮用橙色边框突出显示。](/assets/images/help/desktop/create-fork-button-windows.png)

7. 阅读“你打算如何使用此分叉？”中的信息 窗口中的视图相同。
   * 如果计划使用此分支参与原始上游存储库，请单击“参与父项目”。
   * 如果计划将此分支用于未连接到上游的项目，请单击“用于我自己的目的”。

8. 单击 **“继续”** 。

</div>

<div class="ghd-tool webui">

## 克隆复刻的仓库

你现在有一个 Spoon-Knife 存储库分支，但计算机上没有该存储库中的文件。

1. 打开GitHub，导航到 Spoon-Knife 存储库的**分支**。

2. 在文件列表上方，单击“<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-code" aria-label="code" role="img"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path></svg> Code”\*\*\*\*。

   ![存储库登陆页面上的文件列表的屏幕截图。 “代码”按钮以深橙色轮廓突出显示。](/assets/images/help/repository/code-button.png)

3. 复制存储库的 URL。

   * 若要使用 HTTPS 克隆存储库，请在“HTTPS”下单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="copy icon" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。
   * 要使用 SSH 密钥克隆存储库，包括组织的 SSH 证书颁发机构颁发的证书，请单击“SSH”，然后单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="Copy to clipboard" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。
   * 要使用 GitHub CLI 克隆存储库，请单击“GitHub CLI”，然后单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="Copy to clipboard" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。

     ![“代码”下拉菜单的屏幕截图。 在存储库的 HTTPS URL 的右侧，复制图标以深橙色框出。](/assets/images/help/repository/https-url-clone-cli.png)

4. 打开终端或 Git Bash。

5. 将当前的工作目录更改为您想要存储克隆目录的位置。

6. 键入 `git clone`，然后粘贴之前复制的 URL。 看起来会像这样，用你的 GitHub 用户名代替 `YOUR-USERNAME`：

   ```shell
   git clone https://github.com/YOUR-USERNAME/Spoon-Knife
   ```

7. 按 **Enter**。 Git 会创建您的本地副本。

   ```shell
   $ git clone https://github.com/YOUR-USERNAME/Spoon-Knife
   > Cloning into `Spoon-Knife`...
   > remote: Counting objects: 10, done.
   > remote: Compressing objects: 100% (8/8), done.
   > remote: Total 10 (delta 1), reused 10 (delta 1)
   > Unpacking objects: 100% (10/10), done.
   ```

</div>

<div class="ghd-tool cli">

## 克隆复刻的仓库

你现在有一个 Spoon-Knife 存储库分支，但计算机上没有该存储库中的文件。

> \[!NOTE]
> 若要详细了解 GitHub CLI，请参阅“[关于 GitHub CLI](/zh/github-cli/github-cli/about-github-cli)”。

若要创建派生项目的克隆，请使用 `--clone` 参数。

```shell
gh repo fork REPOSITORY --clone=true
```

</div>

## 配置 Git 以将分支与上游存储库同步

当你将项目派生出来以便向上游仓库提出更改时，可以将 Git 配置为把上游仓库中的更改拉取到你所派生仓库的本地克隆中。

<div class="ghd-tool webui">

1. 在GitHub中，前往[octocat/Spoon-Knife](https://github.com/octocat/Spoon-Knife)仓库。

2. 在文件列表上方，单击“<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-code" aria-label="code" role="img"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path></svg> Code”\*\*\*\*。

   ![存储库登陆页面上的文件列表的屏幕截图。 “代码”按钮以深橙色轮廓突出显示。](/assets/images/help/repository/code-button.png)

3. 复制存储库的 URL。

   * 若要使用 HTTPS 克隆存储库，请在“HTTPS”下单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="copy icon" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。
   * 要使用 SSH 密钥克隆存储库，包括组织的 SSH 证书颁发机构颁发的证书，请单击“SSH”，然后单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="Copy to clipboard" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。
   * 要使用 GitHub CLI 克隆存储库，请单击“GitHub CLI”，然后单击 <svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-copy" aria-label="Copy to clipboard" role="img"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>。

     ![“代码”下拉菜单的屏幕截图。 在存储库的 HTTPS URL 的右侧，复制图标以深橙色框出。](/assets/images/help/repository/https-url-clone-cli.png)

4. 打开终端或 Git Bash。

5. 切换到你克隆的派生仓库所在的目录。
   * 若要转到主目录，请只键入 `cd`，不要键入其他文本。
   * 若要列出当前目录中的文件和文件夹，请键入 `ls`。
   * 若要进入列出的某个目录，请键入 `cd YOUR-LISTED-DIRECTORY`。
   * 若要回到上一个目录，请键入 `cd ..`。

6. 键入 `git remote -v` 并按 **Enter**。 你将看到当前为分支配置的远程存储库。

   ```shell
   $ git remote -v
   > origin  https://github.com/YOUR-USERNAME/YOUR-FORK.git (fetch)
   > origin  https://github.com/YOUR-USERNAME/YOUR-FORK.git (push)
   ```

7. 键入 `git remote add upstream`，然后粘贴在步骤 3 中复制的 URL，然后按 **Enter**。 它将如下所示：

   ```shell
   git remote add upstream https://github.com/ORIGINAL-OWNER/Spoon-Knife.git
   ```

8. 若要验证为分支指定的新上游存储库，请再次键入 `git remote -v` 。 你应会看到你的派生仓库的 URL 为 `origin`，上游仓库的 URL 为 `upstream`。

   ```shell
   $ git remote -v
   > origin    https://github.com/YOUR-USERNAME/YOUR-FORK.git (fetch)
   > origin    https://github.com/YOUR-USERNAME/YOUR-FORK.git (push)
   > upstream  https://github.com/ORIGINAL-OWNER/ORIGINAL-REPOSITORY.git (fetch)
   > upstream  https://github.com/ORIGINAL-OWNER/ORIGINAL-REPOSITORY.git (push)
   ```

现在，可以使用几个 Git 命令使分支与上游存储库保持同步。 请参阅“[同步分支](/zh/pull-requests/how-tos/work-with-forks/syncing-a-fork)”。

</div>

<div class="ghd-tool cli">

> \[!NOTE]
> 若要详细了解 GitHub CLI，请参阅“[关于 GitHub CLI](/zh/github-cli/github-cli/about-github-cli)”。

若要为分支存储库配置远程存储库，请使用 `--remote` 标志。

```shell
gh repo fork REPOSITORY --remote=true
```

若要指定远程存储库的名称，请使用 `--remote-name` 标志。

```shell
gh repo fork REPOSITORY --remote-name "main-remote-repo"
```

</div>

### 编辑分支

你可以对复刻进行任何更改，包括：

* 创建分支：**分支**支持在不影响主项目的情况下构建新功能或测试创意。
* **打开拉取请求：** 如果要向上游存储库贡献内容，可以提交拉取请求，要求原始作者将分支拉取到其存储库中。 请参阅“[从复刻创建拉取请求](/zh/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork)”。

## 另找一个仓库进行复刻

复刻仓库，开始参与项目。
可将任何公共存储库分叉到：

* 你的个人帐户
* 你有权在其中创建存储库的组织

如果你有权访问专用存储库，并且所有者允许分叉，则可以将存储库分叉到：

* 你的个人帐户
* 你有权在其中创建存储库的 GitHub Team 上的组织

不能使用 GitHub Free 将专用存储库分支创建到组织。 有关 GitHub Team 和 GitHub Free 的详细信息，请参阅“[GitHub的计划](/zh/get-started/learning-about-github/githubs-plans)”。

有关何时可以分叉存储库的详细信息，请参阅 [叉子](/zh/pull-requests/reference/forks)。

您可以浏览[“探索”GitHub](https://github.com/explore)来查找项目，并开始为开源代码库做贡献。 请参阅“[寻找在 GitHub 上参与开源的方法](/zh/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)”。

## 后续步骤

你现在已经复刻了仓库、练习了克隆复刻并配置了上游仓库。

* 有关在命令行上使用 Git 克隆和同步更改的详细信息，请参阅 [设置 Git](/zh/get-started/git-basics/set-up-git)。

* 还可以创建一个新存储库来存放项目，并在 GitHub 上分享代码。 为项目创建存储库后，可以将代码存储在 GitHub 中。 这提供了工作备份，你可以选择将其与其他开发人员共享。 有关详细信息，请参阅“[仓库快速入门](/zh/repositories/creating-and-managing-repositories/quickstart-for-repositories)”。

* 每个存储库 GitHub 都由个人或组织拥有。 您可以通过在 GitHub 上与这些人员、存储库和组织建立联系并关注它们来与之互动。 有关详细信息，请参阅“[发现GitHub上的项目](/zh/get-started/exploring-projects-on-github/discovering-projects-on-github)”。

* GitHub 有一个强大的支持社区，你可以在那里寻求帮助并与来自世界各地的人交谈。 加入 [GitHub Community](https://github.com/orgs/community/discussions) 上的对话。# Minimal settings to update dependencies stored in one private registry

version: 2
registries:
  dockerhub: # Define access for a private registry
    type: docker-registry
    url: registry.hub.docker.com
    username: octocat
    password: ${{secrets.DOCKERHUB_PASSWORD}}
updates:
  - package-ecosystem: "docker"
    directory: "/docker-registry/dockerhub"
    registries:
      - dockerhub # Allow version updates for dependencies in this registry
    schedule:
      interval: "monthly"
