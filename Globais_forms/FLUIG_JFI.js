
FLUIGJFI = new FLUIGJFI(); 

function FLUIGJFI(){


	

	//Propriedade TABLE
	
	this.TABLE = {
		/**
		 * Função getTableSize
		 * @description Retorna o total de linhas da tabela, ignorando as linhas que fazem parte do cabeçalho.
		 * @memberof TABLE
		 * @param {string} tableId Id da tabela
		 * @param {int} tamCab Tamanho do cabeçalho, ou seja, linhas a serem ignoradas na contagem
		 * @returns {int} Total de linhas que a tabela possui, sem contabilizar o cabeçalho
		 * @example numLinhas = FLUIGJFI.TABLE.getTableSize("tabelaClientes", 2); 
		 * @example TABLE, get, tabela, linhas
		 * @example 
		 * @author
		 */
		getTableSize: function(tableId,tamCab){ 
			//TODO verificar se o nome nao irá confundir com funcoes da MATRIZ
			tamCab = (typeof tamCab !== 'undefined') ? tamCab : 1;
			var seletor = "#"+tableId + " tr";
			var contador = 0 - (tamCab + 1);
			$(seletor).each(function(){
				contador++;
			});
			
			return contador;
		},

		/**
		 * Função clearTable
		 * @description Apaga todas as linhas da tabela e mostra uma mensagem ao finalizar
		 * @memberof TABLE
		 * @param {string} tableName tableName da tabela
		 * @param {string} msg Mensagem
		 * @example FLUIGJFI.TABLE.clearTable("minhaTabela", "Finalizado com sucesso!");
		 * @example TABLE, deletar, tabela, linhas
		 * @example 
		 * @author
		 */
		//FIXME: Não testado
		clearTable: function(tableName,msg){
			var contador = 0;
			$("#"+tableName + " tr").each(function(){
				contador++;
				if(contador > 2){
					fnWdkRemoveChild(this); 
				}
			});
			rowIndex[tableName] = 0;
			if (contador > 0) {
				 if (!FLUIGJFI.USEFUL.isNull(msg)) {
					 FLUIGJFI.USEFUL.showInfo(msg);
				 }
			}
		},

		/**
		 * Função removeLineTable
		 * @description Remove a linha especificada da sua tabela. Antes de remover a linha, esse método chama a função beforeRemoveLineTable_PE(table, id) caso exista no seu código javascript. Após a remoção da mesma, o método chama a função removeLineTable_PE(table, id).
		 * @memberof TABLE
		 * @param {*} oElement Elemento de referência da linha a ser acionado, como por exemplo um ícone, ou a referencia da própria linha. Ex: document.getElementById("nomeCampo___1").
		 * @example FLUIGJFI.TABLE.removeLineTable(oElement);
		 * @example TABLE, deletar, tabela, linhas
		 * @example 
		 * @author
		 */
		//FIXME: Não testado
		removeLineTable: function(oElement){
			var table = $(oElement).closest("table").attr("id");
			var id = $(oElement).closest("tr").find("td > input").attr("id").split("___")[1];
			if (typeof window["beforeRemoveLineTable_PE"] === "function"){
				window["beforeRemoveLineTable_PE"](table, id);
			}
			fnWdkRemoveChild(oElement);
			if (typeof window["removeLineTable_PE"] === "function"){
				window["removeLineTable_PE"](table, id);
			}
		},

		/**
		 * Função addTable
		 * @description Adiciona um filho à tabela pai x filho.  Após adicionar o filho à tabela pai x filho , o método chama a função addTable_PE(table, id)
		 * @deprecated addTableChild
		 * @memberof TABLE
		 * @param {string} table tableName da tabela
		 * @returns {string} Retorna o id do filho
		 * @example FLUIGJFI.TABLE.addTable(table);
		 * @example TABLE, adicionar, tabela
		 * @example 
		 * @author
		 */
		//FIXME: Não testado
		addTable: function(table){
			var id = wdkAddChild(table);
			//FLUIGC.switcher.initAll('body');
			$("#id"+table).val(id);
			if (typeof window["addTable_PE"] === "function"){
				window["addTable_PE"](table, id);
			}
			return id;
		},
		/**
		 * Função addTableChild
		 * @description Adiciona um filho à tabela pai x filho.  Após adicionar o filho à tabela pai x filho , o método chama a função addTableChild_PE(table, id)
		 * @memberof TABLE
		 * @param {*} table tableName da tabela
		 * @example FLUIGJFI.TABLE.addTableChild(table);
		 * @example TABLE, adicionar, tabela
		 * @example 
		 * @author
		 */
		//FIXME: Não testado
		addTableChild: function(table){
			var id = wdkAddChild(table);
			//FLUIGC.switcher.initAll('body');
			$("#id"+table).val(id);
			if (typeof window["addTableChild_PE"] === "function"){
				window["addTableChild_PE"](table, id);
			}
			return id;
		}
	}

	//Propriedade USEFUL
     
	this.USEFUL = {	
		/**
		 * Função retiraAcentos
		 * @description Remove todos os acentos encontrados na string informada
		 * @memberof USEFUL
		 * @param {string} str String a ser alterada
		 * @returns {string} String sem acentos
		 * @example nomeSemAcentos = FLUIGJFI.USEFUL.retiraAcentos(nome);
		 * @example USEFUL, string, alteração
		 * @example 
		 * @author
		 */
		retiraAcentos: function(str){
			var com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
		    var sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
		    var novastr="";
		    for(i=0; i<str.length; i++) {
		        troca=false;
		        for (a=0; a<com_acento.length; a++) {
		            if (str.substr(i,1)==com_acento.substr(a,1)) {
		                novastr+=sem_acento.substr(a,1);
		                troca=true;
		                break;
		            }
		        }
		        if (troca==false) {
		            novastr+=str.substr(i,1);
		        }
		    }
		    return novastr;
		},

		/**
		 * Função getDate
		 * @description Retorna a data atual, formatada no padrão dd/mm/YYYY.
		 * @memberof USEFUL
		 * @returns {string} Retorna a data atual (dd/mm/YYYY)
		 * @example dataAtual = FLUIGJFI.USEFUL.getDate();
		 * @example USEFUL, data, get, formatação
		 * @example 
		 * @author
		 */
		getDate: function(){
			var currentTime 	= new Date();
			var month 			= currentTime.getMonth() + 1;
			var day 			= currentTime.getDate();
			var year 			= currentTime.getFullYear();
	
			str_dia = new String(day);
			str_mes = new String(month);
	
			if (str_dia.length < 2)
			str_dia = 0 + str_dia;
			if (str_mes.length < 2)
			str_mes = 0 + str_mes;
	
			return str_dia+"/"+str_mes+"/"+year;
		},

		/**
		 * Função getTime
		 * @description Retorna a hora atual, formatada no padrão hh:mm:ss.
		 * @memberof USEFUL
		 * @returns {string} Retorna a hora formatada (hh:mm:ss) 
		 * @example horaAtual = FLUIGJFI.USEFUL.getTime();
		 * @example USEFUL, hora, get, formatação
		 * @example 
		 * @author
		 */
		getTime: function(){
			var data = new Date();
	
			//obtem as horas, minutos e segundos
			var hour = data.getHours();
			var minutes = data.getMinutes();
			var seconds = data.getSeconds();
	
			//converte as horas, minutos e segundos para string
			str_hours = new String(hour);
			str_minutes = new String(minutes);
			str_seconds = new String(seconds);
	
			//se tiver menos que 2 digitos, acrescenta o 0
			if (str_hours.length < 2)
				str_hours = 0 + str_hours;
			if (str_minutes.length < 2)
				str_minutes = 0 + str_minutes;
			if (str_seconds.length < 2)
				str_seconds = 0 + str_seconds;
	
			return str_hours + ':' + str_minutes + ':' + str_seconds;
		},
		/**
		 * Função stringToDate
		 * @description Converte uma variável do tipo string em tipo data
		 * @memberof USEFUL
		 * @param {string} data String a ser convertida
		 * @returns {date} variável do tipo data	
		 * @example dataInicial = FLUIGJFI.USEFUL.stringToDate('01/01/2000');
		 * @example USEFUL, conversão, string, date
		 * @example 
		 * @author 
		 */
		stringToDate: function(data){
			data = data.split('/').reverse().join('/');
			var data = new Date((new Date(data)).setHours(0, 0, 0, 0));
			return data;
		},
		
		/**
		 * Função dateToString
		 * @description Converte uma variável do tipo data em tipo string
		 * @memberof USEFUL
		 * @param {date} data Data a ser convertida
		 * @param {string} locale Região da data a ser formatada. Default "pt-BR". (opcional)
		 * @returns {string} Variável do tipo string 	
		 * @example FLUIGJFI.USEFUL.dateToString(data);
		 * @example USEFUL, conversão, string, date
		 * @example 
		 * @author Alisson Hausmann
		 */
		dateToString: function(data, locale){
			if(locale == undefined){
				locale = "pt-BR";
			}
			return data.toLocaleDateString(locale);
		},

		/**
		 * Função getStringValue
		 * @description Converte a variável do tipo float em string, limitando as casas decimais de acordo com o valor informado.
		 * @memberof USEFUL
		 * @param {float} float Variável a ser convertida
		 * @param {int} decimal Número de casas decimais a serem preservadas
		 * @returns {string} string contendo o valor convertido
		 * @example precoFinal = FLUIGJFI.USEFUL.getStringValue(float, 2);
		 * @example USEFUL, conversão, string, float
		 * @example 
		 * @author
		 */
		getStringValue: function(float,decimal) {
			if(float == ""){
				float = 0;
			}
			decimal  = (typeof decimal !== 'undefined') ? decimal : 2;
			return float.toLocaleString("pt-BR", {minimumFractionDigits: decimal, maximumFractionDigits: decimal});
		},

		/**
		 * Função getFloatValue
		 * @description Converte uma string em float
		 * @memberof USEFUL
		 * @param {string} string String a ser convertida
		 * @returns {float} Float obtido após a conversão 
		 * @example float = FLUIGJFI.USEFUL.getFloatValue(valor);
		 * @example USEFUL, conversão, string, float
		 * @example 
		 * @author
		 */
		getFloatValue: function(string) {
			if(string == ""){
				string = "0"
			}
			string = FLUIGJFI.USEFUL.replaceAll(string, ".", "");
			string = FLUIGJFI.USEFUL.replaceAll(string, ",", ".");
			return parseFloat(string);
		},

		/**
		 * Função replaceAll
		 * @description Altera a string informada, de acordo com os parâmetros 
		 * @memberof USEFUL
		 * @param {string} string String original
		 * @param {string} fromValue Valor a ser substituído
		 * @param {string} toValue Valor a substituir
		 * @returns {string} String modificada
		 * @example novaString = FLUIGJFI.USEFUL.replaceAll(stringOriginal, fromValue, toValue);
		 * @example USEFUL, alteração, string
		 * @example 
		 * @author
		 */
		replaceAll: function(string, fromValue, toValue){
			if (typeof string == "string") {
				while (string.indexOf(fromValue) != -1) {
					string = string.replace(fromValue, toValue);
				}
				return string;
			} else {
				console.log("argument 'string' on replaceAll is not a string")
				return null;
			}
		},

		/**
		 * Função getIdChild
		 * @description Retorna o ID de uma linha do pai x filho
		 * @memberof USEFUL
		 * @param {string} name Name da linha
		 * @returns {string} Id da linha
		 * @example idLinha = FLUIGJFI.USEFUL.getIdChild(nome);
		 * @example USEFUL, get
		 * @example 
		 * @author
		 */
		//FIXME: Não testado
		getIdChild: function(name){
			var comp =  name.split("___");
			if (comp.length  == 1){
				return "0";
			}else{
				return comp[1];
			}
		},

		/**
		 * Função showError
		 * @description Exibe a mensagem de erro em um toast
		 * @memberof USEFUL
		 * @param {string} msg Mensagem a ser exibida
		 * @example FLUIGJFI.USEFUL.showError(mensagem);
		 * @example USEFUL, mensagem, erro, toast
		 * @example pdevip/resources/assets/images/doc/showError.PNG
		 * @author
		 */
		showError: function(msg) {
			FLUIGC.toast({ 	title: 'Erro:',
							message: msg, 
							type: 'danger'
						});
		},
		/**
		 * Função showSuccess
		 * @description Exibe a mensagem de sucesso em um toast
		 * @memberof USEFUL
		 * @param {string} msg Mensagem a ser exibida
		 * @example FLUIGJFI.USEFUL.showSuccess(mensagem);
		 * @example USEFUL, mensagem, sucesso, toast
		 * @example pdevip/resources/assets/images/doc/showSuccess.JPG
		 * @author Andressa Oliveira
		 */
		showSuccess: function(msg) {
			FLUIGC.toast({ title: 'Sucesso:', message: msg, type: 'success' });
		},

		/**
		 * Função showWarning
		 * @description Exibe mensagem do tipo warning em um toast
		 * @memberof USEFUL
		 * @param {string} msg Mensagem a ser exibida
		 * @example FLUIGJFI.USEFUL.showWarning(mensagem);
		 * @example USEFUL, mensagem, warning, toast
		 * @example pdevip/resources/assets/images/doc/showWarning.PNG
		 * @author
		 */
		showWarning: function(msg) {
			FLUIGC.toast({ title: 'Aviso:', message: msg, type: 'warning', timeout: 3000 });
		},

		/**
		 * Função showInfo
		 * @description Exibe mensagem do tipo info em um toast
		 * @memberof USEFUL
		 * @param {string} msg Mensagem a ser exibida
		 * @example FLUIGJFI.USEFUL.showInfo(mensagem);
		 * @example USEFUL, mensagem, info, toast
		 * @example pdevip/resources/assets/images/doc/showInfo.PNG
		 * @author
		 */
		showInfo: function(msg) {
			FLUIGC.toast({ title: 'Informa&ccedil;&atilde;o:', message: msg, type: 'info' });
		},

		/**
		 * Função showMessage
		 * @description Exibe mensagem personalizada em um toast
		 * @memberof USEFUL
		 * @param {string} msg Mensagem a ser exibida
		 * @param {string} title Título da mensagem
		 * @param {string} label Texto do botão
		 * @example FLUIGJFI.USEFUL.showMessage(mensagem, titulo, textoBotao);
		 * @example USEFUL, mensagem, toast
		 * @example pdevip/resources/assets/images/doc/showMessage.PNG
		 * @author
		 */
		showMessage: function(msg, title, label) {
			message = typeof msg !== 'undefined' ? msg : "";
			title = typeof title !== 'undefined' ? title : "Alert";
			label = typeof label !== 'undefined' ? label : "OK";
			FLUIGC.message.alert({
				message: msg,
				title: title,
				label: label
			});
		},

		/**
		 * Função clearFields
		 * @description Ao limpar o campo de referência, limpa todos os campos que possuam a classe ou o id informado
		 * @memberof USEFUL
		 * @param {string} fieldId id do campo de referência
		 * @param {string} selector classe ou id dos campos a serem limpos
		 * @example FLUIGJFI.USEFUL.clearFields("#cep",".endereco"); FLUIGJFI.USEFUL.clearFields("#cidade","#UF");
		 * @example USEFUL, limpa, campos, classe, id
		 * @example 
		 * @author Andressa Oliveira
		 */
		clearFields: function(fieldId, selector) {
			//quando o usuário 'soltar' uma tecla no campo de referência
			$(fieldId).keyup(function() {
				//se nao houver um valor no campo
				if (!this.value) {
					//para cada item que possua o seletor informado
					$(selector).each(function () {
						//limpa o campo
						$(selector).val('');
						$(selector).prop('checked', false);
						$(selector).removeAttr('selected');
					});	
				}
			}
		)},
		/**
		 * Função setDateRange
		 * @description Habilita um calendário com um espaço de datas pré-definido para seleção, ou seja, o usuário só poderá escolher uma data que esteja entre a data mínima e a data máxima definida. Esse método recebe 3 parâmetros: a data de referência, a quantidade de dias anteriores a referência e a quantidade de dias posteriores à mesma.
		 * @memberof USEFUL
		 * @param {string} calendarId id do campo de referência
		 * @param {string} initialDate id do campo de referência
		 * @param {string} daysBefore classe ou id dos campos a serem limpos
		 * @param {string} daysAfter classe ou id dos campos a serem limpos
		 * @example FLUIGJFI.USEFUL.setDateRange("#meu-calendario","05/03/2020", 2, 10);
		 * @example USEFUL, calendário, range, datas, data inicial, data final, seleção
		 * @example 
		 * @author Andressa Oliveira
		 */
		setDateRange: function(calendarVar, initialDate, daysBefore, daysAfter) {
			var dataInicial, dataFinal;
			//validações
			if (FLUIGJFI.USEFUL.isNull(daysBefore)) daysBefore = 0;
			if (FLUIGJFI.USEFUL.isNull(daysAfter)) daysAfter = 0;
			if (FLUIGJFI.USEFUL.isNull(initialDate)) {
				initialDate = new Date();
				dataInicial = initialDate;
				dataFinal = initialDate;
				
			}else{
				dataInicial = FLUIGJFI.USEFUL.stringToDate(initialDate);
				dataFinal = FLUIGJFI.USEFUL.stringToDate(initialDate);

			}
			
			//atribui a data de referencia pra início e fim
			dataInicial = dataInicial.setDate(dataInicial.getDate() - daysBefore);
			dataFinal = dataFinal.setDate(dataFinal.getDate() + daysAfter);
			calendarVar.setDate(initialDate);
			calendarVar.setMinDate(new Date(dataInicial));
			calendarVar.setMaxDate(new Date(dataFinal));
			}
	}
	

	//Propriedade VALID
	this.VALID = {


		/**
		 * Função validateGrid
		 * @description Verifica se a tabela possui linhas
		 * @memberof VALID
		 * @param {string} idTablePaiFilho Id da tabela
		 * @returns {boolean}  Retorna True ou False
		 * @example temLinhas = FLUIGJFI.VALID.validateGrid('tabela');
		 * @example VALID, verificação, tabela, linhas
		 * @example 
		 * @author
		 */
		validateGrid:  function(idTablePaiFilho){
			var tableLength = $("#"+idTablePaiFilho+" tbody tr").length;
			if (tableLength <= 1){
				return false
			}else{
				return true;
			}
		},

		/**
		 * Função validDuplicateValueGrid
		 * @description Verifica se o valor passado já existe na tabela. Caso exista, retorna true, caso contrário, retorna false.
		 * @deprecated isDuplicatedOnGrid
		 * @memberof VALID
		 * @param {string} idTable Id da tabela
		 * @param {string} idField Id do campo
		 * @param {string} value Valor a ser comparado
		 * @returns {boolean} True ou false
		 * @example eDuplicado = FLUIGJFI.VALID.validDuplicateValueGrid("tabelaClientes", "nomeCliente", "Maria"));
		 * @example VALID, validação, verificação, tabela, grid
		 * @example 
		 * @author
		 * 
		 */
		validDuplicateValueGrid: function(idTable, idField, value){
	
			var itens = FLUIGJFI.TABLE.getTableSize(idTable);
			var count = 0;
			var retorno = false;
			var valor = "";
			if (!FLUIGJFI.USEFUL.isNull(value)) {
				for (var i = 1; i <= itens; i++) {
					valor = (FLUIGJFI.USEFUL.isNull(document.getElementById(idField+"___"+i))) ? "" : document.getElementById(idField+"___"+i).value;
					
					if (valor == value) {
						count++;
					}
					if (count > 1) {
						retorno = true;
						break;
					}
					
				}
			}
			return retorno;
		},
		/**
		 * Função isDuplicatedOnGrid
		 * @description Verifica se o valor passado já existe na tabela. Caso exista, retorna true, caso contrário, retorna false.
		 * @memberof VALID
		 * @param {string} idTable Id da tabela
		 * @param {string} idField Id do campo
		 * @param {string} value Valor a ser comparado
		 * @returns {boolean} True ou false
		 * @example eDuplicado = FLUIGJFI.VALID.isDuplicatedOnGrid("tabelaClientes", "nomeCliente", "Maria"));
		 * @example VALID, validação, verificação, tabela, grid
		 * @example  
		 * @author
		 * 
		 */
		isDuplicatedOnGrid: function(idTable, idField, value){
			var count = 0;
			var retorno = false;
			var valor = "";
			if (!FLUIGJFI.USEFUL.isNull(value)) {
				$("#"+idTable+" tbody tr").each(function(){
					var id = FLUIGJFI.USEFUL.getIdChild($(this).find("input:first").attr("name"));
					if(id > 0){
						valor = (FLUIGJFI.USEFUL.isNull(document.getElementById(idField+"___"+id))) ? "" : document.getElementById(idField+"___"+id).value;
						if (valor == value) {
							count++;
						}
						if (count > 1) {
							retorno = true;
						}
					}
				});
			}
			return retorno;
		}
	}     
}


//FUNCOES AUXILIARES

/**
 * Função beforeSendValidate
 * @description Valida o formulário antes do envio (chamada automaticamente pelo Fluig ao enviar um form). Antes de validar o formulário, esse método chama a função beforeValidateForm_PE(numState, nextState) e antes de efetuar o envio do form chama a função beforeSendValidate_PE(numState,nextState).
 * @memberof FLUIGJFI
 * @param {int} numState Atividade atual
 * @param {int} nextState Próxima atividade
 * @example beforeSendValidate(numState, nextState);
 * @example FLUIGJFI, validação, verificação
 * @example
 * @author
 */


/*
* jQuery Mask Plugin v1.14.13
* github.com/igorescobar/jQuery-Mask-Plugin
* http://igorescobar.github.io/jQuery-Mask-Plugin/docs.html
*/
var $jscomp={scope:{},findInternal:function(a,l,d){a instanceof String&&(a=String(a));for(var p=a.length,h=0;h<p;h++){var b=a[h];if(l.call(d,b,h,a))return{i:h,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,l,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[l]=d.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,l,d,p){if(l){d=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var h=a[p];h in d||(d[h]={});d=d[h]}a=a[a.length-1];p=d[a];l=l(p);l!=p&&null!=l&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:l})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");
(function(a,l,d){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(l||d)})(function(a){var l=function(b,e,f){var c={invalid:[],getCaret:function(){try{var a,r=0,g=b.get(0),e=document.selection,f=g.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-c.val().length),r=a.text.length;else if(f||"0"===f)r=f;return r}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c,
g=b.get(0);g.setSelectionRange?g.setSelectionRange(a,a):(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select())}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){d===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){d=c.val()}).on("focus.mask",function(b){!0===f.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){f.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,f,n,d=0;d<e.length;d++)(b=m.translation[e.charAt(d)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,
(b=b.recursive)?(a.push(e.charAt(d)),n={digit:e.charAt(d),pattern:c}):a.push(f||b?c+"?":c)):a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");n&&(a=a.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
c=b}else c=b[c]();return c},calculateCaretPosition:function(){var a=b.data("mask-previus-value")||"",e=c.getMasked(),g=c.getCaret();if(a!==e){var f=b.data("mask-previus-caret-pos")||0,e=e.length,d=a.length,m=a=0,h=0,l=0,k;for(k=g;k<e&&c.maskDigitPosMap[k];k++)m++;for(k=g-1;0<=k&&c.maskDigitPosMap[k];k--)a++;for(k=g-1;0<=k;k--)c.maskDigitPosMap[k]&&h++;for(k=f-1;0<=k;k--)c.maskDigitPosMapOld[k]&&l++;g>d?g=10*e:f>=g&&f!==d?c.maskDigitPosMapOld[g]||(f=g,g=g-(l-h)-a,c.maskDigitPosMap[g]&&(g=f)):g>f&&
(g=g+(h-l)+m)}return g},behaviour:function(f){f=f||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,m.byPassKeys)){var e=c.getMasked(),g=c.getCaret();setTimeout(function(){c.setCaret(c.calculateCaretPosition())},10);c.val(e);c.setCaret(g);return c.callbacks(f)}},getMasked:function(a,b){var g=[],d=void 0===b?c.val():b+"",n=0,h=e.length,q=0,l=d.length,k=1,r="push",p=-1,t=0,y=[],v,z;f.reverse?(r="unshift",k=-1,v=0,n=h-1,q=l-1,z=function(){return-1<n&&-1<q}):(v=h-1,z=function(){return n<
h&&q<l});for(var A;z();){var x=e.charAt(n),w=d.charAt(q),u=m.translation[x];if(u)w.match(u.pattern)?(g[r](w),u.recursive&&(-1===p?p=n:n===v&&n!==p&&(n=p-k),v===p&&(n-=k)),n+=k):w===A?(t--,A=void 0):u.optional?(n+=k,q-=k):u.fallback?(g[r](u.fallback),n+=k,q-=k):c.invalid.push({p:q,v:w,e:u.pattern}),q+=k;else{if(!a)g[r](x);w===x?(y.push(q),q+=k):(A=x,y.push(q+t),t++);n+=k}}d=e.charAt(v);h!==l+1||m.translation[d]||g.push(d);g=g.join("");c.mapMaskdigitPositions(g,y,l);return g},mapMaskdigitPositions:function(a,
b,e){a=f.reverse?a.length-e:0;c.maskDigitPosMap={};for(e=0;e<b.length;e++)c.maskDigitPosMap[b[e]+a]=1},callbacks:function(a){var h=c.val(),g=h!==d,m=[h,a,b,f],q=function(a,b,c){"function"===typeof f[a]&&b&&f[a].apply(this,c)};q("onChange",!0===g,m);q("onKeyPress",!0===g,m);q("onComplete",h.length===e.length,m);q("onInvalid",0<c.invalid.length,[h,a,b,c.invalid,f])}};b=a(b);var m=this,d=c.val(),h;e="function"===typeof e?e(c.val(),void 0,b,f):e;m.mask=e;m.options=f;m.remove=function(){var a=c.getCaret();
c.destroyEvents();c.val(m.getCleanVal());c.setCaret(a);return b};m.getCleanVal=function(){return c.getMasked(!0)};m.getMaskedVal=function(a){return c.getMasked(!1,a)};m.init=function(d){d=d||!1;f=f||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,f.translation);m=a.extend(!0,{},m,f);h=c.getRegexMask();if(d)c.events(),c.val(c.getMasked());else{f.placeholder&&b.attr("placeholder",f.placeholder);b.data("mask")&&
b.attr("autocomplete","off");d=0;for(var l=!0;d<e.length;d++){var g=m.translation[e.charAt(d)];if(g&&g.recursive){l=!1;break}}l&&b.attr("maxlength",e.length);c.destroyEvents();c.events();d=c.getCaret();c.val(c.getMasked());c.setCaret(d)}};m.init(!b.is("input"))};a.maskWatchers={};var d=function(){var b=a(this),e={},f=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(e.selectOnFocus=
!0);if(p(b,f,e))return b.data("mask",new l(this,f,e))},p=function(b,e,f){f=f||{};var c=a(b).data("mask"),d=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof e&&(e=e(b)),"object"!==typeof c||d(c.options)!==d(f)||c.mask!==e}catch(t){}},h=function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,h=c.watchInterval,c=d.watchInputs||c.watchInputs,
t=function(){if(p(this,b,d))return a(this).data("mask",new l(this,b,d))};a(this).each(t);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(t)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};
a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)};h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&h("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},
S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};h=a.jMaskGlobals=a.extend(!0,{},h,a.jMaskGlobals);h.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},h.watchInterval)},window.jQuery,window.Zepto);

/*
CSS
*/
$('<style type="text/css"> .required::after {content: "*";color: red;} </style>').appendTo("head");
$('<style type="text/css"> .has-error-table {border: 1px solid #a94442 !important;} </style>').appendTo("head");
$('<style type="text/css"> span.fluig-style-guide.fs-display-block.fs-md-space {padding: 2px 20px !important;} </style>').appendTo("head");



//FIXME: Não testado
var tdizoom = (function () {
	var zoommodal = null;
	var loading = FLUIGC.loading('#loading-zoom');
	return {
		/**
		 * Função open
		 * @description Aplica a personalização criada pela TOTVSIP ao campo do tipo Zoom. Utilize o tdizoom.open para zoom comum e tdizoomCheck.open para zoom com opção de multipla escolha.
		 * @memberof TDIZOOM
		 * @param {*} dataset Dataset a ser consultado
		 * @param {*} fields Campos a serem mostrados
		 * @param {*} resultfields
		 * @param {*} title Título
		 * @param {*} filters Filtros
		 * @param {*} type Tipo
		 * @param {*} likefield likefield
		 * @param {*} likevalue likevalue
		 * @param {*} searchby Pesquisar por
		 * @returns Retorna HTML com o campo zoom personalizado
		 * @example tdizoom.open("nomeDataset", "campoDataset1,nomeColuna1,campoDataset2,nomeColuna2", "campoDataset1,campoDataset3", "Titulo", "filtro,valorfiltro", "nome_do_campo");
		 * @example TDIZOOM, ZOOM
		 * @example
		 * @author 
		 */
		//TODO: Rever descrição, descrever parâmetros e verificar o exemplo
		open: function (dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {

			isHeaderVisible = $("#workflowview-header", window.parent.document).is(":visible");
			isFixedVisible = $(".fixedTopBar", window.parent.document).is(":visible");
			isHeaderHide = null;
			isFixedHide = null;
			if (isHeaderVisible) {
				$("#workflowview-header", window.parent.document).hide();
				isHeaderHide = true;
			}
			if (isFixedVisible) {
				$(".fixedTopBar", window.parent.document).hide();
				isFixedHide = true;
			}


			//alert(window.innerHeight);
			mobile = (typeof mobile !== 'undefined') ? mobile : "false";
			if (mobile == "true") {
				//$("form").hide();
			}

			console.log(likefield)

			loading.show();

			var showfields = [];
			var globaldataset = [];
			var current = 0;

			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;

				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}

			var html = "<body class='fluig-style-guide' style='z-index:-1'>";
			html += "<div class='input-group'>";
			html += "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>";
			html += "<input type='text' class='form-control' id='search' value='" + $("#" + type).val() + "' placeholder='Digite no minimo 3 caracteres para realizar a busca  utilize o <Enter> para buscar'>";
			html += "</div>";
			if (typeof miniZoom != "undefined") {
				html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 120px;'>";
			} else {
				html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 300px;'>";
			}
			html += "<table  class='table table-hover table-zoom'>";
			html += "<thead>";
			html += "</thead>";
			html += "<tbody>";
			html += "</tbody>";
			html += "</table>";
			html += "</div>";
			html += "</body>";
			html += "</body>";

			html += " <div>";
			html += "		<span class='form-control-static pull-left'>";
			html += "			<font color='#FF0000' >Para a busca mais detalhada digitar palavra ou parte dela no campo de busca. </font>";
			html += "		</span>";
			html += " </div>";

			var sizeZoom = "full";
			if (typeof miniZoom != "undefined") {
				sizeZoom = "large";
			}

			var zoommodal = FLUIGC.modal({
				title: title,
				content: html,
				formModal: false,
				size: sizeZoom,
				id: 'modal-zoom-' + type,
				actions: [{
					'label': 'Selecionar',
					'classType': 'zoom-selected btn-warning',
					'autoClose': false
				}, {
					'label': 'Fechar',
					'classType': 'zoom-close btn-danger',
					'autoClose': false
				}, {
					'label': 'Top',
					'classType': 'zoom-top btn-primary',
					'autoClose': false
				}]
			}, function (err, data) {
				if (err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
				} else {
					var trimarray = function (fields) {
						for (var i = 0; i < fields.length; i++) {
							fields[i] = fields[i].trim();
						}
						return fields;
					}
                    var campo = $("#" + type).val()
                    if(campo.length>=3){
                        var urlrequest = function () {
                            var request = "/ecm/api/rest/ecm/dataset/",
                                json = {};
    
                            if (dataset != null) {
                                request += "getDatasetZoom";
                                json.datasetId = dataset;
                            } else if (cardDatasetId != null) {
                                request += "getCardDatasetValues";
                                json.cardDatasetId = cardDatasetId;
                            }
    
                            if (resultfields != null && resultfields.length > 0) {
                                json.resultFields = trimarray(resultfields.split(","));
                            }
    
                            if (filters != null && filters.length > 0) {
                                json.filterFields = trimarray(filters.split(","));
                            }
    
                            if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0) {
                                json.likeField = likefield;
                                json.likeValue = likevalue;
                            }
    
                            var searchValue = $("#search").val();
                            if (searchValue && searchValue.length > 0) {
                                json.searchValue = searchValue;
    
                                if (searchby && searchby != "") {
                                    json.searchField = searchby;
                                } else {
                                    json.searchField = fields.split(",")[0];
                                }
                            }
                            else if (searchValue == "") {
                                json.searchValue = "";
    
                                if (searchby && searchby != "") {
                                    json.searchField = searchby;
                                } else {
                                    json.searchField = fields.split(",")[0];
                                }
                            }
    
                            return request += "?json=" + encodeURIComponent(JSON.stringify(json));
                        };
                    }
					

					var searchtable = function (text) {
						var keys = (typeof zoomKeyUp !== 'undefined') ? zoomKeyUp : 1;
						if (text.length >= keys || text.length == 0) {
							var table = $('.table-zoom > tbody');
							table.find('tr').each(function (index, row) {
								var allCells = $(row).find('td');
								if (allCells.length > 0) {
									var found = false;
									allCells.each(function (index, td) {
										var regExp = new RegExp(text, 'i');
										if (regExp.test($(td).text())) {
											found = true;
											return false;
										}
									});
									if (found == true) $(row).show(); else $(row).hide();
								}
							});
						}

					}

					var setup = function (lista) {
						$(".table-zoom > thead").html("");
						var l = lista.split(",");
						var html = "<tr>";
						for (var i = 0; i < l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i + 1] + "</th>"
							i++;
						}
						html += "</tr>";
						$(".table-zoom > thead").append(html);
					}

					var readydataset = function (dataset) {
						globaldataset = dataset;
						for (var i = 0; i < dataset.length; i++) {
							var row = dataset[i];
							if (i == 0) {
								var classe = "active";
							} else {
								var classe = "";
							}
							var html = "<tr data-dataset=" + i + " class='" + classe + "'>";
							for (var x = 0; x < showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";

							}
							html += "</tr>";
							$(".table-zoom > tbody").append(html);


						}
						if(dataset.length == 1){
							var row = globaldataset[$(".table-zoom tbody .active").data("dataset")];
				 			row["type"] = type;
				 			zoommodal.remove();
				 			setSelectedZoomItem(row);
				 			
				 			if(isHeaderHide){
				 				$("#workflowview-header",window.parent.document).show();
				 			}
				 			if(isFixedHide){
				 				$(".fixedTopBar",window.parent.document).show();
				 			}
				 			
				 			if (mobile == "true"){
								//$("form").show();
							}
				 			$("#"+type).focus();
				 		}
						$(".table-zoom > tbody > tr").click(function () {
							$(".table-zoom > tbody > tr").removeClass("active");
							$(this).addClass("active");
							current = $(this).data("dataset");
						});
						$(".table-zoom > tbody > tr").dblclick(function () {
							var row = globaldataset[$(this).data("dataset")];
							row["type"] = type;
							zoommodal.remove();
							setSelectedZoomItem(row);
							;
							if (isHeaderHide) {
								$("#workflowview-header", window.parent.document).show();
							}
							if (isFixedHide) {
								$(".fixedTopBar", window.parent.document).show();
							}

							if (mobile == "true") {
								//$("form").show();
							}
							$("#" + type).nextAll('input').first().focus();
						});
						$("#search").focus();
						loading.hide();
					}
					var finished = true;
					var dosearch = function () {
						finished = false;
						var url = urlrequest();
						$(".table-zoom > tbody").html("");

						console.log("url", url)

						loading.show();

						$.ajax({
							type: "GET",
							dataType: "json",
							url: url,
							data: "",
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								console.log("dataset error", XMLHttpRequest, textStatus, errorThrown);
								finished = true;
							},
							success: function (data, status, xhr) {
								console.log("dataset sucess", data, status, xhr)
								var dataset = data["invdata"];
								readydataset(dataset);
								finished = true;
							}
						});
					}

					var timeout;
					$('#search').keyup(function (e) {
						console.log("search", e)
						clearTimeout(timeout);
						var keycode;
						if (window.event) {
							keycode = window.event.keyCode;
						} else if (e) {
							keycode = e.which;
						} else {
							return true;
						}
						console.log("search", keycode);
						if (keycode == 13) {
							if (finished) {
								dosearch();
							}
						} else {
							timeout = setTimeout(searchtable($(this).val()), 500);
						}
					});

					$('.zoom-selected').click(function () {
						var row = globaldataset[current];
						row["type"] = type;
						zoommodal.remove();
						setSelectedZoomItem(row);
						if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}

						if (mobile == "true") {
							//$("form").show();
						}
						$("#" + type).nextAll('input').first().focus();
					});

					$('.zoom-close').click(function () {
						if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}
						if (mobile == "true") {
							//$("form").show();
						}
						$("#" + type).val("");
						$("#"+type).val($("#search").val());
						$("#"+type).trigger("#change");
						zoommodal.remove();
						removedZoomItem(type);
						
						$("#" + type).focus();
					});

					$('.zoom-top').click(function () {
						$('#loading-zoom').scrollTop(0);
					});



					$('.modal-header .close').click(function () {
						if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}
						if (mobile == "true") {
							//$("form").show();
						}
					});

					setup(fields);
					dosearch();

				}
			});

		},
		/**
		 * Função trigger
		 * @description Realiza o gatilho do campo zoom personalizado baseado nos parametros informados. (chama as funções padrões setSelectedZoomItem e removedZoomItem)
		 * @memberof TDIZOOM
		 * @param {*} dataset Dataset a ser consultado
		 * @param {*} searchby Pesquisar por
		 * @param {*} searchValue Valor a ser pesquisado
		 * @param {*} filters Filtro
		 * @param {*} type Tipo
		 * @example tdizoom.trigger("nomeDataset", "campoDatasetPesquisar", "valorPesquisar", "filtro,valorfiltro", "nome_do_campo");
		 * @example TDIZOOM, ZOOM
		 * @example 
		 * @author Alisson Hausmann
		 */
		trigger: function (dataset, searchby, searchValue, filters, type) {
	        var trimarray = function (fields) {
	            for (var i = 0; i < fields.length; i++) {
	                fields[i] = fields[i].trim();
	            }
	            return fields;
	        }
	        var urlrequest = function () {
	            var request = "/ecm/api/rest/ecm/dataset/";
	            var json = {};
	
	            if (dataset != null) {
	                request += "getDatasetZoom";
	                json.datasetId = dataset;
	            } else if (cardDatasetId != null) {
	                request += "getCardDatasetValues";
	                json.cardDatasetId = cardDatasetId;
	            }
	
	            if (filters != null && filters.length > 0) {
	                json.filterFields = trimarray(filters.split(","));
	            }
	
	            if (searchValue && searchValue.length > 0) {
	                json.searchValue = searchValue;
	                json.searchField = searchby;
	            }else if (searchValue == "") {
	                json.searchValue = "";
	                json.searchField = searchby;
	            }
	            return request += "?json=" + encodeURI(JSON.stringify(json));
	        };
	
	        var dosearch = function () {
	            var url = urlrequest();
	            $.ajax({
	                type: "GET",
	                dataType: "json",
	                url: url,
	                data: "",
	                error: function() {
	                    removedZoomItem(type);
	                },
	                success: function (data) {
	                    var dataset = data["invdata"];
	                    if(dataset.length > 0 && searchValue.trim() != ""){
	                        var row = dataset[0];
	                        row["type"] = type;
	                        setSelectedZoomItem(row);
	                    }else{
	                        removedZoomItem(type);
	                    }
	                }
	            });
	        }
	        dosearch();
		}
	}
})();

var tdizoomCheck = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading('#loading-zoom');
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			isHeaderVisible = $("#workflowview-header", window.parent.document).is(":visible");
			isFixedVisible = $(".fixedTopBar", window.parent.document).is(":visible");
			isHeaderHide = null;
			isFixedHide = null;
			if (isHeaderVisible) {
				$("#workflowview-header", window.parent.document).hide();
				isHeaderHide = true;
			}
			if (isFixedVisible) {
				$(".fixedTopBar", window.parent.document).hide();
				isFixedHide = true;
			}
			
			mobile = (typeof mobile !== 'undefined') ? mobile : "false";
			if (mobile == "true") {
				//$("form").hide();
			}
			
			console.log(likefield)
			
	 		loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide' style='z-index:-1'>" ;
			html += "<div class='input-group'>" ;
			html += "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" ;
			html += "<input type='text' class='form-control' id='search' value='" + ($("#"+type).length > 0 ? $("#"+type).val() : "") + "' placeholder='Digite o texto e utilize o <Enter> para buscar'>";
			html += "</div>" ;
			if (typeof miniZoom != "undefined") {
				html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 120px;'>";
			} else {
				html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 300px;'>";
			}
			html += "<table  class='table table-hover table-zoom'>" ;
			html += "<thead>" ;
			html += "</thead>" ;
			html += "<tbody>" ;
			html += "</tbody>" ;
			html += "</table>" ;
			html += "</div>" ;
			html += "</body>";
			
			html += " <div>";
			html += "		<span class='form-control-static pull-left'>";
			html += "			<font color='#FF0000' >Para a busca mais detalhada digitar palavra ou parte dela no campo de busca. </font>";
			html += "		</span>";
			html += " </div>";
			
			var sizeZoom = "full";
			if (typeof miniZoom != "undefined") {
				sizeZoom = "large";
			}
			
			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: sizeZoom,
			    id: 'modal-zoom-' + type,
			    actions: [
			    {
			        'label': 'Selecionar Todos',
			        'classType': 'check-all btn-info',
			        'autoClose': false,
			    },
			    {
			        'label': 'Confirmar',
			        'classType': 'zoom-selected btn-warning',
			        'autoClose': false,
			    },{
			        'label': 'Fechar',
			        'classType': 'zoom-close',
			        'autoClose': false
			    },{
			        'label': 'Top',
			        'classType': 'zoom-top btn-primary',
			        'autoClose': false
			    }]
			}, function(err, data) {
			    if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
			    } else {
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }
					
					check = false;
					
					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};
					    
					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }
					    
					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }
					    
					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }
					    
					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }
					    
					    var searchValue = $("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;
					    	
					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField = fields.split(",")[0];
					    	}
					    	
					    }
					    
					    return request +="?json=" + encodeURIComponent(JSON.stringify(json));
					};
					var searchtable = function (text) {
						var keys = (typeof zoomKeyUp !== 'undefined') ? zoomKeyUp : 1;
						if (text.length >= keys || text.length == 0) {
							var table = $('.table-zoom > tbody');
							table.find('tr').each(function (index, row) {
								var allCells = $(row).find('td');
								if (allCells.length > 0) {
									var found = false;
									allCells.each(function (index, td) {
										var regExp = new RegExp(text, 'i');
										if (regExp.test($(td).text())) {
											found = true;
											return false;
										}
									});
									if (found == true) $(row).show(); else $(row).hide();
								}
							});
						}
					}
					
					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							if (i==0){
								html += "<th class=''></th>"
							}
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								if(x==0){
									html += "<td><input class='check-return' type='checkbox' id='check_zoom___"+i+"'/></td>";
								}
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
						}
				 		loading.hide();
					}
					var finished = true;
					var dosearch = function () {
						finished = false;
						var url = urlrequest();
						$(".table-zoom > tbody").html("");

						console.log("url", url)

						loading.show();

						$.ajax({
							type: "GET",
							dataType: "json",
							url: url,
							data: "",
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								console.log("dataset error", XMLHttpRequest, textStatus, errorThrown);
								finished = true;
							},
							success: function (data, status, xhr) {
								console.log("dataset sucess", data, status, xhr)
								var dataset = data["invdata"];
								readydataset(dataset);
								finished = true;
							}
						});
					}

					var timeout;
					$('#search').keyup(function (e) {
						console.log("search", e)
						clearTimeout(timeout);
						var keycode;
						if (window.event) {
							keycode = window.event.keyCode;
						} else if (e) {
							keycode = e.which;
						} else {
							return true;
						}
						console.log("search", keycode);
						if (keycode == 13) {
							if (finished) {
								dosearch();
							}
						} else {
							timeout = setTimeout(searchtable($(this).val()), 500);
						}
					});	 		
			 		
			 		$(".check-all").click(function(){
			 			if (!check){
			 				$(".check-return").prop("checked", true);
			 				check = true;
			 			}else{
			 				$(".check-return").prop("checked", false);
			 				check = false;
			 			}
			 	   });
					
			 		$('.zoom-selected').click(function() {
			 			$(".check-return").each(function(){
			 				if ($(this).is(":checked")){
			 					if(!$(this).hasClass("hide-line")){
			 						var id = $(this).attr("id").split("___");
			 						var current = parseInt(id[1]);
						 			var row = globaldataset[current];
						 			row["type"] = type;
						 			setSelectedZoomItem(row);
						 			if (mobile == "true"){
										//$("form").show();
									}
			 					}
			 				}
			 			})
			 			zoommodal.remove();
			 			if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}
					});
			 		
			 		$('.zoom-close').click(function() {
			 			if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}
			 			if (mobile == "true"){
							//$("form").show();
						}
			 			removedZoomItem(type);
			 			zoommodal.remove();
			 			if($("#"+type).length > 0){
			 				$("#" + type).val("");
			 				$("#" + type).focus();
			 			}
					});
			 		
			 		$('.zoom-top').click(function() {
			 			$('#loading-zoom').scrollTop(0);
					});
			 		
			 		
			 		
			 		$('.modal-header .close').click(function() {
			 			if (isHeaderHide) {
							$("#workflowview-header", window.parent.document).show();
						}
						if (isFixedHide) {
							$(".fixedTopBar", window.parent.document).show();
						}
						if (mobile == "true") {
							//$("form").show();
						}
					});
			 		
			 		setup(fields);
			 		dosearch();

			    }
			});
		}
	}
})();
