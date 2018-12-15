/*CORS跨域：跨域资源共享
* 跨源资源共享标准通过新增一系列 HTTP 头，
* 让服务器能声明哪些来源可以通过浏览器访问该服务器上的资源。
* */
bindEvent();

function bindEvent() {
    $(".btn").on("click",function () {
        var val = $(".inp").val();
        if(val){
            //实现请求getData();
            //将信息渲染到页面addDom();
            getData(val);
            addDom("my",val);
        }
    });

    $(".inp").on("keydown",function (e) {
        //判断value是否有值
        if(e.keyCode == 13 && this.value){
            /*trigger函数*/
            $(".btn").trigger("click");
        }
    })
}

function getData(val) {
    $.ajax({
        type:"GET",
        url:"http://data.duyiedu.com/api/chat",
        data:{text:val},
        // url:"http://api.qingyunke.com/api.php?key=free&appid=0&msg="+ val,
        success:function (data) {
            var chatText = typeof data == "string"? JSON.parse(data):data;
            addDom("robot",chatText.text);
            console.log(data);
        },
        error:function () {
            console.log("error");
        }
    })
}

// function getData(val) {
//     var oScript = document.createElement("script");
//         //wd=关键字，doJson=执行函数名，这里要保证传的是函数名的字符串！！！
//         oScript.src = "http://api.qingyunke.com/api.php?key=free&appid=0&msg="+ val;
//         //这里将插入以联想词数组为参数的名为doJson的js文件，马上执行
//         document.body.appendChild(oScript);
//         console.log(oScript.innerHTML);
// }

function addDom(who,text) {
    if(who == "my"){
        $('<div class="talk my">\
              <div class="userImg"></div>\
              <div class="conText"><div class="content">'+ text +'</div></div>\
           </div>').appendTo($(".inner"));
        $('.inp').val('');
    }else{
        $('<div class="talk robot">\
              <div class="userImg"></div>\
              <div class="conText"><div class="content">'+ text +'</div></div>\
           </div>').appendTo($(".inner"));
    }
    /* scrollHeight永远大于scrollTop，所以永远跳至底端。
    * 在没有滚动条时scrollTop==0恒成立。
    * */
    $(".chat-box").scrollTop($(".chat-box")[0].scrollHeight);
}