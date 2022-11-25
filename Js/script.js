const extrato = [
    {
        data: "16/06",
        mov: "Saida",
        descricao: "Lojas Americanas",
        valor: 500
    },
    {
        data: "02/10",
        mov: "Entrada",
        descricao: "Lojas Americanas",
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
        descricao: "Lojas Americanas",
        valor: 1500
    },
    {
        data: "22/11",
        mov: "Saida",
        descricao: "Lojas Americanas",
        valor: 1500
    }
]
let tableHead = document.querySelector('thead');
let tableBody = document.querySelector('tbody');

function mostrar_extrato(){
    var largura = window.screen.width;
    tableBody.innerHTML = "";
    for(let i = 0; i < extrato.length; i++){
        console.log("entro no for");
        let row = document.createElement('tr');
        let data = document.createElement('td');
        let mov = document.createElement('td');
        let desc = document.createElement('td');
        let valor = document.createElement('td');
        
        data.innerHTML = extrato[i].data;
        mov.innerHTML = extrato[i].mov;
        desc.innerHTML = extrato[i].descricao;
        if(mov.innerHTML == "Saida"){
            valor.innerHTML = "-";
            row.style.backgroundColor = '#ff524866';
        }else{
            row.style.backgroundColor = '#77ab5966';
        }
        valor.innerHTML += `R$${extrato[i].valor.toFixed(2) }`;

        row.appendChild(data);
        row.appendChild(mov);
        if (largura >= 992) {
            row.appendChild(desc);
        }
        row.appendChild(valor);

        tableBody.appendChild(row);
    }
}

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
            </tr>
            `;
    } else {
        tableHead.innerHTML = 
            `<tr>
                <th scope="col">Data</th>
                <th scope="col">Movimentação</th>
                <th scope="col">Valor</th>
            </tr>
            `;
    }
};
