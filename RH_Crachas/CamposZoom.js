function zoomCDC(obj){
	var atv = getWKNumState()
	var type = $(obj).prev("input").attr("name");
	
	if(atv==0 || atv==4){
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
}
function zoomChapa(obj){
	if($("#CODCCUSTO").val()==""){
		FLUIGIP.USEFUL.showError("Preencha o campo com o Centro de Custo!")
	}
	else{
		$("#Chapa").val('')
		$("#NomeFunc").val('')
		var type = $(obj).prev("input").attr("name");
		var filters = "CDC,"+$("#CODCCUSTO").val();
		var searchby = "";
		tdizoom.open(
			"RHU_DADOSFUNCIONARIO", //Nome do Dataset
			"CHAPA,CHAPA,NOME, NOME,FUNCAO, FUNCAO", //Campos a serem exibidos
			"CHAPA,NOME,FUNCAO", //Campos de retorno
			"Funcionários", //T�tulo
			filters, //Filtros
			type, //Type (deve ser sempre o atributo name do campo)
			null, //likefield
			null, //likevalue
			searchby //Campo/Constraint que ser� buscado o conteudo digitado (Seachby)
		)
	}
}
function zoomEquipe(obj){
	if($("#CODCCUSTO").val()==""){
		FLUIGIP.USEFUL.showError("Preencha o campo com o Centro de Custo!")
	}
	else{
		$("#CodEquipe").val('')
		$("#NomeEquipe").val('')
		var type = $(obj).prev("input").attr("name");
		var filters = "";
		var searchby = "";
		tdizoom.open(
			"RHU_EQUIPES", //Nome do Dataset
			"CODINTERNO,Codigo,DESCRICAO,Descrição", //Campos a serem exibidos
			"CODINTERNO,DESCRICAO", //Campos de retorno
			"Equipes", //T�tulo
			filters, //Filtros
			type, //Type (deve ser sempre o atributo name do campo)
			null, //likefield
			null, //likevalue
			searchby //Campo/Constraint que ser� buscado o conteudo digitado (Seachby)
		)
	}
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
			$("#Regional").val(selectedItem.GDSUBREGIONAL)
		}
		else if(name=='Chapa'){
			if($("#Motivo").val()!="Novo"){
				$("#Chapa").val(selectedItem.CHAPA)
				$("#NomeFunc").val(selectedItem.NOME)
				$("#funcao").val(selectedItem.FUNCAO)
			}
			else{
				var possuicracha = VerificaCrachaFunc(selectedItem.CHAPA)
				if(possuicracha =="false"){
					$("#Chapa").val(selectedItem.CHAPA)
					$("#NomeFunc").val(selectedItem.NOME)
					$("#funcao").val(selectedItem.FUNCAO)
				}
				else{
					FLUIGIP.USEFUL.showError("O motivo para o colaborador selecionado é invalido pois o mesmo já possui um crachá")
				}
			}
		}
		else if(name=='CodEquipe'){
			$("#CodEquipe").val(selectedItem.CODINTERNO)
			$("#NomeEquipe").val(selectedItem.DESCRICAO)
			DadosAdicionaisEquipe(selectedItem.CODINTERNO)
		}
    }
}
function VerificaCrachaFunc(chapa){
	var filter = DatasetFactory.createConstraint("CHAPA",chapa , chapa, ConstraintType.MUST);
	var filter2 = DatasetFactory.createConstraint("EMITIDO","SIM" , "SIM", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("RH_SolicitacaoCracha",null, [filter,filter2], null);
	if (dataset.values.length>0){
		return "true"
	}
	else{
		return "false"
	}
}
function DadosAdicionaisFuncionario(chapa){
	var div_dadosAdicionais = document.getElementById('div_dadosAdicionais')
	var html=''
	var filter = DatasetFactory.createConstraint("CHAPA",chapa , chapa, ConstraintType.MUST);
	dataset = DatasetFactory.getDataset("RHU_DADOSFUNCIONARIO",null, [filter], null);

	if (dataset.values.length>0){
		html+='<label>Função</label>'
		html+='<input type="text" class="form-control" readonly id="funcao" name="funcao" value="'+dataset.values[i]['FUNCAO']+'"/>'
	}
	$("#QTDCRACHAS").val("1")
	div_dadosAdicionais.innerHTML = html
}
function DadosAdicionaisEquipe(CodEquipe){
	var div_dadosAdicionais = document.getElementById('div_dadosAdicionais')
	var html=''
	var filter = DatasetFactory.createConstraint("QTD",CodEquipe , CodEquipe, ConstraintType.MUST);
	dataset = DatasetFactory.getDataset("RHU_EQUIPES",null, [filter], null);
	if (dataset.values.length>0){
		html+='<label>Funcionarios Ativos</label>'
		html+='<input type="text" class="form-control" readonly id="qtd" name="qtd" value="'+dataset.values[0]['QTD']+'"/>'
		$("#QTDCRACHAS").val(dataset.values[0]['QTD'])
	}
	div_dadosAdicionais.innerHTML = html
}
