function GerarTermo(){
	var chapa = $("#Chapa").val()
	var filter = DatasetFactory.createConstraint("CHAPA",chapa , chapa, ConstraintType.MUST);
	dataset = DatasetFactory.getDataset("RHU_Consulta_Funcionario",null, [filter], null);
	var funcao=""
	var setor = ""
	var gestor=""
	console.log('dataset.values.length: '+dataset.values.length)
	if (dataset.values.length>0){
		funcao=dataset.values[0]['FUNCAO']
		setor=dataset.values[0]['DESCRICAO']
		gestor = dataset.values[0]['APROVADOR1']
		var filter1 = DatasetFactory.createConstraint("login",gestor , gestor, ConstraintType.MUST);
		dataset1 = DatasetFactory.getDataset("colleague",null, [filter1], null);
		gestor = dataset1.values[0]['colleagueName']

	}
	var corpoHtml = '<!DOCTYPE html>'+
	'  <html lang="pt-BR">'+
	'  <head>'+
	'  <meta charset="UTF-8">'+
	'  <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
	'  <title>Autorização de Debito '+$("#NomeFunc").val()+'</title>'+
	'  <style>'+
	'    @page {'+
	'     size: A4; '+
	'     margin: 0;'+
	'    }'+
	'    .paragrafo {'+
	'     text-align: justify;'+
	'     margin-right: 60px;'+
	'      text-indent: 60px;'+
	'      margin-bottom: -15px;'+
	'    }'+
	'    .underline {'+
	'      border-top: 1px solid black; '+
	'      display: inline-block; '+
	'      padding-top: 2px; '+
	'    }'+
	'    .fonte{'+
	'      font-family: "Times New Roman", Times, serif;'+
	'    } '+
	'   '+
	'    table {'+
	'      border-collapse: collapse;'+
	'    }'+
	'    th, td {'+
	'      border: 2px solid black;'+
	'      padding: 8px;'+
	'    }'+
	'    th {'+
	'      background-color: #f2f2f2;'+
	'    }'+
	'    .signature {'+
	'      border-bottom: 2px solid black;'+
	'      height: 30px;'+
	'    }'+
	'    @media print {'+
	'      .impressao {'+
	'        -webkit-print-color-adjust: exact;'+
	'        print-color-adjust: exact;'+
	'      }'+
	'    }'+
	'  </style>'+
	'  </head>'+
	'  <body onload="setTimeout(function(){ window.print()},800);">'+
	'    <center>'+
	'      <div id="div_termo" style="margin-left: 40px;width:650px" class="impressao">'+
	'        <br><br>'+
	'        <div id="imagem">'+
	'          <img src="https://i.imgur.com/wKCg6JL.png">'+
	'        </div>'+
	'        <div style="background:#999999;text-align:center;color:white;">'+
	'          <p style="font-size:0.1pt">&nbsp;</p>'+
	'          <b><i><h2 style="font-family: arial;font-size:12.0pt;align-items:center;vertical-align: middle;">AUTORIZAÇÃO DE DÉBITO</h2></i></b>'+
	'          <p style="font-size:0.1pt">&nbsp;</p>'+
	'        </div>'+
	'        <br>'+
	'        <table cellspacing=0 cellpadding=0 width=622 style="width:466.35pt;margin-left:-.25pt;border-collapse:collapse">'+
	'          <tr>'+
	'            <td>Nome do colaborador: '+$("#NomeFunc").val()+'</td>'+
	'            <td>Matricula: '+$("#Chapa").val()+'</td>'+
	'          </tr>'+
	'          <tr>'+
	'            <td>Setor: '+setor+'</td>'+
	'            <td>Cargo: '+funcao+'</td>'+
	'          </tr>'+
	'          <tr>'+
	'            <td>Responsável: '+gestor+'</td>'+
	'            <td>Valor: R$5,00</td>'+
	'          </tr>'+
	'          <tr>'+
	'            <td colspan="2">Descrição do motivo débito:'+$("#Justificativa").val()+'</td>'+
	'          </tr>'+
	'          <tr>'+
	'            <td colspan="2"><br><br><br><br><br><br>Autorizo o desconto em minha folha de pagamento do valor preenchido neste documento.</td>'+
	'          </tr>'+
	'        </table>'+
	'        <table cellspacing=0 cellpadding=0 width=622 style="width:466.35pt;margin-left:-.25pt;border-collapse:collapse;border-top: hidden;">'+
	'          <tr>'+
	'            <td><br><center> <span class="signature">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Assinatura colaborador</center></td>'+
	'            <td><br><center> <span class="signature">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Local e data</center></td>'+
	'          </tr>'+
	'          <tr>'+
	'            <td><br><center> <span class="signature">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Testemunha</center></td>'+
	'            <td><br><center> <span class="signature">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Testemunha</center></td>'+
	'          </tr>'+
	'        </table>'+
	'        <br>'+
	'        <table cellspacing=0 cellpadding=0 width=622 style="width:466.35pt;margin-left:-.25pt;border-collapse:collapse ">'+
	'          <tr>'+
	'            <td>Declaro pleno conhecimento das informações.<br><br><br>'+
	'              <center><span class="signature">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>Assinatura do RH</center></td>'+
	'          </tr>'+
	'        </table>'+
	'        <br>'+
	'        <div style="background:#999999;text-align:center;color:white;">'+
	'          <p style="font-size:0.1pt">&nbsp;</p>'+
	'          <b><i><h2 style="font-family: arial;font-size:12.0pt;align-items:center;">USO EXCLUSIVO DO RH</h2></i></b>'+
	'          <p style="font-size:0.1pt">&nbsp;</p>'+
	'        </div>'+
	'      </div> '+
	'    </center>'+
	'  </body>'+
	'  </html>'
	var novaAba = window.open();
    novaAba.document.write(corpoHtml);
    novaAba.document.close();
}
function DadosFuncionario(){
	
}
