chrome.extension.onRequest.addListener(
	 
	function(request, sender, sendResponse) {	
	
		if(request.command=="parse"){
	
			parse_document();
			
		}
		
		if(request.command=="present"){
			
			present_results(request);
			
		}
		
	}     
		
);

var urls_found = new Array();

function present_results(data_set){

	replace_node = document.getElementById(data_set.node);

	replace_node.style.border = data_set.data;
	replace_node.style.fontWeight = "bold";

}

function check_url(url, link_node) {

	if(urls_found[url]==undefined){
		
		urls_found[url]=true;
						
		chrome.extension.sendRequest({command:"ajax",link:url,node_id:link_node},function(){});
		
	}

}

function parse_document(){

	var n = document;			
								
	if(document.location.toString().indexOf("www.google")!=-1){				
				
		var n = document.getElementById("search");
			
	}
			
	if(document.location.toString().indexOf("search.yahoo.com")!=-1){	
			
		var n = document.getElementById("results");
			
	}
			
	if(document.location.toString().indexOf("bing.com")!=-1){	
				
		var n = document.getElementById("web");
			
	}
			
	var rootNode = n;
			
	while (n) {
	
		if(n.hasAttributes()){
				
			if(n.hasAttribute("href")){
			
				if(n.href.toString().indexOf("google")==-1){
				
					id_string = "node_" + Math.floor(Math.random()*5000);
					
					if(n.id==""){
					
						n.id = id_string;
						
					}
					
					check_url(n.href, id_string);
						
				}
					
			}
				
		}

		if (n.v) {
			n.v = false;
			if (n == rootNode) {
				break;
			}
			if (n.nextSibling) {
				n = n.nextSibling;
			} else {
				n = n.parentNode;
			}
		} else {
			if (n.firstChild) {
				n.v = true;
				n = n.firstChild;
			}else if (n.nextSibling) {
				n = n.nextSibling;
			}else {
				n = n.parentNode;
			}
		}
				
	}
			
	urls_found = new Array();

}