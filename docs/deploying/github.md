#Deploying to Hoist

##Git
Github has great instructions on how to get up and running with Git, including their own GUIs. [https://help.github.com/articles/set-up-git/](https://help.github.com/articles/set-up-git/). If you're new to Git, this is a great place to start.

If you're using a Mac and have more experience, [Homebrew](http://brew.sh/) is a great way to install applications. Simply copy and paste this:

```javascript
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

into your terminal and follow the prompts. When that's done, `brew install git` will take you throught the process of installing Git. 

##Setting up Remotes

Hoist deploys on `git push` so you will need to attach your git repo to a Hoist application. To do this, you’ll need to add a `remote` to specify when to push code to Hoist. 

In your git folder, run the command:
```git remote add hoist https://git.hoi.io/org-name/gitFolder.git```
You can find the org-name and gitFolder on the dashboard of your application before your first push, and again afterwards by hovering over the Git Status on your application’s dashboard.

If you need separate environments for development, staging and live, simply create separate apps in Hoist, and create separate remotes for each environment:

```bash
git remote add hoist-dev https://git.hoi.io/org-name/gitFolder1.git
git remote add hoist-stage https://git.hoi.io/org-name/gitFolder2.git
git remote add hoist-live https://git.hoi.io/org-name/gitFolder3.git
```

When you make a change and want to deploy it to Hoist, make sure your changes are checked into the branch, and then run a git push to the remote:
```bash
git add .
git commit -m "new changes"
git push hoist-dev master```

