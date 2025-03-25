function ExibeBI(link){
  var html='<html>'+
'<head>'+
'	<title></title>'+
'	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>'+
'	<style type="text/css">.main iframe {'+
'		   border: none;'+
'		   position: fixed;'+
'		   top: 0;'+
'		   left: 0;'+
'		   width: 100%;'+
'		   height: 100%;'+
'		}'+
'		#imgpos {'+
'		position: absolute; '+
'		right: 0;'+
'		bottom: 0; '+
'		}'+
'	</style>'+
'</head>'+
'<body class="vsc-initialized">'+
'<div class="main"><iframe allowfullscreen="true" frameborder="0" height="373.5" src="'+link+'"></iframe><img alt="" data-units="px" id="imgpos" src="https://lh3.googleusercontent.com/drive-viewer/AJc5JmQofLcpxnwsEZz9GeGoG7fOWMIq8hW69wbB7XVscYFdNCeNeB0TkbmAkwSPIwNur2dT-ecexTk=w1366-h625" /></div>'+
'</body>'+
'</html>'
  /*var classeDocumento =  document.getElementsByClassName('WCMHtmlEditor')
  var divExibicao = classeDocumento[0].id*/
  var divBI = document.getElementById('BI')
  alert(html)
  divBI.innerHtml = html
}
