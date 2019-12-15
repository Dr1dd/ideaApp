
$(function() {
	$("#loginbutton").on("click", function(){
		window.location= "main.html";
	});
	$("#register").on("click", function(){
		window.location= "registration.html";
	});
	$("#regbutton").on("click", function(){
		window.location= "main.html";
	});
	$("#listTab").on("click", function(){
		window.location= "main.html";
	});
	$("#addTab").on("click", function(){
		window.location= "addIdea.html";
	});
	$("#addbutton").on("click", function(){
		var doc = $('#ideaContent').html();
	
		doc = doc.replace(/\<\s*textarea[^>]*\>(.*?)\<\s*\/\s*textarea\>/, '');
		doc = "<div class = "+"listText"+"> "+$('#textarea').val()+" </div>"+doc;
		front.send('save-data',app.getPath('userData'), doc)
		window.location= "main.html";
	});
	$("#search").on("click", function(){
		if($("#searchInput").css("visibility") == "hidden") {
			$("#searchInput").css("visibility", "visible");
			$("#searchInput").css("margin-right", "3vh");
			$("#searchInput").css("width", "52%");
		}
		else{
			$("#searchInput").css("width", "0");
			$("#searchInput").css("margin-right", "0vh");
			$("#searchInput").css("visibility", "hidden");
		}
	});

	$("#reload").on("click", function(){
		$(this).css("-webkit-animation", "rotation 1s");
		setTimeout(function(){
			location.reload();
		}, 500);
	});
	$("#tags").keyup(function (e) {
	  if (e.which == 32 || e.which == "32") {
	  	var div = document.createElement("div");
	  	div.classList.add("tag");
	  	div.setAttribute("onclick", "deleteTag(this)");
	  	div.innerHTML = document.getElementById("tags").value;
	  	document.getElementById("tags").value = "";
	  	var container = document.getElementById("tagBlock");
	  	$(div).insertBefore('input.tagInput');
	    e.preventDefault()
	  }
	});
	$("#cameraIcon").on("click", function(){
		$("#cameraDiv").css("visibility","visible");
			app.camera.getDevices(function(devices1){
			 	console.log(devices1);
		            app.camera.init(document.getElementById('camera'), {video: true, audio: false});
		    })
	});
	$("#closeCam").on("click", function(){
		$("#cameraDiv").css("visibility","hidden");
	});
	$("#record").on("click", function(){
		if($(this).attr("src") == "../img/player_record.png"){
 			$(this).attr("src", "../img/record-stop.png");
			app.camera.startRecording({mimeType: 'video/webm;codecs=vp9', bitsPerSecond: 100000});

		}
		else {
			app.camera.stopRecording();
			var time = Date.now();
			$(this).attr("src", "../img/player_record.png");
			$("#cameraDiv").css("visibility","hidden");
			var img = document.createElement("img");
			img.setAttribute("src","../img/videoicon.png");
			img.classList.add("videoPreview");
			document.getElementById("ideaContent").appendChild(img);
			app.camera.saveRecording('/storage/emulated/0/', time+'.webm', {type:'video/webm'})
			//app.camera.previewRecording(document.getElementById('camera'), {type: 'video/webm'});
		}
	});
	$('#takephoto').on("click", function(){
		var img = document.createElement("img");
		img.setAttribute("src","../img/imgicon.jpg");
		img.classList.add("imagePreview");
		document.getElementById("ideaContent").appendChild(img);
		app.camera.takePhoto(document.getElementById('camera'), document.getElementById('camera'));
		var time = Date.now();
		app.camera.savePhoto('/storage/emulated/0/', time+'.webp');
		$("#cameraDiv").css("visibility","hidden");
		
	});
	$("#micIcon").on("click", function(){
		$("#soundRecord").css("visibility", "visible");
		$("#soundRecWindow").css("opacity", "1");
		$("#soundRecWindow").css("visibility", "visible");

	});
	$("#closeSound").on("click", function(){
		$("#soundRecWindow").css("opacity", "0");
		$("#soundRecWindow").css("visibility", "hidden");

		$("#soundRecord").css("visibility", "hidden");

	});
	$("#soundIcon").on("click", function(){
		if($(this).attr("src") == "../img/sound-green.png"){
			$(this).attr("src", "../img/sound-red.png");
			$(this).css("animation", "rotateIcon 1.7s infinite");
		}
		else{
			$(this).attr("src", "../img/sound-green.png");
			$(this).css("animation", "none");
			var img = document.createElement("img");
			img.setAttribute("src","../img/song.png");
			img.classList.add("soundPreview");
			document.getElementById("ideaContent").appendChild(img);
			$("#soundRecWindow").css("opacity", "0");
			$("#soundRecWindow").css("visibility", "hidden");
			$("#soundRecord").css("visibility", "hidden");
		}
	});
	$("#linkIcon").on("click", function(){
			$("#link").css("visibility", "visible");
			$("#linkWindow").css("visibility", "visible");
			$("#linkWindow").css("opacity", "1");
		
	});
	$("#closeLink").on("click", function(){
		$("#linkWindow").css("opacity", "0");
		$("#linkWindow").css("visibility", "hidden");

		$("#link").css("visibility", "hidden");

	});
	$("#addLink").on("click", function(){
		var input = document.getElementById("linkInput").value;
		console.log(input);
		var div = document.createElement("div");
		div.classList.add("linkClass");
		var a = document.createElement("a");
		a.innerHTML = input;
		a.setAttribute("href", input);
		div.append(a);
		document.getElementById("ideaContent").appendChild(div);
		$("#linkWindow").css("opacity", "0");
		$("#linkWindow").css("visibility", "hidden");

		$("#link").css("visibility", "hidden");

	});
	$("#openFilter").on("click", function(){
		$("#filterWindow").css("visibility", "visible");
		$("#filterWindow").css("height", "100%");
		$("#filterWindow").css("width", "100%");
		$("#closeFilter").css("visibility", "visible");

	});
	$("#closeFilter").on("click", function(){
		$("#filterWindow").css("height", "0");
		$("#filterWindow").css("width", "0");
		$("#filterWindow").css("visibility","hidden");
	    $("#closeFilter").css("transition", "0.2s");
	    $("#closeFilter").css("visibility", "hidden");

	});

});
function openCloseDrawer(){
	if(document.getElementById("myDrawer").style.width != 0 && document.getElementById("myDrawer").style.width != "0px" ) {
		document.getElementById("myDrawer").style.width = 0;
		document.getElementById("closeham").style.visibility = "hidden"; 
		document.getElementById("myDrawer").style.visibility = "hidden";
		document.getElementById("addTab").style.visibility = "hidden";
		document.getElementById("listTab").style.visibility = "hidden";
		document.getElementById("drawerContent").style.width = 0;
	}
	else{
		document.getElementById("myDrawer").style.width = "100%";
		document.getElementById("closeham").style.visibility = "visible"; 
	    document.getElementById("myDrawer").style.visibility = "visible";
	    document.getElementById("addTab").style.visibility = "inherit";
		document.getElementById("listTab").style.visibility = "inherit"

	    document.getElementById("drawerContent").style.width = "85%";
	}
		
	
}
window.onload = function(){
	front.send('get-data', app.getPath('userData'));

}
front.on('get-data-result', function(msg, file){
	var timestamp = file.substr(0, file.length-4);
	console.log(msg);

	var time = new Date(timestamp*1);
	console.log(time);
	var datestring = time.getDate()  + "-" + (time.getMonth()+1) + "-" + time.getFullYear();
	console.log(datestring);

	var content = msg;
	var div = document.createElement("div");
	div.classList.add("ideasList");
	div.setAttribute("onclick", "viewContent(this)");
	var divtimestamp = document.createElement("div");
	divtimestamp.classList.add("ideaTime");
	divtimestamp.innerHTML = datestring;
	var divcontent =document.createElement("div");
	divcontent.classList.add("ideaContent");
	$(function() {
		$(divcontent).append(content);
	});
	div.appendChild(divtimestamp);
	div.appendChild(divcontent);
	document.getElementById('allIdeas').appendChild(div);
});
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}
function deleteTag(div){
	$(function() {
		$(div).remove();
	});
}
function viewContent(content){

	$(function() {
		 	var divContent = content.childNodes[1];
		 	var date = content.childNodes[0];
			$("#viewContent").css("visibility", "visible");
			$("#contentWindow").css("visibility", "visible");
			$("#contentWindow").css("opacity", "1");
			console.log(content);
			console.log(divContent.innerHTML);
			console.log(date);
			document.getElementById("ideaViewContent").innerHTML = divContent.innerHTML;
			document.getElementById("dateView").innerHTML = date.innerHTML;
			//$("#ideaViewContent").append(divContent);
		$("#closeContent").on("click", function(){
			$("#contentWindow").css("opacity", "0");
			$("#contentWindow").css("visibility", "hidden");

			$("#viewContent").css("visibility", "hidden");

		});
	});
}
