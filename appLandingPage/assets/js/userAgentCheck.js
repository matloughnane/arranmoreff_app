var UA = navigator.userAgent;
console.log(UA);

// USER AGENT TESTING
// UA = "iPhone";
// UA = "Android";

if (UA.indexOf("iPhone") > -1 || UA.indexOf("iPad") > -1 || UA.indexOf("iPod") > -1 ){
	appleBrowser();
} else if (UA.indexOf("Android") > -1){
	googleBrowser();
} else {
	otherBrowser();
}

function appleBrowser(){
	// console.log("Apple browser");
	var html = "<img class='intro_logo' src='assets/img/arranmoreff_icon_ios.png'>";
	document.getElementById("icon_ff").innerHTML = html;
	document.getElementById('app_badges').style.display = 'none';
	document.getElementById('google_badge').style.display = 'none';
	document.getElementById('apple_badge').style.display = 'block';
}

function googleBrowser(){
	// console.log("google browser");
	document.getElementById('app_badges').style.display = 'none';
	document.getElementById('google_badge').style.display = 'block';
	document.getElementById('apple_badge').style.display = 'none';
}

function otherBrowser(){
	document.getElementById('app_badges').style.display = 'block';
	document.getElementById('google_badge').style.display = 'none';
	document.getElementById('apple_badge').style.display = 'none';
}