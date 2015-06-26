

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

  console.log( mouseX, mouseY, e );
    console.log("mousedown")
  paint = true;
  addClick(e.offsetX, e.offsetY);
  redraw();
});
//e is event


$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.offsetX, e.offsetY, true);
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
      context.lineWidth = 50;
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
//$( "#photo" ).append( '<img src="' + dataUrl + '" >');  
  $('#camera').data( 'photobooth').pause();
  $('#camera').css('display','none');
  var img = new Image();
  img.onload = function(){
    document.getElementById('photo').getContext('2d').drawImage(img,0,0); // Or at whatever offset you like
  };
  img.src = dataUrl;
  //$(".pencil_wrapper").append( '<img src="' + dataUrl + '" >');
});

    $('.camera_icon').on('click',function(){
        photo = 'none';
        $('#camera').css('display','block');
        $('#camera').data('photobooth').resume();
        document.getElementById('photo').getContext('2d').clearRect(0, 0, context.canvas.width, context.canvas.height)
    })

   function afterImageLoaded( url ) {
    var d = $.Deferred();
    var img = new Image();
    img.onload = function() {
      d.resolve( [url, img] );
    }
    img.src = url;
    return d.promise();
   }
  
  $('.email_icon').on('click', function( e ) {
    var photo = document.getElementById('photo');
    var camera = document.getElementById('canvas');

    var pURL = photo.toDataURL();
    var cURL = camera.toDataURL()

    var pProm = afterImageLoaded(  );
    var cProm = afterImageLoaded(  );

    $('body').css('cursor','wait');
    $('.pointer').css('cursor','wait');

    $.when(afterImageLoaded( pURL ), afterImageLoaded( cURL) ).then(function() {
      var img1 = arguments[ 0 ][1];
      var img2 = arguments[ 1 ][1];
      var newCanv = document.createElement('canvas');
      newCanv.height = 600;
      newCanv.width = 800;

      var newCanvContext = newCanv.getContext('2d');
      newCanvContext.drawImage( img1, 0, 0 );
      newCanvContext.globalCompositeOperation = 'source-over';
      newCanvContext.drawImage( img2, 0, 0 );

      console.log( newCanv.toDataURL() );

        var dataURL = newCanv.toDataURL('image/png');

        $.ajax({
            method: 'POST',
            url: 'user_picture',
            data: {
                format: 'json',
                image: dataURL
            },
            dataType: 'jsonp',
            error: function(err) {
                 console.log("error");
                console.log(err);
            },
            success: function(){
                console.log("success");
               $('body').css('cursor', 'auto');
                window.location.href = "/user_picture/mail_form";
            }
        });
    })




  })


//this is Putting Frames on canvas---------------------------------------------------------------------------------------below


  $('.frameImage').on('click', function(){

    var thisFrame = $(this).attr('data-framename');
    frameImage = $('<img>').attr('src','images/'+thisFrame + '.png')[0];
    $(frameImage).load(function() {
      redraw();
    });


   });
 
//-------------------save the image-----------------------------below




// canvasデータを画像に変換にする関数
function chgImg()
{
  var png = cvs.toDataURL();
  document.getElementById("newImg").src = png;
}



//----------------------------------------------------------------
});


































