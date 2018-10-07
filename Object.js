
//1.字面量定义属性和属性值
var obj={
    userName:"tom",
    age:12
};
console.log(Object.keys(obj));//['userName','age']

//2.字面量定义，
var obj1={

};

obj1.userName="alice";
obj1.age='13';

var str="age";
console.log(obj1.userName);//alice
console.log(obj1[str]);//13
//3.通过defineProperty增加属性和属性值
var obj2={
    age:23,
};
Object.defineProperty(obj2,"userName",{
    value:"tack",
    writable:true,      //是否允许定义的属性被修改，默认false；true的情况下字面量里面定义的属性是可以修改的(如age)
    enumerable:true,    //是否允许定义的属性被枚举，在遍历(如for循环、console.log(obj,Object.keys[obj])时用到的就是枚举；默认false；
    configurable:true,  //是否允许被删除和被重置(即前后两次通过defineProperty定义同一个属性)，默认是false；
});                     //返回值是目标对象(即obj2),如果已经定义了userName属性，会覆盖掉前面的属性值
console.log(obj2.userName,obj2.age);//tack 23
obj2.userName="jack";
console.log(obj2.userName);         //jack
for (var key in obj2){
    console.log(key,obj2[key])
};
delete obj2.userName;//允许删除的情况下回删除obj2的userName属性
console.log(obj2.userName); //undefined

var obj3={

};
var obj4={

};
//A
Object.defineProperty(obj3,"userName",{
    get(){//get是读取数据，即在对obj3进行读取数据(如console.log(obj)、遍历等操作)的时候会触发该函数
        console.log("执行了get");
        return "rose";//该返回值会赋值给属性userName；
    },
    set(){

    }
});
console.log(obj3.userName);//执行了get  rose//执行该输出时会触发get()方法，若get()方法中没有返回值，则为undefined；
//B
var userName=null;
Object.defineProperty(obj4,"userName",{
    get(){
        return userName;
    },
    set(v){//set可以接受参数
        userName=v;
    }
});
console.log(obj4.userName);//null
obj4.userName="mack";//执行该输出时会触发set()方法，会将"mack"作为参数传给set()，
console.log(obj4.userName);//mack
//执行过程是修改属性值得操作会触发set()方法，set方法会把参数赋值给变量userName，之后的读取操作会触发get()方法，会把变量userName的值赋值给obj4的属性userName
