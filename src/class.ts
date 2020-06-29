// ### 类
class Dog {
  name: string;
  constructor(msg: string) {
    this.name = msg;
  }
  // 构造函数如果被 protected 修饰后，不能实例化，只能被继承。
  // 如果被 private 修饰的话，既不能实例化，也不能被继承。
  run() {
    console.log("Dog running...");
    console.log(Dog.food);
    console.log(Dog.eatFood());
  }
  public eyes: number = 2; // 公有成员：所有人可见（默认）。
  private eat() {} // 私有成员：只能被类的本身调用，不能被类的实例调用，也不能被子类调用。
  protected drink() {} // 受保护成员：只能在类的本身和子类中调用。
  readonly legs: number = 4; // 只读成员：只读成员（只包括属性）必须在声明时或在构造函数里被初始化。
  static food: string = "bones"; // 静态成员：静态成员（包括属性和方法）存在于类本身上面而不是类的实例或原型上，只能在类的本身和子类中通过类的名字的方式（Dog.）调用，不能被实例调用。
  static eatFood() {
    return "eat food";
  }
}
// 无论在 es 还是 ts 中，类的成员属性都是实例属性！类的成员方法都是原型方法！
console.log(Dog.prototype); // 查看类的原型
let dog = new Dog("wangwang");
console.log(dog); // 查看类的实例

// ### 继承
// 这里的 H 是派生类（derived class），通常被称作子类。
class H extends Dog {
  // 子类如果包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。
  // 而且，在构造函数里访问 this 的属性之前，我们一定要先调用 super()。 这个是 TypeScript 强制执行的一条重要规则。
  constructor(name: string) {
    super(name);
  }
  // 下面代码演示了如何在子类里重写父类的方法（重写的意义：根据不同的类从而具有不同的功能）
  run() {
    console.log("H running...");
    console.log(Dog.food, H.food);
    console.log(Dog.eatFood(), H.eatFood());
    super.run();
  }
}
let h = new H("xixi");
h.run();

// ### 参数属性
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
// 在上面的例子中，我们必须在 Octopus 类里定义一个只读成员 name 和一个参数为 theName 的构造函数，这样显得有点麻烦。
// 参数属性可以方便地让我们在一个地方（构造函数）定义并初始化一个成员。下面是修改版：
class Octopus1 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
  // 可以在类里面用 this.name 访问
}
// 注意看我们是如何舍弃了 theName，仅在构造函数里使用 readonly name: string 参数来创建和初始化 name 成员。我们把声明和赋值合并至一处。
// 参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 private 限定一个参数属性会声明并初始化一个私有成员；对于 public 和 protected 来说也是一样。

// ### 抽象类：只能被继承不能被实例化
// 优点：抽离出一些事物的共性，有利于代码的复用和扩展。另外，抽象类可以实现多态。
// 所谓多态，就是我们在父类中我们定义一个抽象方法，在多个子类中对这个方法都有各自不同的实现，
// 在程序运行的时候会根据不同的对象运行不同的操作，这样就实现了运行时的绑定。
abstract class Animal {
  // 抽象方法：不包含具体实现并且必须在子类中实现，抽象方法必须包含 abstract 关键字并且可以包含访问修饰符。
  abstract sleep(): void;
}
// let pig = new Animal() // Error! 不能被实例化。
class Cat extends Animal {
  sleep(): void {
    console.log("Cat sleep");
  }
}
let cat_a = new Cat();

class Snake extends Animal {
  sleep(): void {
    console.log("Snake sleep");
  }
}
let snake_a = new Snake();

let animals: Animal[] = [cat_a, snake_a];
animals.forEach((i) => {
  i.sleep();
});
