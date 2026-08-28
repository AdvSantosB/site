//TOOLTIP BOOTSTRAP
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//MENU ADICIONA CLASSE NO MENU CLICADO
var menuLink = document.querySelectorAll(".nav-link");
var urlAncora = window.location.hash.substring(1);

function linkAction() {
    menuLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    //fecha menu mobile
    document.querySelector(".navbar-collapse").classList.remove("show")
}
menuLink.forEach(n => n.addEventListener('click', linkAction))


//MENU SELECIONA CONFORME ATUAL URL AO CARREGAR PÁGINA
window.onload = function () {
    menuLink.forEach(function (linques) {
        linques.classList.remove("active");
        if (linques.dataset.ancora == urlAncora) {
            linques.classList.add("active")
        }
    });
};


//MENU MUDA ATIVO NA ROLAGEM (sem click menu)
let sections = document.querySelectorAll('section');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 85;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        let menulista = document.querySelectorAll('.nav-link[href*=' + id + ']');
        if (top >= offset && top < offset + height) {
            menuLink.forEach(n => n.classList.remove('active'));
            menulista.forEach(n => n.classList.add('active'));
        };
        //quando tiver uma área acima da primeira secção
        if (top <= 300) {
            menuLink.forEach(n => n.classList.remove('active'))
        }
    });
};


//MENU MOBILE FIXAR NO TOPO QUANDO SCROLL PARA CIMA
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
    //atual posição de rolagem
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        //scrolled up
        document.querySelector('nav').classList.remove("menu-updown");
    } else {
        //scrolled down
        document.querySelector('nav').classList.add("menu-updown");
        document.querySelector(".navbar-collapse").classList.remove("show")
    }
    //atualizar posição de rolagem anterior
    prevScrollPos = currentScrollPos;
});


//IR PARA O TOPO, REMOVE DA URL O TITULO DO MENU e Propaganda
let botSubir = document.querySelector(".subir");
let propaganda = document.querySelector(".devdesign");
window.addEventListener("scroll", (event) => {
    //sumir e aparecer
    let scroll = this.scrollY;
    if (scroll >= 1000) {
        botSubir.classList.add("aparecer")
        propaganda.classList.add("aparecer")
    } else {
        botSubir.classList.remove("aparecer")
        propaganda.classList.remove("aparecer")
    }
});
botSubir.onclick = function () {
    window.scrollTo(0, 0);
    menuLink.forEach(n => n.classList.remove('active'));
    history.pushState("", document.title, window.location.pathname + window.location.search);
};


//DETECTAR ALTURA DO SCROLL E INSERE A AÇÃO (menu nav cor)
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    let cartaoLogo = document.querySelector(".cartao-logo");
    let logoNav = document.querySelector(".logo-navegacao");
    if (scroll >= 550) {
        cartaoLogo.classList.add("remove-logocartao");
        logoNav.classList.add("aparece-logonav");
    } else {
        cartaoLogo.classList.remove("remove-logocartao");
        logoNav.classList.remove("aparece-logonav");
    }
    //console.log(scroll) 
});


//COPIAR TEXTO
const copiar = document.querySelector(".emailcopiar");

copiar.onclick = function () {
    document.execCommand("copy");
    alert('E-mail copiado!');
}
copiar.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", copiar.textContent);
    }
});


//MASCARA TELEFONE COM JQUERY.MASK
$('.cpf').mask('000.000.000-00');
$('.cep').mask('00000-000');
$('.tel').mask('(00) 00000-0000');
$('.cel').mask('00 0 0000 0000');

function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
};

//PROPAGANDA NO SITE
document.querySelector(".bi-x-square").onclick = function () {
    document.querySelector(".devdesign").style.display = "none";
}

//FORMULARIO ENVIO POR WHATSAPP
document.querySelector('.formulario').addEventListener('submit', function(event) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    // Captura apenas as respostas digitadas pelo usuário
    const nomeValor = document.getElementById('name').value;
    const telValor = document.getElementById('telefone').value;
    const emailValor = document.getElementById('email').value;
    const cidadeValor = document.getElementById('cidade').value;
    const msgValor = document.getElementById('message').value;

    // Monta o texto formatado escrevendo as perguntas e respostas manualmente
    let textoMensagem = `*Contato via Site Agenda*\n\n`;
    textoMensagem += `*Nome e sobrenome:* ${nomeValor}\n`;
    textoMensagem += `*Telefone:* ${telValor}\n`;
    textoMensagem += `*E-mail:* ${emailValor}\n`;
    textoMensagem += `*Cidade:* ${cidadeValor}\n`;
    textoMensagem += `*Em que podemos ajudar?:* \n${msgValor}`;

    // Codifica o texto para o formato de URL
    const textoCodificado = encodeURIComponent(textoMensagem);

    // Cria o link final e redireciona
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=5592991894020&text=${textoCodificado}`;
    window.open(urlWhatsapp, '_blank');
});
