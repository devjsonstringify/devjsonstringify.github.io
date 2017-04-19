

var request;

if(window.XMLHttpRequest){
   request = new XMLHttpRequest();
}else{
	request = new ActiveXObject("Microsoft.XMLHTTP");
}

request.open('GET', 'js/json/data.json');
request.onreadystatechange = function () {
	 if((request.readyState===4) && (request.status===200)){
	 	  var info = JSON.parse(request.responseText);

          var authorInfo = "";
          authorInfo += '<p>' + info.fname + " " + info.lname + '</p>';
          authorInfo += '<p>' + info.bio + '</p>';
          

          var output = "<ul>";
          for (var i = 0; i < info.connect.length; i++) {
          	 for(key in info.connect[i]){
                 if(info.connect[i].hasOwnProperty(key)){
                        output += '<li>' + '<a class="iconsMedia" href="'+ info.connect[i][key] +'">' +  '<img src="img/social_media/' + key + '.png" alt=" '+ key +' " title=" follow us on '+ key +'"/>' + '</a>'; '</li>';
                 }
          	 }
          }
          
          output += "</ul>";

          //author display info
          var displayInfoAuthor = document.getElementById('infoMe');
          displayInfoAuthor.innerHTML = authorInfo;

          //author social media links
          var sociaLinks = document.getElementById('boxFooter');
          sociaLinks.innerHTML = output;          
         
	 }
}
request.send();