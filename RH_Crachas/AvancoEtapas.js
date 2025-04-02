function avancar(atv){	
	var atvAtual = getWKNumState()
	AnaliseCampos(atv)
	var erro=document.getElementsByClassName("erro")
	if(erro.length>0){
		FLUIGIP.USEFUL.showError("Existem campos obrigatórios que não foram preenchidos")
	}
	else{
		if(atv=='btn_avancar'){
			if(atvAtual=='5'){
				atv='7'
			}
			else if(atvAtual=='12'){
				atv='18'
			}
			else if(atvAtual=='18'){
				atv='23'
			}
		}
		$("#workflowActions > button:first-child", window.parent.document).click();
		//window.parent.$("#send-modal").hide();
		var obj = document.getElementsByClassName('leitura')
		setTimeout(function(){habilitaCampos(obj)},200);
		setTimeout(function(){parametrosAtv(atv)},200);
	}
}

function parametrosAtv(atvdestino){	
	window.parent.$("#divRightBar").hide();
	window.parent.$("#nextActivity").val(atvdestino);
	window.parent.$("select[name='nextActivity']").change()	
	//window.parent.$("#send-modal").find("div").last().find("button").first().click();		
	window.parent.$("#moviment-button").click();	
}

function AnaliseCampos(atv){
	var atvAtual = getWKNumState()
	var obrigatórios = document.getElementsByClassName('etapas-all')
	var etapas = document.getElementsByClassName('etapa_'+atvAtual)
	AddCss(obrigatórios)	
}

function AddCss(obj){
	for (var i = 0; i < obj.length; i++) {
		var vl = obj[i].value
		var elemento = obj[i].id
		if (vl=="") {
			$("#"+elemento).css('border-color','red')
			obj[i].classList.add('erro')
		}
		else{
			$("#"+elemento).css('border-color','')
			obj[i].classList.remove('erro')
			obj[i].classList.add('ok')
		}
	}	
}
function campoReprova(){
	$("#div_reprova").show();
	$("#msgReprova").val("");
	$("#div_retorno").hide();
}
function campoRetorno(){
	$("#div_reprova").hide();	
	$("#div_retorno").show();
	
}
