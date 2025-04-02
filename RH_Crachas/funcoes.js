function Abertura(){
	var atv = getWKNumState()
	var mobile = getMobile()
	var user = getWKUser()
	var mode = getFormMode()
	$("#div_Autorizacao").hide()
	$("#div_reprova").hide()
	$("#btn_reprova").hide()
	$("#div_retorno").hide()
	$("#btn_retorno").hide()
	$("#btn_avancar").hide()
	
	window.parent.$("#workflowActions").hide();
	window.parent.$("#workflow-detail-card").find("div").hide();
	window.parent.$("#workflow-detail-card").find("span").hide();
	var cl = window.parent.document.getElementsByClassName("fs-md-margin-top-negative")
	for (index = 0; index < cl.length; ++index) {
        cl[index].setAttribute("style", "background-color: green; color: white  ;width: 200px; height: 60px");
    }
	TrocaMotivo($("#Motivo").val())
	TrocaTipo($("#tipo").val())
	if(atv!='0' || atv!='4'){

	}
	if(atv=='5'){
		$("#5").hide()
		$("#btn_retorno").hide()
		$("#btn_avancar").show()
		$("#btn_reprova").show()
	}
	else if(atv=='12' || atv=='18'){
		$("#div_Autorizacao").show()
		AdicionaObrigatoriedade('AnexoTermoAutorizacao')
		$("#5").hide()
		if(atv==12){
			$("#btn_retorno").hide()
			$("#btn_gerar").show()
			$("#btn_download").hide()
			$("#btn_visualizar").hide()
			$("#btn_avancar").show()
		}
		else{
			$("#5").hide()
			$("#btn_retorno").show()
			$("#btn_reprova").hide()
			$("#btn_download").show()
			$("#btn_visualizar").show()
			$("#btn_gerar").hide()
			$("#btn_avancar").show()
		}
	}
	else if(atv=='22' || atv=='25'){
		$("#div_reprova").show()
	}
}
function RemoveCss(obj){
	for (var i = 0; i < obj.length; i++) {
		var vl = obj[i].value
		var elemento = obj[i].id
		$("#"+elemento).css('border-color','')
		obj[i].classList.remove('erro')
		obj[i].classList.add('ok')
	}	
}
function TrocaMotivo(valor){
	//$("#div_tipo").hide()
	//$("#div_coletivo").hide()
	$("#div_individual").show()
	/*if(valor=='Avaria'){
		$("#div_tipo").hide()
		$("#div_coletivo").hide()
		$("#div_individual").show()
		RetiraObrigatoriedade('tipo')
		AdicionaObrigatoriedade('Chapa')
	}
	else if(valor=='Novo' || valor=='Mudança de Função') {
		if(valor=='Novo'){
			//$("#div_tipo").show()
			AdicionaObrigatoriedade('tipo')
			if($("#tipo").val()==""){
				$("#div_coletivo").hide()
				$("#div_individual").hide()
			}
			else if($("#tipo").val()=="Individual"){
				$("#div_coletivo").hide()
				$("#div_individual").show()
			}
			else{
				$("#div_coletivo").show()
				$("#div_individual").hide()
			}	
		}
		else{
			RetiraObrigatoriedade('tipo')
			AdicionaObrigatoriedade('Chapa')
			$("#div_tipo").hide()
			$("#div_coletivo").hide()
			$("#div_individual").show()
		}
	}*/

}

function TrocaTipo(valor){
	$("#dados_destinatario").show()
	if(valor=='Individual'){
		$("#div_individual").show()
		$("#div_coletivo").hide()
		AdicionaObrigatoriedade('Chapa')
		RetiraObrigatoriedade('CodEquipe')
	}
	else if(valor=='Coletivo'){
		AdicionaObrigatoriedade('CodEquipe')
		RetiraObrigatoriedade('Chapa')
		$("#div_individual").hide()
		$("#div_coletivo").show()
	}
}

function AdicionaObrigatoriedade(campo){
	var elemento = document.getElementById(campo)
	elemento.classList.add("etapas-all")
}

function RetiraObrigatoriedade(campo){
	var elemento = document.getElementById(campo)
	if (elemento.classList.contains("etapas-all")){
		elemento.classList.remove("etapas-all")
	}
}
