#Deploying to Hoist

Hoist deploys when a git repository is pushed to your application's git URL.

##Setting up Remotes

Hoist deploys on `git push` so you will need to attach your git repo to a Hoist application. To do this, you’ll need to add a `remote` to specify when to push code to Hoist. 

In your git folder, run the command:
```git remote add hoist https://git.hoi.io/org-name/gitFolder.git```
You can find the org-name and gitFolder on the dashboard of your application before your first push, and again afterwards by hovering over the Git Status on your application’s dashboard.

If you need separate environments for development, staging and live, simply create separate apps in Hoist, and create separate remotes for each environment:

```javascript
var p = new Function();
git remote add hoist-dev https://git.hoi.io/org-name/gitFolder1.git
git remote add hoist-stage https://git.hoi.io/org-name/gitFolder2.git
git remote add hoist-live https://git.hoi.io/org-name/gitFolder3.git
```

When you make a change and want to deploy it to Hoist, make sure your changes are checked into the branch, and then run a git push to the remote:
```javascript
git add .
git commit -m "new changes"
git push hoist-dev master```

##Deploying with Cruise Control

```javascript
<exec>
  <executable>git</executable>
  <baseDirectory>C:\hoist\stage\exampleproject</baseDirectory>
  <buildArgs>add .</buildArgs>
      <buildTimeoutSeconds>600</buildTimeoutSeconds>
  <successExitCodes>1,0</successExitCodes>
</exec>

<exec>
  <executable>git</executable>
  <baseDirectory>C:\hoist\stage\exampleproject</baseDirectory>
  <buildArgs>commit -m "send to stage"</buildArgs>
      <buildTimeoutSeconds>600</buildTimeoutSeconds>
  <successExitCodes>1,0</successExitCodes>
</exec>

<exec>
  <executable>git</executable>
  <baseDirectory>C:\hoist\stage\exampleproject</baseDirectory>
  <buildArgs>push  exampleproject-stage master:master</buildArgs>
      <buildTimeoutSeconds>600</buildTimeoutSeconds>
  <successExitCodes>0</successExitCodes>
</exec>```
