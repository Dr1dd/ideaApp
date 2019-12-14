
$(function() {
	$("#loginbutton").on("click", function(){
		window.location= "main.html";
	});
	$("#listTab").on("click", function(){
		window.location= "main.html";
	});
	$("#addTab").on("click", function(){
		window.location= "addIdea.html";
	});
	$("#addbutton").on("click", function(){
		var text = document.getElementById('ideaContent').innerHTML;
		front.send('save-data',app.getPath('userData'), text)
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
	$("#tags").keypress(function (e) {
	  if (e.key === ' ' || e.key === 'Spacebar') {
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
front.on('get-data-result', function(msg){
	var div = document.createElement("div");
	div.classList.add("ideasList");
	var divtimestamp = document.createElement("div");
	divtimestamp.classList.add("ideaTime");
	var divcontent =document.createElement("div");
	divcontent.classList.add("ideaContent");
	divcontent.innerHTML = msg;
	div.appendChild(divtimestamp);
	div.appendChild(divcontent);
	document.getElementById('allIdeas').appendChild(div);
})
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}
function deleteTag(div){
	$(function() {
		$(div).remove();
	});
}