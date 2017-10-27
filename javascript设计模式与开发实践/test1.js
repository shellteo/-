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