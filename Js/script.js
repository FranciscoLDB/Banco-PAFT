class Conta{
    nome;
    #saldo;
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

    constructor(nome = '', saldo = 0){
        this.nome = nome;
        this.#saldo = saldo;
    }
    get saldo(){
        return this.#saldo;
    }
    set saldo(saldo){ 
        this.#saldo = saldo;
    }
}
const contaChico = new Conta('Chico', 2500);

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
                row.style.color = '#108d10';
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
btnExtrato.addEventListener('click', mostrar_extrato(contaChico));

window.addEventListener('resize', atualizar);
window.addEventListener('load', atualizar);

function atualizar() {
    var largura = window.screen.width;
    
    if (largura >= 992) {
        tableHead.innerHTML = 
        `<tr>
        <th scope="col">Data</th>
        <th scope="col">Movimentação</th>
        <th scope="col">Descrição</th>
        <th scope="col">Valor</th>
        </tr>`;
        tableBody.innerHTML = tbodyMaior;
    } else {
        tableHead.innerHTML = 
        `<tr>
        <th scope="col">Data</th>
        <th scope="col">Movimentação</th>
        <th scope="col">Valor</th>
        </tr>`;
        tableBody.innerHTML = tbodyMenor;
    }
};
