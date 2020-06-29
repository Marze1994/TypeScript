// let Add: (x: number, y: number) => number;

// interface Add {
//   (x: number, y: number): number;
// }

// 类型别名
type Add = (x: number, y: number) => number;

// let add: Add = (a, b) => a + b;

// 混合类型接口：既可以定义一个函数，也可以像对象一样拥有属性和方法
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

function getLib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}
