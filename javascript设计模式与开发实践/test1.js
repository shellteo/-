/**
 * Created by zhangxiang on 2017/10/27.
 */
/**
 * 工单根据配置读取控件可以理解为多态
 * 多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来
 * 是符合开放—封闭原则
 * 相对于修改代码来说，仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。
 */
/*
var makeSound = function( animal ){
    if ( animal instanceof Duck ){
        console.log( '嘎嘎嘎' );
    }else if ( animal instanceof Chicken ){
        console.log( '咯咯咯' );
    }
};
var Duck = function(){};
var Chicken = function(){};
makeSound( new Duck() ); // 嘎嘎嘎
makeSound( new Chicken() ); // 咯咯咯*/

var makeSound = function( animal ){
    animal.sound();
};

var Duck = function(){}
Duck.prototype.sound = function(){
    console.log( '嘎嘎嘎' );
};

var Chicken = function(){}
Chicken.prototype.sound = function(){
    console.log( '咯咯咯' );
};

makeSound( new Duck() ); // 嘎嘎嘎
makeSound( new Chicken() ); // 咯咯咯

/**
 * 增加类型检查，这对于处理后台的返回值来说至关重要，
 * 因为后台可能返回不是我们想要的类型，所以要实现类型检查进行错误处理
 *
 * 在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯
 光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时，
 每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来
 编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前，
 确认它们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序
 中将充斥着条件分支语句。
 * */

/**
 * 原型克隆
 * */
var Plane = function(){
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};
let plane = new Plane();
console.log(plane);
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;
console.log(plane);
let clonePlane = Object.create(plane);
Object.create = Object.create || function( obj ){
    let F = function(){};
    F.prototype = obj;
    return new F();
}
console.log( clonePlane.attackLevel );

/*

function Person( name ){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
let a = new Person( 'sven' )
console.log( a.name ); // 输出：sven
console.log( a.getName() ); // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype );*/

function Person( name ){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
let objectFactory = function(){
    let obj = new Object(), // 从Object.prototype 上克隆一个空的对象
        Constructor = [].shift.call( arguments ); // 取得外部传入的构造器，此例是Person
    obj.__proto__ = Constructor.prototype; // 指向正确的原型
    let ret = Constructor.apply( obj, arguments ); // 借用外部传入的构造器给obj 设置属性
    return typeof ret === 'object' ? ret : obj; // 确保构造器总是会返回一个对象
};
let a = objectFactory( Person, 'sven' );
console.log( a.name ); // 输出：sven
console.log( a.getName() ); // 输出：sven
console.log( Object.getPrototypeOf( a ) === Person.prototype ); // 输出：true