---
title: "angular 路由守卫"
date: "2021-10-04 17:57:40"
tag: [JavaScript]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

angular 防止未经授权的访问

使用路由守卫来防止用户未经授权就导航到应用的某些部分。Angular 中提供了以下路由守卫：

- CanActivate
- CanActivateChild
- CanDeactivate
- Resolve
- CanLoad

创建一项服务 router-guard.service.ts：

```typescript
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

/**
 * RouterGuardService
 *
 * @export
 * @class RouterGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: "root",
})
export class RouterGuardService implements CanActivate {
  constructor(private router: Router) {}

  /**
   * canActivate
   *
   * @param {ActivatedRouteSnapshot} _route
   * @param {RouterStateSnapshot} _state
   * @returns {boolean}
   * @memberof RouterGuardService
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    alert(_state.url);
    const token = localStorage.getItem("token");
    alert("token" + token);
    if (!token) {
      this.router.navigateByUrl("/account/login");
      return false;
    }
    return true;
  }
}
```

在路由模块(app-routing.module.ts)中，在 routes 配置中使用相应的属性。这里的 canActivate 会告诉路由器它要协调到这个特定路由的导航。

```typescript
import { DashboardLayoutsComponent } from "src/shared/layouts/dashboard-layouts.component";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RouterGuardService } from "./services/router-guard.service";

const routes: Routes = [
  {
    path: "account",
    loadChildren: () =>
      import("../business/pages/account/account.module").then(
        (m) => m.AccountModule
      ),
  },
  {
    path: "",
    component: DashboardLayoutsComponent,
    canActivate: [RouterGuardService],
    children: [
      { path: "", redirectTo: "system/home", pathMatch: "full" },
      {
        path: "examples",
        loadChildren: () =>
          import("../business/pages/examples/examples.module").then(
            (m) => m.ExamplesModule
          ),
      },
      {
        path: "system",
        loadChildren: () =>
          import("../business/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "exception",
        loadChildren: () =>
          import("./pages/exception/exception.module").then(
            (m) => m.ExceptionModule
          ),
      },
    ],
  },
  // Exception
  { path: "**", redirectTo: "exception/404" },
];

/**
 * AppRoutingModule
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```
