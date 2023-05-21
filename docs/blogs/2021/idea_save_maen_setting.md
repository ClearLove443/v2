---
title: "intellij idea修改maven配置 总是恢复默认配置 的解决方法"
date: 2021-08-09 08:34:00
tag: [maven, idea]
category: setting
published: true
hideInList: false
feature:
isTop: false
---

用 everything 搜索 project.default.xml
修改为下面的设置

```xml
<application>
  <component name="ProjectManager">
    <defaultProject>
      <component name="ProjectViewState">
        <option name="autoscrollFromSource" value="true" />
        <option name="hideEmptyMiddlePackages" value="true" />
        <option name="showLibraryContents" value="true" />
      </component>
      <component name="PropertiesComponent">
        <property name="settings.editor.selected.configurable" value="MTHome" />
      </component>
    </defaultProject>
  </component>
</application>
```
