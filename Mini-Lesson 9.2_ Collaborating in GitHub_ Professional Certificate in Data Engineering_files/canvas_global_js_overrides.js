try{
	LUX=function(){function n(){return Date.now?Date.now():+new Date}var r,t=n(),a=window.performance||{},e=a.timing||{activationStart:0,navigationStart:(null===(r=window.LUX)||void 0===r?void 0:r.ns)||t};function i(){return a.now?(r=a.now(),Math.floor(r)):n()-e.navigationStart;var r}(LUX=window.LUX||{}).ac=[],LUX.addData=function(n,r){return LUX.cmd(["addData",n,r])},LUX.cmd=function(n){return LUX.ac.push(n)},LUX.getDebug=function(){return[[t,0,[]]]},LUX.init=function(){return LUX.cmd(["init"])},LUX.mark=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];if(a.mark)return a.mark.apply(a,n);var t=n[0],e=n[1]||{};void 0===e.startTime&&(e.startTime=i());LUX.cmd(["mark",t,e])},LUX.markLoadTime=function(){return LUX.cmd(["markLoadTime",i()])},LUX.measure=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];if(a.measure)return a.measure.apply(a,n);var t,e=n[0],o=n[1],u=n[2];t="object"==typeof o?n[1]:{start:o,end:u};t.duration||t.end||(t.end=i());LUX.cmd(["measure",e,t])},LUX.send=function(){return LUX.cmd(["send"])},LUX.ns=t;var o=LUX;return window.LUX_ae=[],window.addEventListener("error",(function(n){window.LUX_ae.push(n)})),o}();
	 
	document.write('<script src="https://cdn.speedcurve.com/js/lux.js?id=4664975624" async crossorigin="anonymous"></script>');
	
	console.log("Lux Fuction executed");
}
catch(e)
{
	console.log("Error Occured"+e);
}


document.addEventListener('DOMContentLoaded', function() {
	
	if(ENV.current_user_is_student){
		var s = document.querySelector("#right-side ul li")
		var details = document.querySelector("#right-side .details")
		var studentgrades = document.querySelector("#right-side #student-grades-right-content")
		if(s==null && details==null){
			document.querySelector('#right-side-wrapper').style.display = 'none' 
				if(studentgrades!=null){
					document.querySelector('#right-side-wrapper').style.display = 'block'
				}
			}
			// JS to hide new module, tutor ai bot and live support for submissions pages in case iframe render
		  const inner_iframe_document = document.querySelector('.submission-details-frame #preview_frame')
		  if (inner_iframe_document) {
			  
			inner_iframe_document.addEventListener("load", () => {
			const iframeDoc = inner_iframe_document.contentDocument || inner_iframe_document.contentWindow.document;
			if (iframeDoc.readyState === "complete") {
			  hideFromInnerIframe();
			} else {
			  iframeDoc.addEventListener("DOMContentLoaded", () => {
				hideFromInnerIframe();
			  });
			}
			});		  
		  }	
	}
	
});


function hideFromInnerIframe(){
  if(document.querySelector('.submission-details-frame #preview_frame') && ENV.current_user_is_student){
    var inner_iframe_document = document.querySelector('.submission-details-frame #preview_frame').contentDocument.body
    var module_nav = inner_iframe_document.querySelector('.module_nav_wrapper')
    var disco_root = inner_iframe_document.querySelector('#disco-root')
    var chat_container = inner_iframe_document.querySelector('#chatIconContainer')
    var live_support = inner_iframe_document.querySelector('#launcher')

    if(module_nav){
      module_nav.style.display = 'none'
    }
 
    if(disco_root){
      disco_root.style.display = 'none'
    }
 
    if(chat_container){
      chat_container.style.display = 'none'
    }
 
    if(live_support){
      live_support.style.display = 'none'
    }
  }
}


//expand Module Nav
function expandModuleNav(){
    const sidebar = document.querySelector('.navigation-wrap');
    const module_nav_wrapper = document.querySelector('.module_nav_wrapper');
    const toggleIcon = document.querySelector('.toggle-menu .blueprint-icon'); 
    document.querySelector('.side-col').style.visibility = 'visible';
    document.querySelector('.toggle-menu').style.right = '-1px';
    sidebar.classList.remove('sidebar_small');
    // Change the arrow icon to point left (menu is open)
    toggleIcon.classList.remove('icon-chevron_right');
    toggleIcon.classList.add('icon-chevron_left');
    module_nav_wrapper.setAttribute("style", "max-width: 354px !important;");
    sidebar.setAttribute("style", "max-width: 354px !important;");
    trackModuleItemNav('expand');
  }

//collapse Module Nav
function collapseModuleNav(){
	const isStudent = ENV.current_user_is_student;
	const wWidth = window.innerWidth;
	if(isStudent && (wWidth < 1700)){
		const sidebar = document.querySelector('.navigation-wrap');
		const module_nav_wrapper = document.querySelector('.module_nav_wrapper');
		const toggleIcon = document.querySelector('.toggle-menu .blueprint-icon'); // Select the arrow icon
		const courseOutlineBtn = document.querySelector('.course-outline-btn');
		 sidebar.classList.add('sidebar_small');
		// Change the arrow icon to point right (menu is closed)
		 document.querySelector('.side-col').style.visibility = 'hidden';
		 document.querySelector('.toggle-menu').style.right = '3px';
		 toggleIcon.classList.remove('icon-chevron_left');
		 toggleIcon.classList.add('icon-chevron_right');
		 module_nav_wrapper.setAttribute("style", "max-width: 0px !important;");
		 trackModuleItemNav('collapse');
		 if(courseOutlineBtn){ 
            courseOutlineBtn.style.display = 'flex'; 
        }
	}
 }

// To handle desktop module nav toggle
function toggleDesktopModuleNavNavigation() {
    if(document.querySelector('.footer_mobile').style.display != ''){
      if(document.querySelector('.side-col')){
        document.querySelector('.side-col').style.display = 'none';
      }

      if(document.querySelector('.content-wrapper')){
        document.querySelector('.content-wrapper').style.display = 'block !important';
      }
      if(document.querySelector('.footer_mobile')){
        document.querySelector('.footer_mobile').style.display = 'block !important';
      }
    }
}

// To handle mobile module nav toggle
function toggleMobileModuleNav() {
    if(document.querySelector('.side-col')){
      document.querySelector('.side-col').style.display = 'none';
    }

    if(document.querySelector('.content-wrapper')){
      document.querySelector('.content-wrapper').style.display = 'block !important';
    }
    if(document.querySelector('.footer_mobile')){
      document.querySelector('.footer_mobile').style.display = 'block !important';
    }
}

// To handle Hamburger Module nav Click
function hamburgerModuleNavClick() {

    const courseOutlineBtn = document.querySelector('.course-outline-btn');
    const sidebar = document.querySelector('.navigation-wrap');
    const module_nav_wrapper = document.querySelector('.module_nav_wrapper');
    if(document.querySelector('.side-col')){
        document.querySelector('.side-col').style.display = 'block';
        document.querySelector('.side-col').style.visibility = 'visible';
        document.querySelector('.navigation-wrap').classList.remove('sidebar_small');
        courseOutlineBtn.style.display = 'none';
        module_nav_wrapper.setAttribute("style", "max-width: 354px !important;");
        sidebar.setAttribute("style", "max-width: 354px !important;");
    }
	
}