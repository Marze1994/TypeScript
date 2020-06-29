// 枚举：一组有名字的常量集合，目前 TypeScript 只支持数字的和基于字符串的枚举
// 数字枚举（Numeric enums）
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Reporter);

// 字符串枚举（String enums）
enum Message {
  Success = "恭喜你，成功了",
  Fail = "抱歉，失败了",
}

// 异构枚举（Heterogeneous enums）：并不推荐
enum Answer {
  No = 0,
  Yes = "YES",
}
// 枚举成员的值是只读类型，不能被修改

// 枚举成员的类型分为两类：
// 一、常量枚举成员（constant member），包括三种情况：1）没有初始值的情况；2）对已有枚举成员的引用；3）一些常量的表达式
// 常量枚举成员会在编译时计算出结果，然后已常量的形式出现在运行时环境
// 二、计算枚举成员（computed member），一些非常量的表达式，这些枚举成员的值不会在编译时进行计算，而会被保留在程序的执行阶段，也就是在运行时计算结果

// 常量枚举（通过在枚举上使用 const 修饰符来定义）：
// 不同于常规的枚举，它们在编译时会被删除（编译后没有任何代码），常量枚举成员在使用的地方会被内联进来。之所以可以这么做是因为，常量枚举不允许包含计算成员，只能使用常量枚举表达式
// 作用：当我们不需要一个对象，而需要一个对象的值的时候，就可以使用常量枚举，这样就可以减少我们在编译时的代码
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
];
// 生成后的代码为：
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 枚举类型：在一些情况下，枚举和枚举成员都可以作为一种单独的类型存在
enum E {
  a,
  b,
}
enum F {
  a = 0,
  b = 1,
}
enum G {
  a = "apple",
  b = "banana",
}

let e: E = 3;
let f: F = 3;
// e === f // Error! 两种不同类型的枚举是不能比较的

let e1: E.a;
let e2: E.b;
let e3: E.a;

// 字符串枚举的取值只能是枚举成员的类型
let g1: G; // g1 只能取值为 G.a 或 G.b
let g2: G.a; // g2 只能取值为 G.a
