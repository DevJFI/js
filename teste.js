function afterTaskSave(colleagueId,nextSequenceId,userList){
	var idgrupo="TI";
	var usuario = getValue('WKUser');
	log.info("######## NEXT SEQUENCEID: "+nextSequenceId)
	log.error("#### atualizacao CHIP")
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO");
	if(tipo!="Celular" && tipo!="Linha" && tipo!="Celular e Linha"){
		if(nextSequenceId=='54'){//VERIFICAR ORCAMENTO
			AtualizaValores()
			LinkAnexo()
		}
		if(nextSequenceId==87 || nextSequenceId==89 || nextSequenceId ==20 || nextSequenceId==22 || nextSequenceId==107){
			movimenta_task('1201786043276003', hAPI.getCardValue('IDASANA'))//JFI
			movimenta_task('1203701610894702', hAPI.getCardValue("IDASANAFILHO"))//DIGITAL
			var aprovadorpor = hAPI.getCardValue('aprovadores')
			if(nextSequenceId=='87' || nextSequenceId=='107'){//Gerente Regional || Gestor CDC
				NomeAprovador(hAPI.getCardValue('aprovador1'))
				//hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador1'))
			}
			else if(nextSequenceId=='89' /*|| nextSequenceId=='20'*/){//Gerente Geral
				AprovadoPor(hAPI.getCardValue('aprovador1'))
				NomeAprovador(hAPI.getCardValue('aprovador2'))
				if(aprovadorpor==''){
					hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador2'))
				}
				else{
					aprovadorpor+=", "+hAPI.getCardValue('aprovador2')
					hAPI.setCardValue('aprovadores',aprovadorpor)
				}
			}
			else if(nextSequenceId=='22'){//Diretoria
				AprovadoPor(hAPI.getCardValue('aprovador2'))
				NomeAprovador(hAPI.getCardValue('aprovador3'))
				if(aprovadorpor==''){
					hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador1'))
				}
				else{
					aprovadorpor+=", "+hAPI.getCardValue('aprovador3')
					hAPI.setCardValue('aprovadores',aprovadorpor)
				}
			}
		}
		// ETAPA 28 - APROVADO: OCORRE NO ARQUIVO TI_ReqEquipamentoV2.servicetask22.js
		else if(nextSequenceId==66 || nextSequenceId== 14 || nextSequenceId==110 || nextSequenceId==94){//REPROVADO
			if( hAPI.getCardValue('IDASANA_Estoque')!=''){
				movimenta_task('1208408547857428', hAPI.getCardValue('IDASANA_Estoque'))//
				var ST_Estoque = hAPI.getCardValue('ST_Estoque')
				var texto=ST_Estoque+' - Notebook'
				var notas=' '
				log.error("#### ATUALIZA RESERVA NOTEBOOK ORIGINAL")
				AtualizaReservaNotebook(texto,notas,hAPI.getCardValue('IDASANA_Estoque'))
				
			}	
			movimenta_task('1203701382703710', hAPI.getCardValue('IDASANAFILHO'))
			movimenta_task('1201786043276019', hAPI.getCardValue('IDASANA'))
			AtualizaTasks('JFIPai',nextSequenceId)
			AtualizaTasks('JFIFilho',nextSequenceId)
		}
		else{

		}
		//TagsDigitalPaieFilho(nextSequenceId,tipo)
		if(nextSequenceId!='28' && nextSequenceId!="31" && nextSequenceId !="36"){
			CustomFieldsDigitalPai(nextSequenceId)
			CustomFieldsDigitalFilho(nextSequenceId)
		}
		
		if(nextSequenceId ==17 || nextSequenceId ==85 || nextSequenceId==47 || nextSequenceId==77 || nextSequenceId==28 || nextSequenceId==31){
			AtualizaTasks('JFIPai',nextSequenceId)
			AtualizaTasks('JFIFilho',nextSequenceId)
		}

	}
	else{
		/*if(nextSequenceId==5){
			CriaTaskTelefoniaPai(nextSequenceId)
			TagsTelefonia(atv,tipo)
			var SubtaskChips= RetornaSubTaskChip(idAsana)
			if(SubtaskChips.length>0){
				for(var i=1;i<=SubtaskChips.length;i++){
					TagsTelefoniaFilho(tipo,SubtaskChips[i])
				}
			}
		}
		else*/ 
		if(nextSequenceId==87 || nextSequenceId==89 || nextSequenceId ==20 || nextSequenceId==22 || nextSequenceId==107){
			movimenta_task('1203701382703719', hAPI.getCardValue('IDASANA'))//JFI TELEFONIA
			var aprovadorpor = hAPI.getCardValue('aprovadores')
			if(nextSequenceId=='87' || nextSequenceId=='107'){//Gerente Regional || Gestor CDC
				NomeAprovador(hAPI.getCardValue('aprovador1'))
				//hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador1'))
			}
			else if(nextSequenceId=='89' /*|| nextSequenceId=='20'*/){//Gerente Geral
				AprovadoPor(hAPI.getCardValue('aprovador1'))
				NomeAprovador(hAPI.getCardValue('aprovador2'))
				if(aprovadorpor==''){
					hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador2'))
				}
				else{
					aprovadorpor+=", "+hAPI.getCardValue('aprovador2')
					hAPI.setCardValue('aprovadores',aprovadorpor)
				}
			}
			else if(nextSequenceId=='22'){//Diretoria
				AprovadoPor(hAPI.getCardValue('aprovador2'))
				NomeAprovador(hAPI.getCardValue('aprovador3'))
				if(aprovadorpor==''){
					hAPI.setCardValue('aprovadores',"Aprovado por: "+hAPI.getCardValue('aprovador1'))
				}
				else{
					aprovadorpor+=", "+hAPI.getCardValue('aprovador3')
					hAPI.setCardValue('aprovadores',aprovadorpor)
				}
			}
			//CustomFieldsTelefonia()

		}
		else if(nextSequenceId==66 || nextSequenceId== 14 || nextSequenceId==110 || nextSequenceId==94){//REPROVADO
			movimenta_task('1203701382703724', hAPI.getCardValue('IDASANA'))//
			AtualizaTasks('JFITelefonia',nextSequenceId)

		}	
		else{

		}
		if(nextSequenceId ==17 || nextSequenceId ==85 || nextSequenceId==47 || nextSequenceId==77 || nextSequenceId==28){
			AtualizaTasks('JFITelefonia',nextSequenceId)
		}
		if(nextSequenceId!='28' && nextSequenceId !='31' && nextSequenceId !='36' && nextSequenceId!='30'){
			log.error("####PASSOU AQUI")
			CustomFieldsTelefonia()
		}
		
		//TagsTelefonia(nextSequenceId,tipo)
	}
}
function AtualizaTasks(tipoTask,atv){
	var idAsana=""
	var notas = ""
	var tipo=hAPI.getCardValue('TIPOEQUIPAMENTO')
	if(tipoTask=='JFIPai'){
		idAsana=hAPI.getCardValue('IDASANA')
		notas = TextoDigitalPai(atv,tipo)
	}
	else if(tipoTask=="JFIFilho"){
		idAsana=hAPI.getCardValue('IDASANAFILHO')
		notas = TextoDigitalFilho(atv)
	}
	else if(tipoTask=="JFITelefonia"){
		idAsana=hAPI.getCardValue('IDASANA')
		notas = TextoTelefoniaPai(atv,tipo)
	}
	log.error("### IDASANA ATUALIZA TASK: "+idAsana)
	data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(idAsana),
		method : 'put',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'notes': String(notas)
			}
		}
	}

	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	log.error("####result AtualizaTasks : "+vo)
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	    
	}
}
function CriaTaskDigitalPai(atv){
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	var tipo=hAPI.getCardValue("TIPOEQUIPAMENTO")
	var name="[#"+getValue("WKNumProces")+"] - "+String(funcionario)+" - "+String(hAPI.getCardValue("CENTROCUSTO"));
	if(funcionario==""){
		name="[#"+getValue("WKNumProces")+"] - "+String(hAPI.getCardValue("TIPOEQUIPAMENTO"))+" - "+String(hAPI.getCardValue("CENTROCUSTO"));
	}
	var notes= String(TextoDigitalPai(atv,tipo))
	var data ={
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'due_on': String(DataFim(atv)),
				'name': String(name),
				'notes': String(notes),
				'parent': null,
				'projects':['1201786043275997'],
				'workspace':'814866753311793'
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	    throw new Exception("Retorno está vazio");
	} else {
		var json = JSON.parse(vo.getResult());
		if(json.data.gid == undefined){
			throw (JSON.stringify(json))
		}
		else{
			log.error("RESULT POST: "+JSON.stringify(json))
			hAPI.setCardValue("IDASANA",json.data.gid);
		}	
	}
}

function CriaTaskDigitalFilho(atv){
	data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA"))+'/subtasks',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				//'assignee': String("1209922648781270"),
				'due_on': String(DataFim("28")),
				'name': 'ID: '+String(hAPI.getCardValue("IDASANA"))+ " - "+String(hAPI.getCardValue('TIPOEQUIPAMENTO')),
				'notes': String(TextoDigitalFilho(atv))
			}
		}
	}

	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	log.error("####result criacao subtarefa : "+vo)
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	    
	}
	
	var json = JSON.parse(vo.getResult());
	log.error("####result criacao subtarefa: "+json.data.gid)
	hAPI.setCardValue('IDASANAFILHO',json.data.gid)
}

function CriaTaskTelefoniaPai(atv){
	var indexes = hAPI.getChildrenIndexes("tblLinhasFuncionario");
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	var tipo=hAPI.getCardValue("TIPOEQUIPAMENTO")
	var name = ""
	var notes=""
	var tipo=hAPI.getCardValue('TIPOEQUIPAMENTO')
	if(tipo=="Linha"){
		name="[#"+getValue("WKNumProces")+"] - "+String(indexes.length)+" Nova Linha - "+String(hAPI.getCardValue("CENTROCUSTO"));
		notes =  TextoTelefoniaPai(atv,tipo)
	}
	else{
		name="[#"+getValue("WKNumProces")+"] - "+String(hAPI.getCardValue("TIPOEQUIPAMENTO"))+" - "+String(funcionario)+" - "+String(hAPI.getCardValue("CENTROCUSTO"));
		notes= TextoTelefoniaPai(atv,tipo)
	}
	var data={
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/',
			method : 'post',
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'due_on': String(DataFim(atv)),
					'name': String(name),
					'notes': String(notes),
					'parent': null,
					'projects':
						['1203701382703715'],
					'workspace': '814866753311793'
				}
			}
		};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	    throw new Exception("Retorno está vazio");
	} 
	else {
		var json = JSON.parse(vo.getResult());
		if(json.data.gid == undefined){
			throw (JSON.stringify(json))
		}
		else{
			log.error("RESULT POST: "+JSON.stringify(json))
			hAPI.setCardValue("IDASANA",json.data.gid);
		}	
	}
	if(tipo=="Linha"){
		var indexes = hAPI.getChildrenIndexes("tblLinhasFuncionario");
		log.error("####QTD: "+indexes.length)
		for (var i=1; i<=indexes.length;i++){
			CriaTaskTelefoniaFilhos(atv,i)
		}
	}
}

function CriaTaskTelefoniaFilhos(atv,index){
	var name="[#"+getValue("WKNumProces")+"]"+ " - CHIP - "+hAPI.getCardValue("NomeFuncChip___"+index);
	var notes=TextoTelefoniaFilhos(atv,index)
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA"))+'/subtasks',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'due_on': String(DataFim('5')),
				'name': String(name),
				'notes': String(notes)				
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
}
function CustomFieldsDigitalPai(atv){
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO")
	var motivo = hAPI.getCardValue("Motivo")
	var modelonote = hAPI.getCardValue("Modelonote")
	var local= hAPI.getCardValue("LocaldeEnvio")
	//var custom_fields = CamposCustomAsanaDigital()
	var prioridade = ConsultaDataset('TI_ReqEquipamentos_DescMotivo','MOTIVO',motivo) //nome dataset, campo para filtro e valor do filtro,retorno
	var categoria = ConsultaDataset('TI_ReqEquipamentos_TipoEquipamentos','NOME',tipo) //nome dataset, campo para filtro e valor do filtro
	if(tipo!='Notebook'){
		if(tipo!='Monitor'){
			configuracao ='1201861518458494'
		}
		else{
			configuracao ='1207988844495911'
		}
		//configuracao =  ConsultaDataset('TI_ReqEquipamentos_TipoEquipamentos','NOME',tipo)
	}
	else{
		configuracao = ConsultaDataset('TI_ReqEquipamentos_ModeloNote','DESCRICAO',modelonote) //nome dataset, campo para filtro e valor do filtro
	}
	var entrega = ConsultaDataset('TI_ReqEquipamentos_Lugares','CIDADE',local) //nome dataset, campo para filtro e valor do filtro
	log.error("### tipo: "+tipo + " prioridade: "+prioridade)
	log.error("### motivo: "+motivo + " categoria: "+categoria)
	log.error("### local: "+local+" entrega: "+entrega)
	log.error("### configuracao: "+configuracao)
	
	var IdAsana = hAPI.getCardValue('IDASANA')
	var data =""
	if(atv=="119" || atv=='5'){
		data ={	
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/'+String(IdAsana),
			method : 'PUT',	
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'custom_fields':{
						'1169423503957573':String(/*custom_fields[0]*/prioridade),//PRIORIDADE
						'1201786043570280':String(/*custom_fields[1]*/categoria),//Categoria tipo de equipamento
						'1201860078356857':String(/*custom_fields[2]*/configuracao),//Configuração
						'1201906195699412':String(/*custom_fields[3]*/entrega),//Entrega
						'1201786043570286':String(hAPI.getCardValue('NOME_REQUISITANTE'))
					}
				}
			}
		};
	}
	else if(atv=="17"){
		var estoque=""//SIM
		if(hAPI.getCardValue('ST_Estoque')==''){
			estoque="1208408547857291"//NAO
		}
		else{
			estoque="1208408547857290"//SIM
		}
		data={
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/'+String(IdAsana),
			method : 'PUT',
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'custom_fields':{
						'1169423503957573':String(prioridade),//PRIORIDADE
						'1201786043570280':String(categoria),//Categoria
						'1201860078356857':String(configuracao),//Configuração
						'1201906195699412':String(entrega),//Entrega
						'1201786043570286':String(hAPI.getCardValue('NOME_REQUISITANTE')),
						'1208408547857289':String(estoque),//ESTOQUE,
						'1207395135658090':String(hAPI.getCardValue('ST_Estoque'))
					}
				}
			}
		};
	}
	AtualizaCustomFields(data)
}
function ConsultaDataset(idDataset,campo,valor){
	log.error("### DATASET: "+idDataset)
	log.error("### CAMPO: "+campo)
	log.error("### VALOR: "+valor)
	var const1 = DatasetFactory.createConstraint(campo,valor , valor, ConstraintType.MUST);
	var const2 = DatasetFactory.createConstraint("metadata#active","true" , "true", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset(idDataset, null, [const1, const2], null);
	if(dataset.values.length){
		if(dataset.values.length>0){
			for (var i=0;i<dataset.values.length;i++){
				return dataset.getValue(i,'GID_FLUIG')
			}
		}
	}
	else{
		throw "Erro função ConsultaDataset"
	}
}
function CustomFieldsDigitalFilho(atv){
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO")
	var motivo = hAPI.getCardValue("Motivo")
	var modelonote = hAPI.getCardValue("Modelonote")
	var local= hAPI.getCardValue("LocaldeEnvio")
	//var custom_fields = CamposCustomAsanaDigital()
	var prioridade = ConsultaDataset('TI_ReqEquipamentos_DescMotivo','MOTIVO',motivo) //nome dataset, campo para filtro e valor do filtro,retorno
	var categoria = ConsultaDataset('TI_ReqEquipamentos_TipoEquipamentos','NOME',tipo) //nome dataset, campo para filtro e valor do filtro
	if(tipo=='Monitor'){
		configuracao =  ConsultaDataset('TI_ReqEquipamentos_TipoEquipamentos','MOTIVO',tipo)
	}
	else{
		configuracao = ConsultaDataset('TI_ReqEquipamentos_ModeloNote','DESCRICAO',modelonote) //nome dataset, campo para filtro e valor do filtro
	}
	
	var entrega = ConsultaDataset('TI_ReqEquipamentos_Lugares','CIDADE',local) //nome dataset, campo para filtro e valor do filtro

	log.error("### tipo: "+tipo + " prioridade: "+prioridade)
	log.error("### motivo: "+motivo + " categoria: "+categoria)
	log.error("### local: "+local+" entrega: "+entrega)
	log.error("### configuracao: "+configuracao)

	if(atv!=5){
		//var custom_fields = CamposCustomAsanaDigital()
		var IdAsana = hAPI.getCardValue('IDASANAFILHO')
		var estoque="1208408547857290"//SIM
		if(hAPI.getCardValue('ST_Estoque')==''){
			estoque="1208408547857291"//NAO
		}
		var data={
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/'+String(IdAsana),
			method : 'PUT',
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'custom_fields':{
						'1169423503957573':String(/*custom_fields[0]*/prioridade),//PRIORIDADE
						'1201786043570280':String(/*custom_fields[1]*/categoria),//Categoria tipo de equipamento
						'1201860078356857':String(/*custom_fields[2]*/configuracao),//Configuração
						'1201906195699412':String(/*custom_fields[3]*/entrega),//Entrega
						'1201786043570286':String(hAPI.getCardValue('NOME_REQUISITANTE')),
						'1208408547857289':String(estoque),//ESTOQUE
						'1207395135658090':String(hAPI.getCardValue('ST_Estoque')),
						'1208662089808838':String(hAPI.getCardValue('tipo_solicitacao'))
					}
				}
			}
		};
		AtualizaCustomFields(data)
	}
	
}

function CustomFieldsTelefonia(){
	//var custom_fields = CamposCustomAsanaTelefonia()
	var IdAsana = hAPI.getCardValue("IDASANA")
	log.error("#### IDASANA TELEFONIA: "+hAPI.getCardValue("IDASANA"))
	var tipo=hAPI.getCardValue('TIPOEQUIPAMENTO')
	var motivo = hAPI.getCardValue("Motivo")
	var local= hAPI.getCardValue("LocaldeEnvio")
	//var custom_fields = CamposCustomAsanaDigital()
	var prioridade = ConsultaDataset('TI_ReqEquipamentos_DescMotivo','MOTIVO',motivo) //nome dataset, campo para filtro e valor do filtro,retorno
	var categoria = ConsultaDataset('TI_ReqEquipamentos_TipoEquipamentos','NOME',tipo) //nome dataset, campo para filtro e valor do filtro
	
	var entrega = ConsultaDataset('TI_ReqEquipamentos_Lugares','CIDADE',local) //nome dataset, campo para filtro e valor do filtro
	if(local=='Curiuva' || local=='Ibaiti' || local=='Jaguariaíva'){
		operadora='1208369851412983'
	}
	else{
		operadora = '1208369851412984'
	}
	log.error("### tipo: "+tipo + " prioridade: "+prioridade)
	log.error("### motivo: "+motivo + " categoria: "+categoria)
	log.error("### local: "+local+" entrega: "+entrega+" operadora: "+operadora)
	var data=""
	if(tipo=="Celular" || tipo=="Celular e Linha"){
		data = 
		{
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA")),
			method : 'PUT',
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'custom_fields':{
						'1169423503957573':String(prioridade),//prioridade
						'1208369851412960':String(categoria),//tipo Equipamento
						'1201906195699412':String(entrega),// Entrega
						'1208369851412982':String(operadora),//OPERADORA
						'1208402765500762':String(hAPI.getCardValue('NOVALINHA')),//LINHA
						'1209368925613701':String(hAPI.getCardValue('NOME_REQUISITANTE'))
					}
					
				}
			}
		};
		AtualizaCustomFields(data)
	}
	else{
		data_linhaPai = 
		{
			companyId : getValue("WKCompany")+'',
			serviceCode : 'ASANA_TASKS',
			endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA")),
			method : 'PUT',
			timeoutService: '100', 
			params : 
			{
				'data':
				{
					'custom_fields':{
						'1169423503957573':String(prioridade),//prioridade
						'1208369851412960':String(categoria),//tipo Equipamento
						'1201906195699412':String(entrega),// Entrega
						'1208369851412982':String(operadora),//OPERADORA
						'1208402765500762':String(hAPI.getCardValue('NOVALINHA')),//LINHA
						'1209368925613701':String(hAPI.getCardValue('NOME_REQUISITANTE'))
					}
					
				}
			}
		}
		AtualizaCustomFields(data_linhaPai)
		var subs=RetornaSubTaskChip(IdAsana)
		log.error("#### RetornaSubTaskChip: "+subs)
		log.error("#### Qtd subs: "+subs.length)
		for(var index =0;index<=subs.length;index++){
			log.error("### IDASANA SUB"+subs[index])
			data = 
			{
				companyId : getValue("WKCompany")+'',
				serviceCode : 'ASANA_TASKS',
				endpoint: 'tasks/'+String(subs[index]),
				method : 'PUT',
				timeoutService: '100', 
				params : 
				{
					'data':
					{
						'custom_fields':{
							'1169423503957573':String(prioridade),//prioridade
							'1208369851412960':String(categoria),//tipo Equipamento
							'1201906195699412':String(entrega),// Entrega
							'1208369851412982':String(operadora),//OPERADORA
							'1208402765500762':String(hAPI.getCardValue('numeroLinhaFunc___'+(index+1))),//LINHA
							'1209368925613701':String(hAPI.getCardValue('NOME_REQUISITANTE'))
						}
						
					}
				}
			}
			AtualizaCustomFields(data)
		}
		
	}
}

function AtualizaCustomFields(data){//OK
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	    throw new Exception("Retorno está vazio");
	} else {
	    log.info("AtualizaCustomFields: "+vo.getResult());
	}
}

function RetornaSubTaskChip(idAsana){//OK
	var tags=[]
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+hAPI.getCardValue('IDASANA')+'/subtasks',
		method : 'get',
		timeoutService: '100'
		
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	log.error("#### endpoint: tasks/"+String(idAsana)+"/subtasks")
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.error("#### result: "+vo.getResult());
		var jsonData = JSON.parse(vo.getResult());
		if(jsonData.data.length>0){
			for(var i=0;i<jsonData.data.length;i++){
				tags.push(jsonData.data[i].gid)
			}
		}
		return tags
	}	
}

function TextoTelefoniaPai(atv,tipo){
	var notes = ""
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	if(tipo=="Linha"){
		notes ="Requisitante: "+hAPI.getCardValue("NOME_REQUISITANTE")
		notes+="\n Local para Envio: "+String(hAPI.getCardValue("LocaldeEnvio"))
		notes+="\n Quantidade de Chips:"+String(hAPI.getCardValue("QTDCHIP"));
		notes+="\n Justificativa: "+hAPI.getCardValue("JUSTIFICATIVA")
		if(atv=="85" || atv==87 || atv==89 || atv==20 || atv==22 || atv==107 || atv==28 || atv==31){//ENVIAR PARA APROVAÇÃO
			notes+="\n Valor Mensal R$ "+hAPI.getCardValue("VALORMES")
			notes+=" - Valor Total R$ "+hAPI.getCardValue("VALORTOTAL")	
		}
		notes+="\n Link de acesso Fluig: https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+getValue("WKNumProces")
	}
	else{//CELULARES
		notes ="Requisitante: "+hAPI.getCardValue("NOME_REQUISITANTE")
		notes+="\n Local para Envio: "+String(hAPI.getCardValue("LocaldeEnvio"))
		notes+="\n Funcionário: "+String(funcionario)
		notes+="\n Perfil de Contratação: "+String(desc_equipamento());
		notes+="\n Justificativa: "+hAPI.getCardValue("JUSTIFICATIVA")
		if(atv=="85" || atv==87 || atv==89 || atv==20 || atv==22 || atv==107 || atv==28 || atv==31 ){//ENVIAR PARA APROVAÇÃO
			notes+="\n Valor Mensal R$ "+hAPI.getCardValue("VALORMES")
			notes+=" - Valor Total R$ "+hAPI.getCardValue("VALORTOTAL")	
		}
		notes+="\n Link de acesso Fluig: https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+getValue("WKNumProces")
	}
	if(atv=="94" || atv=="110" || atv=="66" || atv=="14"){//REPROVAÇÃO
		if(atv=="94" || atv=="110"){//GESTORES
			hAPI.setCardValue("msgReprova",getValue("WKUserComment"));
		}
		notes+="\n Motivo da reprova: "+hAPI.getCardValue('msgReprova')
	}
	return notes
}

function TextoTelefoniaFilhos(atv,index){
	var notes=""
	notes+="Destinatario da linha: "+hAPI.getCardValue("NomeFuncChip___"+index)
	notes+="Justificativa: "+String(hAPI.getCardValue("JUSTIFICATIVA"))
	if(atv=="85"){
		notes+="\n Valor Mensal R$ "+hAPI.getCardValue("ValorChipFuncForm___"+index)+" - Valor Total R$ "+hAPI.getCardValue("ValorTotalChipFunc___"+index);	
	}
	return notes
}

function TextoDigitalPai(atv,tipo){
	var notes = ""
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	notes+="Requisitante: "+ String(hAPI.getCardValue("NOME_REQUISITANTE"))
	notes+="\n Justificativa: "+String(hAPI.getCardValue("JUSTIFICATIVA"));
	if(tipo=="Notebook" || tipo=="Monitor"){
		notes+="\n Funcionário: "+String(funcionario);
	}
	notes+="\n Perfil de Contratação: "+String(desc_equipamento());
	if(/*(tipo=="Notebook" || tipo=="Monitor") &&*/ hAPI.getCardValue('Motivo')!='Novo'){
		notes+="\n Service Tag ("+hAPI.getCardValue('Motivo')+") : "+hAPI.getCardValue('ServiceTag_Troca')
		if(hAPI.getCardValue('Motivo')=='Upgrade' && hAPI.getCardValue('tpUpgrade')=='Parcial'){
			notes+="\n Peças a serem trocadas: "+hAPI.getCardValue('TrocaPecas')
		}
	}
	if(tipo=="Notebook" && hAPI.getCardValue('ST_Estoque')!=''){
		notes+="\n Service Tag de Estoque: "+hAPI.getCardValue('ST_Estoque')
		notes+="\n Identificador Asana: "+ hAPI.getCardValue('IDASANA_Estoque')
	}
	notes+="\n Local para Envio: "+String(hAPI.getCardValue("LocaldeEnvio"))
	if(atv=="85" || atv==87 || atv==89 || atv==20 || atv==22 || atv==107 || atv==28 || atv==31){//ENVIAR PARA APROVAÇÃO
		notes+="\n Valor Mensal R$ "+hAPI.getCardValue("VALORMES")
		notes+=" - Valor Total R$ "+hAPI.getCardValue("VALORTOTAL")
	}
	notes+="\n Link de acesso Fluig: https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+getValue("WKNumProces")
	if(atv=="94" || atv=="110" || atv=="66" || atv=="14"){//REPROVAÇÃO
		if(atv=="94" || atv=="110"){//GESTORES
			hAPI.setCardValue("msgReprova",getValue("WKUserComment"));
		}
		notes+="\n Motivo da reprova: "+hAPI.getCardValue('msgReprova')
	}
	return notes
}

function TextoDigitalFilho(atv){
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	var equip = hAPI.getCardValue("Modelonote");
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO"); 
	var notes =""
	if(tipo=="Notebook"){
		if(hAPI.getCardValue('Motivo')=='Upgrade' && hAPI.getCardValue('tpUpgrade')=='Parcial'){

		}
		else{
			notes+="\n Perfil de Contratação: "+String(equip);
			notes+='\n  Funcionário: '+String(funcionario);
		}
	}
	else{
		notes+="\n Perfil de Contratação: "+String(tipo);
	}
	notes+='\n  Centro de Custo: '+String(hAPI.getCardValue('CENTROCUSTO'));
	if(tipo=="Notebook" && hAPI.getCardValue('Motivo')!='Novo'){
		notes+="\n Service Tag ("+hAPI.getCardValue('Motivo')+") : "+hAPI.getCardValue('ServiceTag_Troca')
		if(hAPI.getCardValue('Motivo')=='Upgrade' && hAPI.getCardValue('tpUpgrade')=='Parcial'){
			notes+="\n Upgrade necessário: "+hAPI.getCardValue('TrocaPecas')
		}
	}
	if(tipo=="Notebook" && hAPI.getCardValue('ST_Estoque')!=''){
		notes+="\n Service Tag de Estoque: "+hAPI.getCardValue('ST_Estoque')
	}
	if(atv=="17"){//ORÇAMENTO
		notes+='\n Por gentileza insira o arquivo da proposta nessa atividade e preencha o campo Valor com o valor mensal do equipamento!';	
	}
	else if(atv=="77"){//REVISAO ORÇAMENTO
		notes+='\n Orçamento REPROVADO!!! Motivo do  Retorno: '+String(hAPI.getCardValue("msgRevisarOrcamento"));
		notes+='\n Por gentileza insira um NOVO arquivo da proposta nessa atividade e preencha o campo Valor com o valor mensal do equipamento!';
	}
	else if(atv=="66"){//ORÇAMENTO REPROVADO
		notes+='\n Orçamento REPROVADO!!! \n Motivo da Reprova do Orçamento: '+String(hAPI.getCardValue("msgReprovaOrcamento"));
	}
	else if(atv=="31"){//ORÇAMENTO APROVADO
		notes+="\n Orçamento APROVADO!!! Por gentileza insira o Service Tag do equipamento junto com uma previsão de entrega!"
		if(hAPI.getCardValue("LocaldeEnvio")=="Três Lagoas"){
			notes+='\n Local de Envio: Rod. BR-262, Km 11.5, S/n - Fazenda Alagoas, Três Lagoas – MS, 79.601-970'
			notes+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
		}
		else if(hAPI.getCardValue("LocaldeEnvio")=="Água Clara"){
			notes+='\n Local de Envio: R. Idalina Guarini da Silva, 55 - Jardim nova Agua Clara, Agua Clara - MS, 79.680-00'
			notes+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
		}
		else if(hAPI.getCardValue("LocaldeEnvio")=="Campo Grande"){
			notes+='\n Local de Envio: Rua Evaristo da Veiga, 83 - Jardim Noroeste, Campo Grande - MS, 79.045-151'
			notes+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
		}
		else if(hAPI.getCardValue("LocaldeEnvio")=="Ribas"){
			notes+='\n Local de Envio: R. José Tiago Pontes, 1923 - Parque ESTORIL 1, Ribas do Rio Pardo - MS, 79180-000'
			notes+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
		}
		else if(hAPI.getCardValue("LocaldeEnvio")=="Camapuã"){
			notes+='\n Local de Envio: R. Pedro Marculino  S/N - Jardim América, Camapuã - MS, 79420-000'
			notes+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
		}
		else if(hAPI.getCardValue("LocaldeEnvio")=="Caçapava"){
			notes+='\n Local de Envio: R. Alice Eduvirges, 12 - Caçapava Velha, Caçapava - SP, 12283-567'
		}
		else{
			notes+='\n Local de Envio: Avenida 5 de Novembro, 1079 - Vila Nastri, Itapetininga - SP, 18207-330'
		}
	}
	log.error("### ATV: "+atv)
	log.error("### NOTES: "+notes)
	return notes
}

function desc_equipamento(){
	var resultado = ""
	if (hAPI.getCardValue("TIPOEQUIPAMENTO")=='Notebook'){
		resultado= hAPI.getCardValue('Modelonote')//modelo_notebook();
	}
	else if(hAPI.getCardValue("TIPOEQUIPAMENTO")=='Celular'){
		resultado="Celular - Linha: "+hAPI.getCardValue("NOVALINHA");
	}
	else if(hAPI.getCardValue("TIPOEQUIPAMENTO")=='Celular e Linha'){
		resultado="Celular e Linha "
	}
	else if(hAPI.getCardValue("TIPOEQUIPAMENTO")=='Impressora'){
		resultado = "Impressora - Media de Impressões mensais: "+hAPI.getCardValue("IMPRESSORA");
	}
	else if(hAPI.getCardValue("TIPOEQUIPAMENTO")=='Impressora Colorida'){
		resultado = "Impressora Colorida - Media de Impressões mensais: "+hAPI.getCardValue("IMPRESSORA");
	}
	else {
		resultado =hAPI.getCardValue("TIPOEQUIPAMENTO");
	}
	
	return resultado;
}
function servicetask119(attempt, message) {
	log.info("######## NEXT SEQUENCEID: "+5)
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO");
	if(tipo!="Celular" && tipo!="Linha" && tipo!="Celular e Linha"){
		CriaTaskDigitalPai(5)
	}
	else{
		CriaTaskTelefoniaPai(5)
		var idAsana = hAPI.getCardValue("IDASANA")
		//TagsTelefonia(5,tipo)
		var SubtaskChips= RetornaSubTaskChip(idAsana)
		if(SubtaskChips.length>0){
			for(var i=1;i<=SubtaskChips.length;i++){
				//TagsTelefoniaFilho(tipo,SubtaskChips[i])
			}
		}
	}
}
function servicetask17(attempt, message){
	try {
		var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO");
		if(tipo!="Linha" && tipo!="Celular" && tipo!='Celular e Linha'){
			log.error("ID ASANA: "+hAPI.getCardValue('IDASANA'))
			movimenta_task('1202497813102809', String(hAPI.getCardValue('IDASANA')))//JFI
			CriaTaskDigitalFilho('17')
			if(hAPI.getCardValue('ST_Estoque')!=''){
				ReservaNotebook('17')
			}
			if(hAPI.getCardValue('Motivo')=='Substituicao' || ( hAPI.getCardValue('Motivo')=='Upgrade' && hAPI.getCardValue('tpUpgrade')=='Total')){
				CriaTaskDevolucao()
			}
			MoveSubTarefa(hAPI.getCardValue('IDASANAFILHO'))	
		}
		ResponsavelAsana()
	}
	catch(error) { 
		log.error(error);
		throw error;
	}
}

//================================= ADICIONA SUBTAREFA AO PROJETO DIGITAL  ===================================================
function MoveSubTarefa(IDSUB){//OK
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(IDSUB)+'/addProject',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'project': '1203701610894699',
				'section': '1203705365505617'
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	    //var IdAsanaSubTarefa = Right(vo.getResult(),19)
	    
	}
}

//================================= RESERVA NOTEBOOK ASANA ==============================================
function ReservaNotebook(atv){//OK
	var idAsana = hAPI.getCardValue('IDASANA_Estoque')
	var ST_Estoque = hAPI.getCardValue('ST_Estoque')
	var nomeColaborador = hAPI.getCardValue('NomeFuncionario')
	var modelo = hAPI.getCardValue('Modelonote')
	var texto= ST_Estoque + ' - '+nomeColaborador + ' - '+modelo
	var notas = TextoDigitalFilho(atv)
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'sections/1208408547857431/addTask',
		method : 'post',
		timeoutService: '100', 
		params : {'data':{'task': String(idAsana)}}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
        throw new Exception("Retorno está vazio");
        
    } else {
        log.info(vo.getResult());
		AtualizaReservaNotebook(texto,notas,idAsana)
    }
}
function AtualizaReservaNotebook(texto,notas,idAsana){
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+idAsana,
		method : 'put',
		timeoutService: '100', 
		params : {'data':{'name': String(texto),'notes':String(notas)}}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
        throw new Exception("Retorno está vazio");
        
    } else {
        log.info(vo.getResult());
    }
}
function ResponsavelAsana(){
	var emailTI = hAPI.getCardValue('EMAIL_TI')
	var resp='null'
	if(emailTI=='leandro.carriel@jfi.com.br'){
		resp='1201381325235816'
	}
	else if(emailTI=='rogerio@jfi.com.br'){
		resp='1154936142365242'
	}
	else if(emailTI=='marcos.moraes@jfi.com.br'){
		resp='1203243138008638'
	}
	else if(emailTI=='kauan.theodoro@jfi.com.br'){
		resp='1208115189492821'
	}
	else if(emailTI=='lucas.kiyoshi@jfi.com.br'){
		resp='1206120111894562'
	}
	else if(emailTI=='ana.garcia@jfi.com.br'){
		resp='1206524022164290'
	}
	else if(emailTI=='tiago.furlan@jfi.com.br'){
		resp='1207980445909926'
	}
	else if(emailTI=='natan.mendes@jfi.com.br'){
		resp='1204814940634277'
	}
	else if(emailTI=='maria.faria@jfi.com.br'){
		resp='1204814940634277'
	}
	else if(emailTI=='matheus.costa@jfi.com.br'){
		resp='1204814940634277'
	}
	else{
		resp='null'
	}
	log.error("##### RESP: "+resp)
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA")),
		method : 'put',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'assignee': String(resp),
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
}
function CriaTaskDevolucao(){
	var notes =""
	var configuracao=""
	var st = hAPI.getCardValue('ServiceTag_Troca')
	var cs1 = DatasetFactory.createConstraint("txt_STEquipamento", st, st, ConstraintType.MUST);
	var cs2 = DatasetFactory.createConstraint("txt_Status","ATIVO","ATIVO", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("TI_inventario", null, [cs1,cs2], null);
	for(var i=0;i<dataset.rowsCount;i++){
		configuracao = dataset.getValue(i, "txt_Configuracao");
	}
	notes+="\n Service Tag: "+hAPI.getCardValue('ServiceTag_Troca')
	notes+="\n Configuração: "+configuracao
	var data ={
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'name': 'DEVOLUÇÃO - '+hAPI.getCardValue('ServiceTag_Troca'),
				'notes': String(notes),
				'parent': null,
				'assignee':'1208115189492821',
				'section':'1208449981687015',
				'projects':['1208449981687013'],
				'workspace':'814866753311793'
			}
		}
	};

	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	log.error("####result criacao subtarefa : "+vo)
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	    
	}
}
function servicetask28(attempt, message) {
	var sequenceId = getValue("WKCurrentState")
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO"); 
	if(tipo =="Notebook" || tipo=="Monitor" || tipo=="Impressora" || tipo=="Scanner" || tipo=="Impressora Colorida"){
		if(tipo=="Notebook" && hAPI.getCardValue('IDASANA_Estoque')!='') {
			movimenta_task('1208440113465405', String(hAPI.getCardValue("IDASANAFILHO")))//APROVA 
		}
		else{
			movimenta_task('1203701610894700', String(hAPI.getCardValue("IDASANAFILHO")))//APROVA 
		}	
		movimenta_task('1201893125335358', hAPI.getCardValue('IDASANA'))
		AprovadoPor(hAPI.getCardValue('aprovador3'))
		TextoDigitalFilho('31')
	}
	else{
		movimenta_task('1203701382703720', hAPI.getCardValue('IDASANA'))
		if(tipo=='Linha' && (hAPI.getCardValue('numeroLinhaFunc___1')!='' || hAPI.getCardValue('numeroLinhaOutros___1')!='')){
			//AtualizaSubTarefaChips()
			//RemoveTagAdiconaTag()
		}
		movimenta_task('1203701382703720', String(hAPI.getCardValue("IDASANAFILHO")))//APROVA 
		AprovadoPor(hAPI.getCardValue('aprovador3'))
	}
	
}


function atualiza_taskSubTarefa(atv){
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANAFILHO")),
		method : 'put',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'notes': String(AsanaLocalEnvio()),
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
}
function AtualizaSubTarefaChips(){
	var notes= "Requisitante: "+hAPI.getCardValue("NOME_REQUISITANTE")+" \n Justificativa: "+hAPI.getCardValue("JUSTIFICATIVA")+"\n Valor Mensal R$ "+hAPI.getCardValue("VALORMES")+" - Valor Total R$ "+hAPI.getCardValue("VALORTOTAL")
	notes+="\n Link de acesso Fluig: https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+getValue("WKNumProces");
	notes+= "\n Linhas utilizadas em estoque: "
	for (var i =1; i<= hAPI.getCardValue('QTDCHIP');i++){
		if(hAPI.getCardValue('numeroLinhaFunc___'+i)!=''){
			if(hAPI.getCardValue('TipoDestChip')=='Funcionario'){
				notes+="\n - "+hAPI.getCardValue('NomeFuncChip___'+i)+" - "+hAPI.getCardValue('numeroLinhaFunc___'+i)
			}
			else{
				notes+="\n - "+hAPI.getCardValue('NomeChipOutros___'+i)+" - "+hAPI.getCardValue('numeroLinhaOutros___'+i)
			}
		}
		
	}
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(hAPI.getCardValue("IDASANA")),
		method : 'put',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'due_on': String(DataFim('28')),
				'notes': notes,
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
}

function RemoveTagAdiconaTag(){
	var idAsanaChip= hAPI.getCardValue('IDASANA');
	var data = 
	{
		companyId :getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(idAsanaChip)+'/removeTag',
		//'tasks/'+String(idAsanaChip)+'/addTag',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'tag': '1203439393264322' //novalinha

			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
	var data1 = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+String(idAsanaChip)+'/addTag',
		method : 'post',
		timeoutService: '100', 
		params : 
		{
			'data':
			{
				'tag': '1204946791617236' //UtilizadoEstoque
			}
		}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data1));
	
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
	
	    throw new Exception("Retorno está vazio");
	    
	} else {
	    log.info(vo.getResult());
	}
}

function AsanaLocalEnvio(){
	var descricao = ""
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO"); 
	var funcionario = hAPI.getCardValue('NomeFuncionario')
	descricao ='\n Perfil de Contratação: '+String(desc_equipamento());
	descricao+='\n  Funcionário: '+String(funcionario);
	descricao+='\n  Centro de Custo: '+String(hAPI.getCardValue('CENTROCUSTO'));
	descricao+='\n Por gentileza insira o Service Tag do equipamento junto com uma previsão de entrega!';
	log.error("###LOCAL DE ENVIO: "+hAPI.getCardValue("LocaldeEnvio"))
	if(hAPI.getCardValue("LocaldeEnvio")=="Três Lagoas"){
		descricao+='\n Local de Envio: Rod. BR-262, Km 11.5, S/n - Fazenda Alagoas, Três Lagoas – MS, 79.601-970'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	else if(hAPI.getCardValue("LocaldeEnvio")=="Água Clara"){
		descricao+='\n Local de Envio: R. Idalina Guarini da Silva, 55 - Jardim nova Agua Clara, Agua Clara - MS, 79.680-00'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	else if(hAPI.getCardValue("LocaldeEnvio")=="Campo Grande"){
		descricao+='\n Local de Envio: Rua Evaristo da Veiga, 83 - Jardim Noroeste, Campo Grande - MS, 79.045-151'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	else if(hAPI.getCardValue("LocaldeEnvio")=="Ribas"){
		descricao+='\n Local de Envio: R. José Tiago Pontes, 1923 - Parque ESTORIL 1, Ribas do Rio Pardo - MS, 79180-000'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	else if(hAPI.getCardValue("LocaldeEnvio")=="Camapuã"){
		descricao+='\n Local de Envio: R. Pedro Marculino  S/N - Jardim América, Camapuã - MS, 79420-000'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	else if(hAPI.getCardValue("LocaldeEnvio")=="Caçapava"){
		descricao+='\n Local de Envio: R. Alice Eduvirges, 12 - Caçapava Velha, Caçapava - SP, 12283-567'
		descricao+='\n Enviar somente após confirmação do TI por meio de uma observação dessa tarefa do Asana.'
	}
	/*else if(hAPI.getCardValue("LocaldeEnvio")=="Curiuva"){
		descricao+='\n Local de Envio: Avenida Joaquim Carneiro, 1894 - Cata Vento, Curiuva - PR, 84.280-000'
	}*/
	/*if(hAPI.getCardValue("LocaldeEnvio")=="Itapetininga"){
		descricao+='\n Local de Envio: Avenida 5 de Novembro, 1079 - Vila Nastri, Itapetininga - SP, 18207-330'
	}*/
	else{
		descricao+='\n Local de Envio: Avenida 5 de Novembro, 1079 - Vila Nastri, Itapetininga - SP, 18207-330'
	}
	return descricao
}
	function servicetask47(attempt, message) {
	var tipo = hAPI.getCardValue("TIPOEQUIPAMENTO"); 
	if(tipo =="Notebook" || tipo=="Monitor" || tipo=="Impressora" || tipo=="Scanner"){
		var IdAsanaFilho=hAPI.getCardValue("IDASANAFILHO");
		if (consultaAnexo()=='{"data":[]}'){
			throw "Orçamento não anexado"
		}
		else{
			RetornaValor()
		}
	}
}
function consultaAnexo(){
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'attachments?parent='+String(hAPI.getCardValue("IDASANAFILHO")),
		method : 'get',
		timeoutService: '100' 
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
        throw new Exception("Retorno está vazio");
    } else {
        log.info(vo.getResult());
    }
	return vo.getResult()
}
function RetornaValor(){
	var idAsana=hAPI.getCardValue("IDASANAFILHO")
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'tasks/'+idAsana,
		method : 'get',
		timeoutService: '100' 
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
		throw new Exception("Retorno está vazio");
	} else {
		log.info(vo.getResult());
	}
     var json = JSON.parse(vo.getResult());
     //nome = json.data.name //NOME DA TASK ASANA
     log.error("RESULT POST1: "+JSON.stringify(json))
     log.error("### Json l1: "+json.data.name)

     var dadosCustom = json.data.custom_fields
     log.error("### QTD Custom"+dadosCustom.length)
	//var json = JSON.parse(vo.getResult());

	//var dadosCustom = json.data.custom_fields
	//log.error("### QTD Custom"+dadosCustom.length)

	for (var i = 0; i < dadosCustom.length; i++) {
		if(dadosCustom[i].gid=='1201786043570289'){ //VALOR
			hAPI.setCardValue('VALORMES',dadosCustom[i].display_value)
			return true
		}

	}
}
function servicetask60(attempt, message) {
	if(ProcuraTaskSecao()=='-1'){
		throw "Orçamento não atualizado"
	}
}

function ProcuraTaskSecao(){       
	var texto ='"gid":"'+hAPI.getCardValue("IDASANAFILHO")+'",';
	var retorno = RetornaTaskSecao();
	var index = retorno.search(texto);
	return index
}
function RetornaTaskSecao(){
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'sections/1203701610894702/tasks',
		method : 'get',
		timeoutService: '100', 
		params : {}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
        throw new Exception("Retorno está vazio");
    } else {
        log.info(vo.getResult());
        return (vo.getResult())
    }
}
function servicetask77(attempt, message) {
	//atualiza_taskSubTarefa("103")
	RetornaEtapaOrcamento()
}
function RetornaEtapaOrcamento(){
	var data = 
	{
		companyId : getValue("WKCompany")+'',
		serviceCode : 'ASANA_TASKS',
		endpoint: 'sections/1203819940041674/addTask',
		method : 'post',
		timeoutService: '100', 
		params : {'data':{"task": String(hAPI.getCardValue("IDASANAFILHO"))}}
	};
	var clientService = fluigAPI.getAuthorizeClientService();
	//var  vo=clientService.invoke(JSON.stringify(data));
	var  vo=clientService.invoke(JSON.stringify(data));
	if (vo.getResult()== null || vo.getResult().isEmpty()) {
        throw new Exception("Retorno está vazio");
        
    } else {
        log.info(vo.getResult());
    }
}
