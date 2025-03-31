//
var ArmazenaParametros = ""

var mensagemDiv = null;

function setSelectedZoomItem(selectedItem) {
    if (selectedItem.type != null) {
        var name = selectedItem.type.split("___")[0];
        var indice = selectedItem.type.split("___")[1];
    };
    if (indice) {

    } else {
        if (name == "zoomFiltro") {
            //RetornoDataset('idfluig',selectedItem.idfluig)  
            ChamadosAbertosZoom('idfluig', selectedItem.idfluig)
        }
    }
}

function zoomFiltro(obj) {
    var type = $(obj).prev("input").attr("name");
    var filters = "";
    var searchby = "";
    tdizoom.open(
        "PainelChamadosNovo", //Nome do Dataset
        "idfluig,ID,DESCRICAO, DESCRICAO,REQUISITANTE,REQUISITANTE,NOME_TI,ATENDENTE,PROCES_DATA,DATA", //Campos a serem exibidos campo & coluna
        "idfluig,DESCRICAO,REQUISITANTE,NOME_TI,PROCES_DATA", //Campos de retorno
        "Chamados", //Titulo
        filters, //Filtros
        type, //Type (deve ser sempre o atributo name do campo)
        null, //likefield
        null, //likevalue
        searchby // Campo/Constraint que sera buscado o conteudo digitado (Seachby)        
    );
}


// =================== FUNCOES PRINCIPAIS =======================

// QUANDO A PÁGINA É CARREGADA PELA PRIMEIRA VEZ
function Inicial(obj, valor) {  
    var UsuarioLogado = WCMAPI.userCode;
    var img = document.getElementById('userImage');
    img.src = "https://fluig.jfi.com.br/social/api/rest/social/image/" + UsuarioLogado;

    valor = UsuarioLogado;

    var tabela = document.getElementById("TabelaPrincipal");
    var tbody = tabela.getElementsByTagName("tbody")[0];

    // Limpa a tabela
    if (tbody && tbody.rows.length > 0) {
        while (tbody.rows.length > 0) {
            tbody.deleteRow(0);
        }
    }

    var dados = RetornoDataset(obj, valor);

    if (dados && dados.values.length > 0) {
        for (var i = 0; i < dados.values.length; i++) {
            var idfluig = dados.values[i]["NUM_PROCES"];
            var NOME_PROCESSO = dados.values[i]["NOME_PROCESSO"];
            var CATEGORIA = dados.values[i]["CATEGORIA"];
            var RESP = dados.values[i]["RESP"];
            var DSL_INSTRUC = dados.values[i]["DSL_INSTRUC"];
            var DES_ESTADO = dados.values[i]["DES_ESTADO"];
            var REQUISITANTE = dados.values[i]["REQUISITANTE"];

            var row = tbody.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.innerHTML = '<span style="cursor: pointer;" onclick="Redirecionar(' + idfluig + ')">' + idfluig + '</span>';
            cell2.innerHTML = '<img src="https://fluig.jfi.com.br/social/api/rest/social/image/'+REQUISITANTE+'" style="width: 30px;height: 30px;border-radius: 50%; object-fit: cover;"></img>&nbsp&nbsp&nbsp<span>'+REQUISITANTE+'</span>'
            cell3.innerHTML = NOME_PROCESSO;
            cell4.innerHTML = RESP;
            cell5.innerHTML = DES_ESTADO;
            cell6.innerHTML = CATEGORIA;

            row.setAttribute('title', DSL_INSTRUC);
            row.classList.add('tooltip-hover');
            row.setAttribute('onclick', 'Redirecionar(' + idfluig + ')');
            row.style.cursor = 'pointer';
        }

        // Atualiza a quantidade de registros
        var quantidadeRegistros = dados.values.length;
        document.getElementById("quantidadeRegistros").textContent = quantidadeRegistros;
    } else {
        console.log("Nenhum chamado encontrado.");
        // Se não houver registros, define a quantidade como 0
        document.getElementById("quantidadeRegistros").textContent = 0;
    }

    ArmazenaParametros = "ResponsavelAberto('" + obj + "','" + valor + "')"; 
    GeraTabela2();
}

// =========== FUNCOES EXTRAS ===============


function atualizarSelectAtendente() {
    try {
        var dataset = DatasetFactory.getDataset("RHU_DADOSUSUARIOLOGADO", null, null, null);
        var emailSelecionado = dataset.values[0]["EMAIL"];

        var divfoot = document.getElementById("divfoot"); // Obtém o elemento pai
        var selects = divfoot.querySelectorAll("select"); // Obtém todos os elementos select dentro de divfoot
        
        if (selects.length >= 3) { // Verifica se existem pelo menos 3 selects
            var selectAtendente = selects[2]; // Obtém o terceiro select

            if (emailSelecionado === "ana.garcia@jfi.com.br") {
                selectAtendente.value = "ANA";            
            }              
            else if (emailSelecionado === "leandro.carriel@jfi.com.br") {        
                selectAtendente.value = "LEANDRO";
            }
            else if (emailSelecionado === "lucas.kiyoshi@jfi.com.br") {
                selectAtendente.value = "LUCAS";            
            } 
            else if (emailSelecionado === "natan.mendes@jfi.com.br") {
                selectAtendente.value = "NATAN";            
            } 
            else if (emailSelecionado === "marcos.moraes@jfi.com.br") {
                selectAtendente.value = "MARCOS";            
            } 
            else if (emailSelecionado === "matheus.costa@jfi.com.br") {
                selectAtendente.value = "MATHEUS";            
            }             
            else if (emailSelecionado === "maria.faria@jfi.com.br") {
                selectAtendente.value = "MARIA";            
            } 
            else if (emailSelecionado === "rogerio@jfi.com.br") {
                selectAtendente.value = "ROGÉRIO";            
            }
            /*
            else if (emailSelecionado === "tiago.furlan@jfi.com.br") {
                selectAtendente.value = "TIAGO";            
            }  
            */
            else if (emailSelecionado === "kauan.theodoro@jfi.com.br") {
                selectAtendente.value = "KAUAN";       
            }  
            else {
                selectAtendente.value = "";                 
            }

            // Dispara manualmente o evento de mudança no select
            var event = new Event('change');
            selectAtendente.dispatchEvent(event);
        } else {
            console.error("Não foi possível encontrar o terceiro select dentro de divfoot.");
        }
    } catch (error) {
        console.error("Ocorreu um erro:", error.message);
    }
}

function atualizarIndicadores() {
    var dataset = DatasetFactory.getDataset("QTD_Chamados", null, null, null);

    if (dataset && dataset.values.length > 0) {
        var semAtribuicao = dataset.values[0]["QTD_ATRIBUICAO"];
        var abertos = dataset.values[0]["QTD_ABERTO"];
        var atendimento = dataset.values[0]["QTD_ATENDIMENTO"];
        var entendimento = dataset.values[0]["QTD_ENTENDIMENTO"];
        var aprovacao = dataset.values[0]["QTD_APROVACAO"];

        // Verificar se os valores são diferentes de zero antes de atualizar os indicadores
        if (semAtribuicao !== 0) {
            animateValue("IndicadorChamadosSemAtribuicao", 0, semAtribuicao, 1000);
        }
        if (abertos !== 0) {
            animateValue("IndicadorChamadosAbertos", 0, abertos, 1000);
        }
        if (atendimento !== 0) {
            animateValue("IndicadorChamadosAtendimento", 0, atendimento, 1000);
        }
        if (entendimento !== 0) {
            animateValue("IndicadorChamadosEntendimento", 0, entendimento, 1000);
        }
        if (aprovacao !== 0) {
            animateValue("IndicadorChamadosAprovacao", 0, aprovacao, 1000);
        }
    } else {
        console.log("Dataset QTD_Chamados vazio ou não carregado.");
    }
}

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    // Ajuste aqui para uma animação mais lenta
    stepTime *= 1.5;
    var obj = document.getElementById(id);
    var timer = setInterval(function () {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

/* function FiltroPeriodo() {
    var dataInicial = new Date(document.getElementById('dataInicial').value);
    var dataFinal = new Date(document.getElementById('dataFinal').value);

    if (dataInicial && dataFinal) {
        var tabela = document.getElementById("TabelaPrincipal");
        for (var i = 1; i < tabela.rows.length; i++) {
            var rowData = tabela.rows[i].cells[6].innerHTML.trim();

            var partesData = rowData.split('/');
            var dia = parseInt(partesData[0], 10);
            var mes = parseInt(partesData[1], 10) - 1; // O mês no objeto Date é baseado em zero
            var ano = parseInt(partesData[2], 10);
            var dataRegistro = new Date(ano, mes, dia);

            if (dataRegistro >= dataInicial && dataRegistro <= dataFinal) {
                tabela.rows[i].style.display = ''; // Mostrar 
            } else {
                tabela.rows[i].style.display = 'none'; // Ocultar 
            }
        }
    }
}

function LimparFiltros() {
    // Limpar campos de data
    document.getElementById('dataInicial').value = '';
    document.getElementById('dataFinal').value = '';

    // Limpar filtro na tabela de chamados
    var tabela = document.getElementById("TabelaPrincipal");
    for (var i = 1; i < tabela.rows.length; i++) {
        tabela.rows[i].style.display = ''; // Mostrar todas as linhas
    }
}
*/

/* function popularSelect() {
    try {
        var dataset = DatasetFactory.getDataset("DatasetGrupoTI", null, null, null);
        var select = document.getElementById('selectNome');

        select.innerHTML = '';

        var emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '';
        select.appendChild(emptyOption);

        for (var i = 0; i < dataset.values.length; i++) {
            var login = dataset.values[i]['LOGIN'];
            var email = dataset.values[i]['EMAIL'];
            var option = document.createElement('option');
            option.text = login;
            option.value = email;
            select.add(option);
        }
    } catch (error) {
        console.error('Erro ao popular o select:', error);
    }

    var select = document.getElementById('selectNome');
    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        var username = option.text.split('.')[0]; // Obtém o primeiro nome
        if (username === 'admin') {
            option.text = 'Gustavo';
        } else {
            option.text = username.charAt(0).toUpperCase() + username.slice(1);
        }
    }
}*/

function RetornoDataset(obj, valor) {
    try {
        var const1 = DatasetFactory.createConstraint(obj, valor, valor, ConstraintType.MUST); // TIPO        
        var dataset = DatasetFactory.getDataset("CentralDeTarefas_JFI", null, [const1], null);
        return dataset;
    } catch (e) {
        console.error("Erro ao retornar: " + e.message);
        return null;
    }
}

function redirecionarParaChamado(idChamado) { // VIEW
    try {
        //window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_processInstanceId=' + idChamado + '&app_ecm_workflowview_managerMode=true&app_ecm_workflowview_detailsProcessInstanceID=' + idChamado,'_blank');
        //window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_processInstanceId=' + idChamado +'&app_ecm_workflowview_currentMovto=4&app_ecm_workflowview_managerMode=true', '_blank');
        //window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_processInstanceId=' + idChamado + '&app_ecm_workflowview_managerMode=true&app_ecm_workflowview_detailsProcessInstanceID=' + idChamado,'_blank');
        window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + idChamado, '_blank');
    } catch (error) {
        console.error('Erro ao redirecionar para o chamado:', error);
    }
}

function Redirecionar(idChamado) { // ATENDIMENTO 
    try {
        window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + idChamado ,'_blank');
    } catch (error) {
        console.error('Erro ao redirecionar para o chamado:', error);
    }
}

function redirecionarParaChamadoZoom(idChamado) { // ZOOM 
    try {
        window.open('https://fluig.jfi.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + idChamado, '_blank');
    } catch (error) {
        console.error('Erro ao redirecionar para o chamado:', error);
    }
}

//var segundos = 0;

/* function atualizarTabela() {
    //console.log("Segundos corridos: " + segundos);
    //segundos += 30; 
    eval(ArmazenaParametros);
}
setInterval(atualizarTabela, 100000)
*/

function atualizarTabela() {
    // Destruir o DataTable existente, se houver
    var tabela = $('#TabelaPrincipal').DataTable();
    if (tabela) {
        tabela.destroy();
    }

    // Executar a função para atualizar os dados da tabela
    eval(ArmazenaParametros);

    // Inicializar o DataTable novamente após atualizar os dados
    $('#TabelaPrincipal').DataTable();
}

//setInterval(atualizarTabela, 300000);

/* function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("TabelaPrincipal");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];
            var xValue = x.innerHTML.toLowerCase();
            var yValue = y.innerHTML.toLowerCase();
            if (dir == "asc") {
                if (columnIndex === 8) {
                    // Se for a coluna das horas abertas, comparar os valores como números
                    xValue = parseFloat(x.innerHTML);
                    yValue = parseFloat(y.innerHTML);
                } else if (columnIndex === 6) {
                    // Se for a coluna de abertura, comparar os valores como datas
                    xValue = new Date(getDateFromFormat(x.innerHTML, "dd/MM/yyyy")).getTime();
                    yValue = new Date(getDateFromFormat(y.innerHTML, "dd/MM/yyyy")).getTime();
                }
                if (xValue > yValue) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (columnIndex === 8) {
                    // Se for a coluna das horas abertas, comparar os valores como números
                    xValue = parseFloat(x.innerHTML);
                    yValue = parseFloat(y.innerHTML);
                } else if (columnIndex === 6) {
                    // Se for a coluna de abertura, comparar os valores como datas
                    xValue = new Date(getDateFromFormat(x.innerHTML, "dd/MM/yyyy")).getTime();
                    yValue = new Date(getDateFromFormat(y.innerHTML, "dd/MM/yyyy")).getTime();
                }
                if (xValue < yValue) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
*/

// Função auxiliar para extrair a data no formato específico
function getDateFromFormat(dateString, format) {
    var arr = dateString.split('/');
    var date = new Date(arr[2], arr[1] - 1, arr[0]);
    return date;
}

function limparTooltips() {
    $('[data-toggle="tooltip"]').tooltip('hide');
}

setInterval(limparTooltips, 179000)

$(document).ready(function () {

    // Remover o tooltip quando o mouse sair do elemento
    $('[data-toggle="tooltip"]').on('mouseleave', function () {
        $(this).tooltip('hide');
    });

    // Inicializar tooltips
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'top',
        container: 'body',
        trigger: 'hover'
    });
});

atualizarTabela()

function VerificaExisteTabela() {
    // Verifica se existe a tabela com o ID 'TabelaPrincipal' e se ela possui linhas
    var tabela = $('#TabelaPrincipal').DataTable();
    if (tabela && tabela.rows().count() > 0) {
        // Se a tabela existe e possui linhas, destrói a tabela
        tabela.destroy();
    } else {
        tabela.destroy();
        // Se a tabela não existe ou não possui linhas, não faz nada        
    }
}

function GeraTabela2() {                

    DataTable.datetime('DD/MM/YYYY');
    // Inicializa o DataTable com configuração de layout
    var tabela = new DataTable('#TabelaPrincipal', {
        //language: {
        //    url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-BR.json'
        //},
        layout: {
            bottomEnd: {
                paging: {
                    boundaryNumbers: false
                }
            },
            pagingType: false
        },
        lengthMenu: [200],
        // CARREGA SEM ORDENAÇÃO NENHUMA
        order: [],
        // Configuração para adicionar seletores de filtro por coluna
        initComplete: function () {
            var divfoot = $('#divfoot'); // Seleciona o elemento onde os selects serão inseridos

            // Limpa o conteúdo do elemento antes de adicionar os filtros
            divfoot.empty();

            this.api().columns([3, 4, 5]).every(function () {
                var column = this;
                var container = $('<div class="filter-container" style="margin-left: 15px; width: 30%;"></div>'); // Container para cada filtro
                var label = $('<label class="filter-label"></label>').text(column.header().textContent + ':'); // Cria o label com o título da coluna
                var select = $('<select class="form-control filter-select" style="padding: 5px"><option value=""></option></select>')
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')                                
                });

                container.append(label).append(select); // Adiciona o label e o select ao container
                divfoot.append(container); // Adiciona o container ao elemento pai
            });
        }
    });
}

// -----------------------------------------------------------------------
// --------------------------- 31 - 03 - 2025 ----------------------------
// -----------------------------------------------------------------------

function atualizarSelectComDadosDataset() {
    // Chama a função para obter os dados do dataset
    var UsuarioLogado = WCMAPI.userCode;
    const dataset = chamarRetornoDatasetComSubNome(UsuarioLogado);
    
    if (!dataset || dataset.values.length === 0) {
        console.log("Nenhum dado encontrado no dataset");
        return;
    }

    // Obtém o elemento select pelo ID
    const selectElement = document.getElementById('Substituto');
    
    if (!selectElement) {
        console.error("Elemento select com ID 'Substituto' não encontrado");
        return;
    }

    // Limpa as opções existentes
    selectElement.innerHTML = '';

    // Adiciona as novas opções baseadas no dataset
    dataset.values.forEach(item => {
        const option = document.createElement('option');
        option.value = item.CD_MATRICULA; // Usa a matrícula como value
        option.textContent = item.NOME;   // Usa o nome como texto exibido
        selectElement.appendChild(option);
    });

    console.log("Select atualizado com sucesso");
}

// Função auxiliar que você já tinha
function chamarRetornoDatasetComSubNome(valor) {
    try {
        const dataset = RetornoDataset("SUB_NOME", valor);
        console.log("Dataset retornado:", dataset);
        return dataset;
    } catch (e) {
        console.error("Erro ao chamar RetornoDataset: " + e.message);
        return null;
    }
}
