// 类
class Dog {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  // 构造函数如果被 protected 修饰后，不能实例化，只能被继承。
  // 如果被 private 修饰的话，既不能实例化，也不能被继承。
  run() {
    console.log("running");
    console.log("Dog.food >> ", Dog.food);
  }
  public eyes: number = 2; // 公有成员：所有人可见（默认）。
  private eat() {} // 私有成员：只能被类的本身调用，不能被类的实例调用，也不能被子类调用。
  protected drink() {} // 受保护成员：只能在类的本身和子类中调用。
  readonly legs: number = 4; // 只读成员（只读成员必须在声明时或在构造函数里被初始化）。
  static food: string = "bones"; // 静态成员：这些属性存在于类本身上面而不是类的实例上，只能在类的本身和子类中通过类的名字调用，不能被实例调用。
}
// 无论在 es 还是 ts 中，类的成员属性都是实例属性！而不是原型属性！类的成员方法都是原型方法！
console.log(Dog.prototype);
let dog = new Dog("wangwang");
console.log(dog);

// 继承
// 这里的 H 是派生类（derived class），通常被称作子类。
class H extends Dog {
  // 派生类如果包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。
  // 而且，在构造函数里访问 this 的属性之前，我们一定要先调用 super()。 这个是 TypeScript 强制执行的一条重要规则。
  // 构造函数的参数也可以使用修饰符，这时就不用再去类里面定义了。
  constructor(name: string) {
    super(name);
  }
  // 下面代码演示了如何在子类里重写父类的方法（重写的意义：根据不同的类从而具有不同的功能）
  run() {
    console.log("H...");
    super.run();
  }
}
let h = new H("xixi");
h.run();

// 参数属性
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
// 在上面的例子中，我们必须在 Octopus 类里定义一个只读成员 name 和一个参数为 theName 的构造函数，这样显得有点麻烦。
// 参数属性可以方便地让我们在一个地方定义并初始化一个成员。下面是修改版：
class Octopus1 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
  // 可以在类里面用 this.name 访问
}
// 注意看我们是如何舍弃了 theName，仅在构造函数里使用 readonly name: string 参数来创建和初始化 name 成员。我们把声明和赋值合并至一处。
// 参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 private 限定一个参数属性会声明并初始化一个私有成员；对于 public 和 protected 来说也是一样。
