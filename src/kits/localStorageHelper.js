// localStorage操作js文件
const KEY = 'goods'   //在localStroage中存储的样子是 key=goods value=[{'goodsid':'22','count':1},{}]


//根据key获取到localStorage中数据
export  function getItem () {
   return  JSON.parse(localStorage.getItem(KEY) || '[]')
}



//向localStorage添加数据
export  function setItem (obj) {
    //获取老数据
    var arr = JSON.parse(localStorage.getItem(KEY) || '[]')
    //追加新数据
    arr.push(obj)
    //存储新老数据
    return localStorage.setItem(KEY,JSON.stringify(arr))
}

//为shopcar.vue中减少商品数服务
export function subStrictItem (goodsid) {
        //获取老数据
    var arr = JSON.parse(localStorage.getItem(KEY) || '[]')
    //遍历数组
    for(let i = arr.length-1; i >= 0; i--) {
        //遍历每一个对象的goodsid与传进来的goodsid比较是否相等
        let tempObj = arr[i]
        if(tempObj.goodsid == goodsid ) {
            if (tempObj.count == 1) {
                //从数组中移除这个对象即商品
                arr.splice(i,1)
            }else {
                //将当前数据的count减一个
                tempObj.count = tempObj.count - 1
            }
            //跳出循环 保证只修改一个数据对象
            break
        }

    }
    //统一将新老数据存储到localStroage中
    localStorage.setItem(KEY,JSON.stringify(arr))
}

//从localStroage中移除数据
export function removeItem (goodsid) {
    //获取老数据
    var arr = JSON.parse(localStorage.getItem(KEY) || '[]')
    let newArr = []
    for (let i = arr.length-1; i >=0; i--) {
       if (arr[i].goodsid != goodsid) {
           newArr.push(arr[i])
       }
    }
    //统一将新老数据存储到localStroage中
    localStorage.setItem(KEY,JSON.stringify(newArr))
}