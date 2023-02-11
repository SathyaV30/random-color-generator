
boxes = document.querySelectorAll('.box')
 arr  = Array.from(boxes);

setInterval(function(){ 
    for (let i=0;i<arr.length;i++ ) {
        arr[i].style.backgroundColor = getRandomColor()
    }  
}, 80);


function getRandomColor() {
     letters = '0123456789ABCDEF';
     color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  


function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
         r=parseInt(col[0], 10).toString(16);
         g=parseInt(col[1], 10).toString(16);
         b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
         colHex='#'+r+g+b;
        return colHex;
    }
}
