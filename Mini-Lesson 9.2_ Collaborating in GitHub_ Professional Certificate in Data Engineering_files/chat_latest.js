const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {

    const scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("id", "ze-snippet");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.onload = function() {   
    
    var host=window.location.host;var path=window.location.pathname;

if((host==="classroom.emeritus.org")&&path.startsWith('/courses'))

{zE('webWidget:get','display');}

else{zE('webWidget','hide');}
    
    }
    document.head.appendChild(scriptEle);
   
 } catch (error) {
            reject(error);
        }
    });
};

loadScript("https://static.zdassets.com/ekr/snippet.js?key=5e37d168-0b7b-422e-a2c2-0cbe5628d522")
    .then( data  => {
        console.log("Script loaded successfully");
    })
    .catch( err => {
        console.error(err);
    });



function loadJs(){
 window.zESettings = {
        webWidget: {
            launcher: {
                chatLabel: {
                    '*': 'Live Support'
                }
            },
            color: {
                theme: '#006634'
            },
            chat: {
            departments: {
            enabled: ['Program Support'],
            select: 'Program Support'

          }
            },
			
			position:{
            horizontal:'left',vertical:'bottom'
            }
        }
    };
    
}

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    loadJs();
} else {
    document.addEventListener('DOMContentLoaded', function () {
    console.log('document was not ready, place code here');
    loadJs();
    });
}