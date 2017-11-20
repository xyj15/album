function login() {
    console.log("a");
    var userName=document.getElementsByName("name");
    var pwd=document.getElementsByName("password");
    console.log(userName);
    var matchResult=true;
    if(userName==""||pwd==""){
        alert("请确认是否有空缺项！");
        matchResult=false;
    }else if(userName.length<6||userName.length>20){
        alert("用户名长度应在6到20个字符之间！");
        matchResult=false;
    }else if(userName==pwd||userName==repwd){
        alert("密码或重复密码不能和用户名相同！");
        matchResult=false;
    }else if(pwd.length<6||pwd.length>20){
        alert("密码或重复密码长度应在6到20个字符之间！");
        matchResult=false;
    }else if(userName.length<6||userName.length>20) {
        alert("用户名长度应在6到20个字符之间！");
        matchResult=false;
    }
    return matchResult;
}
