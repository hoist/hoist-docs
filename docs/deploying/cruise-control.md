#Deploying to Hoist

##Deploying with Cruise Control

```xml
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
