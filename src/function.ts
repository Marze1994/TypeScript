// 函数定义：ts 里面一共有四种定义方式，分别为以下 add1 到 add4
function add1(x: number, y: number) {
  return x + y;
}
let add2: (x: number, y: number) => number;
type add3 = (x: number, y: number) => number;
interface add4 {
  (x: number, y: number): number;
}

// 可选参数和默认参数
// 注意点：可选参数必须跟在必须参数后面（默认参数没这限制）
// 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。
// 也就是说可选参数与末尾的默认参数共享参数类型。
function add5(x: number, y?: number) {
  return y ? x + y : x;
}
add5(1);

function add6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q;
}
console.log(add6(1, undefined, 3));

function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
console.log(add7(1, 2, 3, 4, 5));

// 函数重载（处理根据传入参数的不同返回不同的类型）
// 为了让编译器能够选择正确的检查类型，它与 JavaScript 里的处理流程相似。
// 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
// 注意，function add8(...rest: any[]): any 并不是重载列表的一部分，因此这里只有两个重载
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === "string") {
    return rest.join("");
  }
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
}
console.log(add8(1, 2, 3));
console.log(add8("a", "b", "c"));
