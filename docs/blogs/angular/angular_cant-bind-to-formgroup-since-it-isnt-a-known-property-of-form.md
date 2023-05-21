---
title: Can't bind to 'formGroup' since it isn't a known property of 'form'
date: "2021-10-09 22:29:44"
tag: [angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

To fix this error, you just need to import `ReactiveFormsModule` from `@angular/forms` in your module. Here's the example of a basic module with `ReactiveFormsModule` import:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

To explain further, `formGroup` is a selector for directive named `FormGroupDirective` that is a part of `ReactiveFormsModule`, hence the need to import it. It is used to bind an existing `FormGroup` to a DOM element. You can read more about it on [Angular's official docs page](https://angular.io/docs/ts/latest/api/forms/index/FormGroupDirective-directive.html).
