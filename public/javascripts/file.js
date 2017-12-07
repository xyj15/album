// var fs=require('fs');
alert("a");
for(var i =0;i<6;i++){
    document.getElementById("album").innerHTML +=("<div class=\"col-xs-6 col-lg-4\">\n" +
        "                    <img class=\"album\" src=\"\\images\\logo.png\" >\n" +
        "                    <p><a class=\"btn\" href=\"#\" role=\"button\">相册名</a></p>\n" +
        "                </div><!--/.col-xs-6.col-lg-4-->");
}