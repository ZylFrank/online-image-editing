 $(document).ready(function(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("cut-photo");
    var light=$("#ld").val();/*获得亮度*/
    var contrast=$("#db").val();/*获得对比度*/
    /*$('.master').mouseup(function(e){
          if( e.which==1){*/

        $("#cut-photo").Jcrop({
        onChange:hidebtn, //当选择区域变化的时候，执行对应的回调函数
        onSelect:showCoords,//当选中区域的时候，执行对应的回调函数
        onRelease: clearCoords
        });
//alert("hello")


function hidebtn(){
    $("#pf").css({"position": "absolute", "display":"none","left":c.x2+70,"top":c.y2+10, "z-index": "10000"});
    }

function showCoords(c) {
    $("#txtX1").val(c.x); //得到选中区域左上角横坐标
    $("#txtY1").val(c.y); //得到选中区域左上角纵坐标
    $("#txtX2").val(c.x2); //得到选中区域右下角横坐标
    $("#txtY2").val(c.y2); //得到选中区域右下角纵坐标
    $("#txtWidth").val(c.w); //得到选中区域的宽度
    $("#txtHeight").val(c.h); //得到选中区域的高度
    var yx=$("#txtX2").val(),
        yy=$("#txtY2").val();
/*漂浮*/
   $("#pf").css({"position": "absolute", "display":"block","left":c.x2+70,"top":c.y2+10, "z-index": "10000"});
}
    function clearCoords(){
        $("#coordinate input").val('');
    }



   /*       }
else{
              return false;
          }
    })*/

    /*剪裁*/
 $("#cut-btn").click(function () {
     $(".cut").css({"display":"block"});
     //$("#pf").css({"display":"none"});
     var zx= $("#txtX1").val(),
      zy=$("#txtY1").val(),
      yx=$("#txtX2").val(),
      yy=$("#txtY2").val(),
      cwidth=yx-zx,
      cheight=yy-zy;
      myCanvas.width=cwidth;
      myCanvas.height=cheight;
      var male=(300-cwidth)/4.5;
     ctx.drawImage(img,zx,zy,cwidth,cheight,0,0,cwidth,cheight);
     var imgData=ctx.getImageData(10,10,cwidth,cheight);
     ctx.putImageData(imgData,10,10);
     var mdsize=function(){
     if(cwidth>300){
     $("#myModal").css({"width":cwidth})}
     else
     {$("#myModal").css({"width":"300px"})
         $(".cut").css({"margin-left":male})}
     }

     mdsize();
    });

/*亮度*/

    $("#ld").mouseup(function(){
        //$("#pf").css({"display":"none"});

        var zx= $("#txtX1").val(),
            zy=$("#txtY1").val(),
            yx=$("#txtX2").val(),
            yy=$("#txtY2").val(),
            cwidth=yx-zx,
            cheight=yy-zy;
        myCanvas.width=cwidth;
        myCanvas.height=cheight;
        var ligt=parseInt($("#ld").val());/*获得亮度*/
        var dbd=parseInt($("#db").val());/*获得对比度*/
        if (dbd==0)
        {
        ctx.drawImage(img,zx,zy,cwidth,cheight,0,0,cwidth,cheight);
        var imgdata = ctx.getImageData(0, 0, cwidth, cheight);
        ctx.getImageData(zx, zy,cwidth, cheight);
        for (var i = 0; i < imgdata.data.length; i += 4)
        {
            imgdata.data[i] +=ligt; //red
            imgdata.data[i + 1] += ligt; //green
            imgdata.data[i + 2] +=  ligt; //blue
        }
        ctx.putImageData(imgdata, 0, 0);
        }
        else{
            ctx.drawImage(img,zx,zy,cwidth,cheight,0,0,cwidth,cheight);
            var imgdata = ctx.getImageData(0, 0, cwidth, cheight);
            ctx.getImageData(zx, zy,cwidth, cheight);
            if (dbd > 0) {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i] ) * 5 - dbd+ligt;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) * 5 - dbd+ligt;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) * 5 - dbd+ligt;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
            else {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i]) / 4 - dbd+ligt;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) / 4 - dbd+ligt;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) / 4 - dbd+ligt;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
        }

    });
/*对比度*/
    $("#db").mouseup(function(){
        var zx= $("#txtX1").val(),
            zy=$("#txtY1").val(),
            yx=$("#txtX2").val(),
            yy=$("#txtY2").val(),
            cwidth=yx-zx,
            cheight=yy-zy;
        myCanvas.width=cwidth;
        myCanvas.height=cheight;
        var dbd=parseInt($("#db").val());/*获得亮度*/
        var ligt=parseInt($("#ld").val());/*获得亮度*/
        ctx.drawImage(img,zx,zy,cwidth,cheight,0,0,cwidth,cheight);
        var imgdata = ctx.getImageData(0, 0, cwidth, cheight);
        ctx.getImageData(zx, zy,cwidth, cheight);
        if (ligt==0) {

            if (dbd > 0) {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i] ) * 5 - dbd;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) * 5 - dbd;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) * 5 - dbd;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
            else {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i]) / 4 - dbd;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) / 4 - dbd;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) / 4 - dbd;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
        }
        else{
            if (dbd > 0) {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i] ) * 5 - dbd+ligt;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) * 5 - dbd+ligt;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) * 5 - dbd+ligt;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
            else {
                for (var i = 0; i < imgdata.data.length; i += 4) {
                    imgdata.data[i] = (imgdata.data[i]) / 4 - dbd+ligt;
                    imgdata.data[i + 1] = (imgdata.data[i + 1] ) / 4 - dbd+ligt;
                    imgdata.data[i + 2] = (imgdata.data[i + 2] ) / 4 - dbd+ligt;
                }
                ctx.putImageData(imgdata, 0, 0);
            }
        }
    });





    /*黑白*/
    var vl=$("#checkboxThreeInput").val();
    $("#black").click(function(){
     if (vl==1){
         var zx= $("#txtX1").val(),
            zy=$("#txtY1").val(),
            yx=$("#txtX2").val(),
            yy=$("#txtY2").val(),
            cwidth=yx-zx,
            cheight=yy-zy;
        var imgdata = ctx.getImageData(0, 0, cwidth, cheight);
        //ctx.getImageData(zx, zy,cwidth, cheight);
        for (var i = 0, n = imgdata.data.length; i < n; i += 4) {
            var grayscale = imgdata.data[i] * .3 + imgdata.data[i + 1] * .59 + imgdata.data[i + 2] * .11;
            imgdata.data[i  ] = grayscale;    // red
            imgdata.data[i + 1] = grayscale;     // green
            imgdata.data[i + 2] = grayscale;     // blue
        }

        ctx.putImageData(imgdata, 0, 0);
        vl=0;}
      else{
         var zx= $("#txtX1").val(),
             zy=$("#txtY1").val(),
             yx=$("#txtX2").val(),
             yy=$("#txtY2").val(),
             cwidth=yx-zx,
             cheight=yy-zy;
         myCanvas.width=cwidth;
         myCanvas.height=cheight;

         ctx.drawImage(img,zx,zy,cwidth,cheight,0,0,cwidth,cheight);
         var imgData=ctx.getImageData(10,10,cwidth,cheight);
         ctx.putImageData(imgData,10,10);
         vl=1;}
  });
/*取消按钮*/
    $("#cancel").click(function(){
      var dbd=parseInt($("#db").val());/*获得亮度*/
      var ligt=parseInt($("#ld").val());/*获得亮度*/
        dbd=$("#db").val("");
        ligt=$("#ld").val("");
        if($("#checkboxThreeInput").is(':checked'))
        {

            $("#checkboxThreeInput").removeAttr("checked");

        }

    });
});
