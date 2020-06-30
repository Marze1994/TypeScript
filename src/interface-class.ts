// ### 接口与类
interface Human {
  name: string;
  eat(): void;
}

class Asian implements Human {
  constructor(name: string) {}
  // 接口只能约束类的公有成员，接口不能约束类的构造函数。
  // private name: string; // Error!
  name: string;
  eat() {}
}

// ### 接口的继承
// 接口继承接口
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 接口可以继承多个接口
interface PenStroke {
  penWidth: number;
}
interface Square1 extends Shape, PenStroke {
  sideLength: number;
}
let square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;

// 接口继承类
class Auto {
  state = 1;
  protected b = "b";
}
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 接口同样会继承到类的 private 和 protected 成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
interface AutoInterface extends Auto {}

// class C implements AutoInterface {
//   state = 1;
//   protected b = "bb"; // Error! C 不是 Auto 的派生类。
// }

class D extends Auto implements AutoInterface {
  // state = 2; // 因为是子类，所以已经继承了 state 属性。
}

// *** 接口能继承类，反过来类能实现接口！ ***
