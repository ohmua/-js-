var oPrve = document.getElementById('prve');
var oNext = document.getElementById('next');
var oWrap = document.getElementsByClassName('wrap')[0];
var oList = document.getElementsByClassName('list')[0];
var oLi = oList.getElementsByTagName('li');
var oCon=document.getElementsByClassName('container')[0];
var timer,timer2,index=0,flag=true;
function moveImg(dis) {
    flag = false;
    var time = 400;//运动时间
    var eachTime = 20;//每次时长
    var eachDis = dis/(time/eachTime);//步长
    var newLeft = oWrap.offsetLeft + dis;//目标位置
    function eachmove(){
        //临界值判断
        if(dis > 0 && oWrap.offsetLeft < newLeft || dis < 0 && oWrap.offsetLeft > newLeft){
            oWrap.style.left = oWrap.offsetLeft + eachDis +'px' ;
        }else{
            clearInterval(timer);
            oWrap.style.left=newLeft;//强制归位避免步长出错
            if(newLeft == 0){
                oWrap.style.left=-2600 + 'px'; 
            }
            if(newLeft == -3120){
                oWrap.style.left=-520 + 'px';
            }
            flag=true;
        }
    }
    timer = setInterval(eachmove,eachTime)
}

//上下切换
oPrve.onclick=function (){
    if(!flag) return ;
    moveImg(520);
    if(index == 0){
        index=4;
    }else{
        index --;
    }
    changeStyle();
}

oNext.onclick=function (){
    if(!flag) return ;
    moveImg(-520);
    if(index == 4){
        index=0;
    }else{
        index ++
    }
    changeStyle();
}

//原点样式切换
function changeStyle(){
    // if(!flag) return ;
    console.log(flag)
    oList.getElementsByClassName('active')[0].className='';
    oLi[index].className='active';
    // console.log(index)
}
//用var时，用立即执行函数解决闭包
for(var i=0;i<oLi.length;i++){
    (function(j){
        oLi[j].onclick = function (){
            var offset = (j - index) * -520;
            moveImg(offset);
            index=j;
            changeStyle();
        }
    })(i)
}
// 用let时
// for(let i=0;i<oLi.length;i++){
//     oLi[i].onclick = function (){
//         changeStyle(i);
//     }
// }
timer2 = setInterval(oNext.onclick,2000)
oCon.onmouseover = function (){
    clearInterval(timer2)
}
oCon.onmouseout = function (){
    timer2 = setInterval(oNext.onclick,2000)
}