class Conta{
    nome;
    #saldo;
    banco;
    agencia;
    pix;
    extrato = [
        {
            data: "16/06",
            mov: "Saida",
            descricao: "Casas Bahia",
            valor: 500
        },
        {
            data: "02/10",
            mov: "Entrada",
            descricao: "Joao Carlos",
            valor: 1500
        },
        {
            data: "07/10",
            mov: "Entrada",
            descricao: "Salario",
            valor: 3500
        },
        {
            data: "16/10",
            mov: "Saida",
            descricao: "Lojas Americanas",
            valor: 1500
        },
        {
            data: "10/11",
            mov: "Saida",
            descricao: "Nuuvem",
            valor: 350
        },
        {
            data: "22/11",
            mov: "Saida",
            descricao: "Lojas Americanas",
            valor: 1500
        }
    ];
    constructor(nome = '', saldo = 0, banco = ''){
        this.nome = nome;
        this.#saldo = saldo;
        this.banco = banco;
        this.agencia = (Math.random()*(999999 - 100000) + 100000).toFixed(0);
    }
    get saldo(){
        return this.#saldo;
    }
    set saldo(saldo){ 
        this.#saldo = saldo;
    }
}
const contaChico = new Conta('Chico', 2500, 'NuBank');
const contaJorge = new Conta('Jorge', 1200, 'Inter');
const chavesPix = {
};
contaChico.pix = 10101010;
chavesPix[10101010] = contaChico;
contaJorge.pix = 12345678;
chavesPix[12345678] = contaJorge;
console.log(chavesPix);

let tableHead = document.querySelector('thead');
let tableBody = document.querySelector('tbody');
let tbodyMaior = '';
let tbodyMenor = '';
let mostrar_extrato = function (conta){
    return function (){
        var largura = window.screen.width;
        tableBody.innerHTML = "";
        for(let i = 0; i < conta.extrato.length; i++){
            console.log("entro no for");
            let row = document.createElement('tr');
            let data = document.createElement('td');
            let mov = document.createElement('td');
            let desc = document.createElement('td');
            let valor = document.createElement('td');        
            
            row.className = 'row-extrato';
            data.innerHTML = conta.extrato[i].data;
            mov.innerHTML = conta.extrato[i].mov;
            desc.innerHTML = conta.extrato[i].descricao;
            desc.className = 'desc';
            if(mov.innerHTML == "Saida"){
                valor.innerHTML = "-";
                //row.style.backgroundColor = '#ff524866';
                row.style.color = '#f9220e';
            }else{
                //row.style.backgroundColor = '#77ab5966';
                row.style.color = '#279500';
            }
            valor.innerHTML += `R$${conta.extrato[i].valor.toFixed(2)}`;

            row.appendChild(data);
            row.appendChild(mov);
            row.appendChild(desc);
            row.appendChild(valor);        
            tableBody.appendChild(row);
        }
        tbodyMaior = tableBody.innerHTML;
        const descricoes = document.getElementsByClassName("desc");
        for (let i = descricoes.length; i > 0; i--) {
            descricoes[i-1].remove();
        }
        tbodyMenor = tableBody.innerHTML;

        atualizar();
    }
}
let btnExtrato = document.getElementById('btn-extrato');
if(!(btnExtrato == null)){
    btnExtrato.addEventListener('click', mostrar_extrato(contaChico));
}

let detalhesPagamento = document.getElementById('detalhes-pagamento');
let confirmaPagamento = document.getElementById('confirma-pagamento');
let selectPagamento = document.getElementById('select-pagamento');
let labelChave = document.getElementById('label-chave');
let valor = document.querySelector('.input-valor');
let chave = document.querySelector('.input-chave');

selectPagamento.addEventListener('change', () => {
    if(selectPagamento.value == 'boleto'){
        labelChave.innerHTML = 'Codigo de barras';
    } else {
        labelChave.innerHTML = 'Chave pix';
    }
    reset_pagamento();
});

function reset_pagamento(){
    detalhesPagamento.innerHTML = `
    <div class="col-12">
        <button type="button" class="btn btn-dark" id="btn-pagar" >Proseguir</button>
    </div>`;
    document.getElementById('btn-pagar').addEventListener('click', mostrar_pagamento);
}
chave.addEventListener('change', reset_pagamento);

async function mostrar_pagamento(){    
    let recebedor = await chavesPix[chave.value];    
    try{
        detalhesPagamento.innerHTML =    
            `<h2>Detalhes do pagamento</h2>
            <p><strong>Recebedor</strong> <span>${recebedor.nome}</span></p>
            <p><strong>Banco</strong> <span>${recebedor.banco}</span></p>
            <p><strong>Agencia</strong> <span>${recebedor.agencia}</span></p>
            <div class="row confirma-pagamento">
            <div class="col-6">
            <span>Total a pagar</span>
            <p>R$${valor.value},00</p>
            </div>
            <div class="col-6">
            <button type="button" class="btn btn-dark" id="btn-pagar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Pagar</button>
            </div>
            </div>`;
    } catch {
        detalhesPagamento.innerHTML =    
            `<h2>Houve um erro</h2>
            <p><strong>Chave pix ${chave.value} nao localizada</strong></p>
            </div>
            <div class="col-12">
            <button type="button" class="btn btn-dark" id="btn-pagar">Pagar</button>
            </div>
            </div>`;
            document.getElementById('btn-pagar').addEventListener('click', mostrar_pagamento);
    }
}
    
let pagar = function(){
    return function(){

    }
}

let btnPagar = document.getElementById('btn-pagar');
btnPagar.addEventListener('click', mostrar_pagamento);

window.addEventListener('resize', atualizar);
window.addEventListener('load', atualizar);

function atualizar() {
    var largura = window.screen.width;    
    if (largura >= 992) {
        if(!(btnExtrato == null)){   
            tableHead.innerHTML = 
            `<tr>
            <th scope="col">Data</th>
            <th scope="col">Movimentação</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            </tr>`;
            tableBody.innerHTML = tbodyMaior;
        }
    } else {
        if(!(btnExtrato == null)){
            tableHead.innerHTML = 
            `<tr>
            <th scope="col">Data</th>
            <th scope="col">Movimentação</th>
            <th scope="col">Valor</th>
            </tr>`;
            tableBody.innerHTML = tbodyMenor;
        }
    }
};
