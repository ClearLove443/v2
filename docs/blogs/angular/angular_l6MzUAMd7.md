---
title: "Angular Type 'boolean | null' is not assignable to type 'boolean'."
date: 2021-07-27 22:05:08
tag: [Angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

the async pipes return signature is something like `<T>(input$: Observable<T>: T | null` always, because it returns null to the template
while it's awaiting a response from an asynchronous call.

# you can do what you've done and allow null, or if you know it will never be null, use a non null assertion operator:

```javascript
[loaded] = "(loaded$ | async)!";
```

# or disable type checking here:

```javascript
[loaded] = "$any(loaded$ | async)";
```

# or for this particular case you could probably do something like this:

```javascript
[loaded] = "(loaded$ | async) || false";
```
