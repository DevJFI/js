function ExibeBI(link){
  var html='<div class="main"><iframe allowfullscreen="true" frameborder="0" height="373.5" src="'+link+'"></iframe><img alt="" data-units="px" id="imgpos" src="https://lh3.googleusercontent.com/drive-viewer/AJc5JmQofLcpxnwsEZz9GeGoG7fOWMIq8hW69wbB7XVscYFdNCeNeB0TkbmAkwSPIwNur2dT-ecexTk=w1366-h625" /></div>'
  var divBI = document.getElementById('BI')
  alert(html)
  divBI.innerHtml = html
  
}
