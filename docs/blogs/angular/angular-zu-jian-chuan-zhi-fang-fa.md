---
title: "Angular组件传值方法"
date: 2021-04-29 18:57:06
tag: [angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

# 一.组件之间传值的方法

## 1.父子组件之间的传值方法

### 1.1 @InInput 和@Output 方法

```javascript
·子组件 component.ts
export class testExample implements OnInit{
	@Input test:any = {};
	@Output testFun = new EventEmitter<any>();
}


父组件模版引用子组件
<test-example [test]="test" (testFun)="testFun($event)"></test-example>
```

@Input 修饰的变量为父组件传入子组件的输入属性. @Outpue 修饰的子组件传入父组件的输出属性.

### 1.2 inputs 和 outputs

```javascript
子组件 component.ts
@Component({
     //...
    inputs:['test'],
    outputs:['testFun']
})

 父组件模版引用子组件
export class testExample implements OnInit{
    test:any = {};
    testFun = new 	EventEmitter<any>();
}
```

### 1.3 @ViewChild,父组件获取子组件的引用

```javascript
import { Component, AfterViewInit, ViewChild } from "@angular/core";
@Component({
  selector: "collection",
  template: `
    <contact-collect (click)="collectTheContact()"></contact-collect>
  `,
})
export class CollectionComponent {
  @ViewChild(ContactCollectComponent) contactCollect: ContactCollectComponent;
  ngAfterViewInit() {
    //...
  }

  collectTheContact() {
    this.contactCollect.collectTheContact();
  }
}
```

ViewChild 是属性装饰器,用来从模板视图中获取匹配的元素.视图查询在 ngAfterViewInit 钩子函数调用前完成,因此在 ngAfterViewInit 钩子函数中,就能正常获取查询的元素.
ViewChildren 装饰器用来从模板中获取匹配的多个元素,返回的结果是一个 QueryList 集合, 使用模板变量名设置查询条件

### 1.4 局部变量，父组件获取子组件引用

```javascript
template:`
        <contact-collect (click)="collectTheContact()" #collect></contact-collect>
```

绑定局部变量 collect(以#号标记),以此来获取子组件类的实例对象.

## 2.非父子组件之间传值

### 2.1 service

需要双向的触发(发送信息/接收信息)

```javascript
service.ts
import { Component, Injectable, EventEmitter } from "@angular/core";
@Injectable()
export class myService {
  public info: string = "";
  constructor() {}
}
```

组件 1 向 service 传递信息

```javascript
import { myService } from '../../service/myService.service';
...
constructor(
  public service: myService
) { }

changeInfo() {
  this.service.info = this.service.info + "1234";
}
...
```

组件 2 从 service 获取信息

```javascript
import { myService } from '../../service/myService.service';
...
constructor(
  public service: myService
) { }

showInfo() {
  alert(this.service.info);
}
...
```

### 2.2 使用 BehaviorSubject

发布者订阅者模式,当数据改变时,订阅者也能得到响应
service

```javascript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class PcServiceService {
    constructor() { }
    // 创建Subject实例
    emitChangeSource = new Subject<any>();
    // 创建Observable
    changeEmitted$ = this.emitChangeSource.asObservable();
    // 调用该方法发布消息
    emitChange(change: any): void {
        this.emitChangeSource.next(change);
    }
}
```

组件调用 service 的方法传信息和接收信息

```javascript
constructor(public service: PcServiceService) {
}
changeValue(): void {
  // 调用服务发布消息
  this.service.emitChange(this.user);
}

form!: any;
constructor(public service: PcServiceService) {
    // 订阅消息
    service.emitChangeSource.subscribe(text => {
      this.form = text;
    });
}
```

### 2.3 路由传值

#### 2.3.1 在查询参数中传递

```javascript
//传递数据
...
<a [routerLink]="['/stock']" [queryParams]="{id: 1}">股票详情</a>
// http://localhost:4200/stock?id=1

//接受参数
...
import { ActivatedRoute } from '@amgular/router';
export class StockComponent implements OnInit {
    private stockId: number;
    constructor(private routeInfo: ActivatedRoute)
    ngOnInit() {
        this.stockId = this.routeInfo.snapshot.queryParams['id'];
    }
}
```

#### 2.3.2 在路由路径中传递

```javascript
//修改配置
const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'stock/:id', component: StocksComponent },
  {path: '**', component: ErrorPageComponent }
];

//传递数据
...[
](url)<a [routerLink]="['/stock', 1]">股票详情</a>
// http://localhost:4200/stock/1

this.router.navigate(['/stock', 1], { queryParams: { productId: '1', title: 'moon' } });

//接受参数
...
import { ActivatedRoute } from '@amgular/router';
export class StockComponent implements OnInit {
    private stockId: number;
    constructor(private routeInfo: ActivatedRoute)
    ngOnInit() {
        this.stockId = this.routeInfo.snapshot.params['id'];
        this.productId = this.routeInfo.snapshot.queryParams['productId'];
    }
}
```

#### 2.3.3 在路由配置中传递

```javascript
//路由配置配置
const routes: Routes = [
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "index", component: IndexComponent, data: { title: "Index Page" } },
  {
    path: "stock/:id",
    component: StocksComponent,
    data: { title: "Stock Page" },
  },
  { path: "**", component: ErrorPageComponent, data: { title: "Stock Page" } },
];

//接受参数
this.title = this.routeInfo.snapshot.date[0]["title"];
```

# 二.其它传值方式

cookie、session、storage
