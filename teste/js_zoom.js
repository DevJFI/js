function zoomCDC(obj){
	$("#CODCCUSTO").val('')
	$("#CENTROCUSTO").val('')
	var type = $(obj).prev("input").attr("name");
	var filters = "";
	var searchby = "";
	tdizoom.open(
		"dsCC", //Nome do Dataset
		"CODCCUSTO,Código,NOME, Nome,GDSUBREGIONAL, Subregional", //Campos a serem exibidos
		"CODCCUSTO,NOME,GDSUBREGIONAL,GDREGIONAL", //Campos de retorno
		"Centro de Custos", //T�tulo
		filters, //Filtros
		type, //Type (deve ser sempre o atributo name do campo)
		null, //likefield
		null, //likevalue
		searchby //Campo/Constraint que ser� buscado o conteudo digitado (Seachby)
	); 
}

function setSelectedZoomItem(selectedItem) {
    if (selectedItem.type != null) {
        var name = selectedItem.type.split("___")[0];
        var indice = selectedItem.type.split("___")[1];
    };
    if(indice){
    	
    }else{
  		if(name=='CODCCUSTO'){	
  			$("#CODCCUSTO").val(selectedItem.CODCCUSTO)
  			$("#CENTROCUSTO").val(selectedItem.NOME)			
  		}
    }
}
