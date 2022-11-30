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
const chavesPix = {};
contaChico.pix = 10101010;
chavesPix[10101010] = contaChico;
contaJorge.pix = 12345678;
chavesPix[12345678] = contaJorge;
console.log(chavesPix);

let tableHead = document.querySelector('thead');
let tableBody = document.querySelector('tbody');
let theadMaior = `<tr>
    <th scope="col class="col-3">Data</th>
    <th scope="col" class="col-3">Movimentação</th>
    <th scope="col" class="col-3">Descrição</th>
    <th scope="col" class="col-3">Valor</th>
    </tr>`;
let theadMenor = `<tr>
    <th scope="col" class="col-3">Data</th>
    <th scope="col" class="col-6">Movimentação</th>
    <th scope="col" class="col-3">Valor</th>
    </tr>`;
let tbodyMaior = '';
let tbodyMenor = '';
let mostrar_extrato = function (conta){
    return function (){
        tableBody.innerHTML = "";
        for(let i = 0; i < conta.extrato.length; i++){
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
if(btnExtrato != null){
    btnExtrato.addEventListener('click', mostrar_extrato(contaChico));
}

async function init_pagamento(){
    let detalhesPagamento = document.getElementById('detalhes-pagamento');
    let selectPagamento = document.getElementById('select-pagamento');
    let labelChave = document.getElementById('label-chave');
    let valor = document.querySelector('.input-valor');
    let chave = document.querySelector('.input-chave');
    try{
        selectPagamento.addEventListener('change', () => {
            if(selectPagamento.value == 'boleto'){
                labelChave.innerHTML = 'Codigo de barras';
            } else {
                labelChave.innerHTML = 'Chave pix';
            }
            reset_pagamento();
        });
        chave.addEventListener('change', reset_pagamento);
        valor.addEventListener('change', reset_pagamento);
        
        let btnPagar = document.getElementById('btn-pagar');
        btnPagar.addEventListener('click', mostrar_pagamento);
        console.log('Pagamento inicializado com sucesso');
    } catch (e) {
        console.log('Erro ao inicializar pagamento ' + e);
    }

    function reset_pagamento(){
        detalhesPagamento.innerHTML = `
        <div class="col-12">
            <button type="button" class="btn btn-dark" id="btn-pagar" >Proseguir</button>
        </div>`;
        document.getElementById('btn-pagar').addEventListener('click', mostrar_pagamento);
    }

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
}
init_pagamento();

async function init_emprestimo(){
    let valorDesejado = document.querySelector('#valor-desejado');
    let slider = document.querySelector('.range-valor');
    let selectEmp = document.querySelector('#numero-parcelas');
    let btnSimularEmp = document.querySelector('#btn-simular-emprestimo');
    let resumoParcelas = document.querySelector('#resumo-parcelas');
    let totalAPagar = document.querySelector('#total-a-pagar');
    let btnSolicitarEmp = document.querySelector('#btn-sol-emprestimo');

    try{
        for (let i = 1; i < 12; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.id = i;
            opt.text = i + 'x';
            selectEmp.appendChild(opt);
        }
        for (let i = 1; i < 4; i++) {
            let opt = document.createElement('option');
            opt.value = i * 12;
            opt.id = i*12;
            opt.text = (i*12) + 'x';
            selectEmp.appendChild(opt);
        }
        slider.value = 2500;
        
        slider.addEventListener('input', () => {
            valorDesejado.innerHTML = `R$${slider.value},00`;
        });
    
        btnSimularEmp.addEventListener('click', () => {
            let numP = selectEmp.value;
            let jurosM = (6.25**(1/12))-1;
            let valorP = slider.value * (Math.pow((1+jurosM),numP)*jurosM)/(Math.pow((1+jurosM),numP)-1);
            valorP = valorP.toFixed(2);
            valorP.toString().replace('.', ',');
            resumoParcelas.innerHTML = `${numP}x de R$${valorP.toString().replace('.', ',')}`;
            totalAPagar.innerHTML = `R$${((numP*valorP).toFixed(2)).toString().replace('.', ',')}`;
        });
    } catch (e) {
        console.log('Erro ao inicializar pagamento ' + e);
    }

}
init_emprestimo();


window.addEventListener('resize', atualizar);
window.addEventListener('load', atualizar);
function atualizar() {
    var largura = window.screen.width;    
    if (largura >= 992) {
        if(btnExtrato != null){   
            tableHead.innerHTML = theadMaior;
            tableBody.innerHTML = tbodyMaior;
        }
    } else {
        if(btnExtrato != null){
            tableHead.innerHTML = theadMenor;
            tableBody.innerHTML = tbodyMenor;
        }
    }
};

try{
    $(document).ready(() => {
        $(".input-tel").mask("(99) 99999-9999");
        $(".input-cpf").mask("999.999.999-99");
        $(".input-cep").mask("99999-999");
    });
}catch(e){
    console.log('Erro na inicializacao da mascara ' + e);
}

// Validacao do cadastro    
(() => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if(!valida_form()){
                console.log('event' + event);
                event.preventDefault();
                event.stopPropagation();
            }
        }, false)
    })
})()

let btnCadastro = document.getElementById('btn-cadastrar');
let formNome = document.querySelector('.input-nome');
let formSobreN = document.querySelector('.input-sobrenome');
let formTel = document.querySelector('.input-tel');
let formCPF = document.querySelector('.input-cpf');
let formEmail = document.querySelector('.input-email');
let formSenha = document.querySelector('.input-senha');
let formCidade = document.querySelector('.input-cidade');
let formCEP = document.querySelector('.input-cep');

function valida_text(text){
    return (/^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(text));
}
function valida_telefone(tel){
    return (/^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(tel));
}
function valida_cpf(cpf){
    return (/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/.test(cpf));
}
function valida_cep(cep){
    return (/^[1-9][0-9]{4}-[0-9]{3}$/.test(cep));
}
function valida_email(email){
    return (/\S+@\S+\.\S+/.test(email));
}
function valida_senha(senha){
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(senha));
}

function valida_form(){
    let valido = true;
    if(valida_text(formNome.value)){
        formNome.classList.replace('input-invalido', 'input-valido');
        formNome.classList.add('input-valido');
    } else {
        formNome.classList.add('input-invalido');
        valido = false;
    }
    if(valida_text(formSobreN.value)){
        formSobreN.classList.replace('input-invalido', 'input-valido');
        formSobreN.classList.add('input-valido');
    } else {
        formSobreN.classList.add('input-invalido');
        valido = false;
    }
    if(valida_telefone(formTel.value)){
        formTel.classList.replace('input-invalido', 'input-valido');
        formTel.classList.add('input-valido');
    } else {
        formTel.classList.add('input-invalido');
        valido = false;
    }
    if(valida_cpf(formCPF.value)){
        formCPF.classList.replace('input-invalido', 'input-valido');
        formCPF.classList.add('input-valido');
    } else {
        formCPF.classList.add('input-invalido');
        valido = false;
    }
    if(valida_email(formEmail.value)){
        formEmail.classList.replace('input-invalido', 'input-valido');
        formEmail.classList.add('input-valido');
    } else {
        formEmail.classList.add('input-invalido');
        valido = false;
    }
    if(valida_senha(formSenha.value)){
        formSenha.classList.replace('input-invalido', 'input-valido');
        formSenha.classList.add('input-valido');
    } else {
        formSenha.classList.add('input-invalido');
        valido = false;
    }
    if(valida_text(formCidade.value)){
        formCidade.classList.replace('input-invalido', 'input-valido');
        formCidade.classList.add('input-valido');
    } else {
        formCidade.classList.add('input-invalido');
        valido = false;
    }
    if(valida_cep(formCEP.value)){
        formCEP.classList.replace('input-invalido', 'input-valido');
        formCEP.classList.add('input-valido');
    } else {
        formCEP.classList.add('input-invalido');
        valido = false;
    }
    return valido;
}

function validateTest(desc,fn){
    try {
        fn();
        console.log("Test sucess :"+desc);
    } catch (error) {
        console.log("Test failure:"+desc);
        console.assert(error);
    }
}
function assert(isTrue){
    if(!isTrue){
        throw new Error();
    }
}

// Testes
function rodar_testes(){
    validateTest('TELEFONE OK',() =>{
        assert(valida_telefone('(41)99595-4489'));
        assert(valida_telefone('(41) 99595-4489'));
    });
    validateTest('CPF OK',() =>{
        assert(valida_cpf('015.951.118-50'));
    });
    validateTest('CEP OK',() =>{
        assert(valida_cep('83325-111'));
    });
    validateTest('EMAIL OK',() =>{
        assert(valida_email('exemplo@ex.com'));
        assert(valida_email('exemplo@ex.com.br'));
        assert(valida_email('exemplo@gnail.br'));
    });
    validateTest('SENHA OK',() =>{
        assert(valida_senha('minhasenha22'));
        assert(valida_senha('bicholoco98'));
        assert(valida_senha('2ardd847uino'));
    });
    validateTest('TELEFONE FALHAR',() =>{
        assert(valida_telefone('(41)995-4489'));
    });
    validateTest('CPF FALHAR',() =>{
        assert(valida_cpf('115.91.118-0'));
    });
    validateTest('CEP FALHAR',() =>{
        assert(valida_cep('03325-111'));
    });
    validateTest('EMAIL FALHAR',() =>{
        assert(valida_email('exemplo@.com'));
    });
    validateTest('SENHA FALHAR',() =>{
        assert(valida_senha('minh22'));
        assert(valida_senha('senhaminha'));
    });
}
rodar_testes();
