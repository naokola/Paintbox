

$(function() {
context = document.getElementById('canvas').getContext("2d");

var colorWhite = '#FFFFFF';
var colorYellow = '#FFFF00';
var colorGreen = '#008000';
var colorLightblue = '#87CEFA';
var colorPurple = '#8A2BE2';
var colorBrown = '#8B4513';
var colorBlack = '#000000';
var colorPink = '#FF1493';
var colorFlesh = '#FFE4B5';
var colorRed = '#FF0000';
var colorBlue = '#0000CD';
var colorOrange = '#FF8C00';


$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
    console.log("mousedown")
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
//e is event


$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){

  paint = false;
});

$('#canvas').mouseleave(function(e){

  paint = false;
});


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curColor = colorBlack;
var clickColor = new Array();
var clickTool = new Array();
var curTool = "pencil";
var frameImage = 'none';

var photo = 'none';



function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
 
// I add this;
clickColor.push(curColor);
clickTool.push(curTool);




}
//this is redraw ---------------------------------------------------------------------------------------------------below
//------------------------------------------------------------------------------------------------------------------

function redraw(){ 
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  console.log('frameImage: ' + frameImage);


if (photo != 'none') {
    context.drawImage(photo, 0, 0, photo.width, photo.height,0,0, canvas.width, canvas.height);  
  }
  // context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
	// context.drawImage(video, 0, 0);		
  for(var i=0; i < clickX.length; i++) {		

    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
    
//I add this ; eraser code:

    if(clickTool[i] =='eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = 10;
    }
    else {
      context.globalCompositeOperation = 'source-over';
      context.lineWidth = 5;
    }
    console.log(clickX[i] + '*' + clickY[i]);
    console.log(clickColor[i]);
    console.log(clickDrag[i]);

     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.stroke();
  }
  if (frameImage != 'none') {
    context.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height,0,0, canvas.width, canvas.height);  
  }
  
}
//this is redraw ---------------------------------------------------------------------------------------------------above

//this is for setting colors


// $(".white").on("click",  function(){
//   curColor = colorWhite;
// });
// $(".yellow").on("click",  function(){
//   curColor = colorYellow;
// });
// $(".green").on("click",  function(){
//   curColor = colorGreen;
// });


//this is another way to change the colors;

$('.colorpencil').on("click", function(){
var colorId = this.id;
curColor = eval(colorId);
curTool = "pencil" 
$(this).css('color','FF00000');
// eval will change a string to a variable name;
})


$('.eraser').on('click', function(){
  curTool = 'eraser';
})

//below this ponint: camera function---------------------------


 $('#camera').photobooth().on("image",function( event, dataUrl ){
 // $( "#photo" ).append( '<img src="' + dataUrl + '" >');
 photo = $('<img>').attr('src', dataUrl)[0];
 $('#camera').css('display','none');
 $('#camera').data( 'photobooth').pause();
redraw();
});
  


//above this ponit is camera function----------------------------------

// frame action starts-------------------------------------------------





// function putFrameToCanvas (){
//  var frameImage = $('<img>').attr('src','images/frameArt.png')[0]
 
// // canvas.width = 600
// // canvas.height = 800

//  context.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height,0,0, canvas.width, canvas.height);  
//  }
//this is Putting Frames on canvas---------------------------------------------------------------------------------------below


$('.frameImage').on('click', function(){

var thisFrame = $(this).attr('data-framename');
frameImage = $('<img>').attr('src','images/'+thisFrame + '.png')[0];
$(frameImage).load(function() {
  redraw();
});


 })
 
//-------------------save the image-----------------------------below
// function saveImage() {
//     var imgdata = $('#canvas').toDataURL();  // デフォルトだとpng, 引数でjpegとかも可能
//     imgdata = imgdata.replace('data:image/png;base64,', '');  // 頭のいらない部分を落とす

//     new Ajax.Request(<画像保存CGIのURL>, {
//         parameters: 'img=' + imgdata,  // 画像データを送信
//         onComplete: function(res) {  // callback 別になくてもよいが。
//             if (res.responseText != 'ok') alert('error');
//         }
//     });
// }



// canvasデータを画像に変換にする関数
function chgImg()
{
  var png = cvs.toDataURL();
  document.getElementById("newImg").src = png;
}

$('.saveImage').on('click', function(){
    var dataURL = canvas.toDataURL('image/png');
    $.ajax({
        method: 'POST',
        url: 'user_picture',
      //  data: {
      //      format: 'json',
      //      data_uri: dataURL
      //  },
        model: {
            image: dataURL,
        },
        dataType: 'jsonp',
        error: function(err) {
        console.log(err);
        },
        success: function(){
            console.log("success");
        }
    });
});



//----------------------------------------------------------------
});


































