// Dados para a api da openweather
const chaveApi = 'SUA_CHAVE_API';
var data = null;

// Função para ocultar as informações enquanto o loader estiver ativo
const ocultarInformacoes = () => {
    const container = document.querySelector('.card-clima')
    const paragrafos = container.querySelectorAll('p');
    paragrafos.forEach(p => {
        p.style.display = 'none';
    });
    const temperaturaTitulo = container.querySelector('h2').style.display = 'none';
}
// Função para exibir as informações ao fim do loading
const exibirInformacoes = () => {
    const container = document.querySelector('.card-clima');
    const paragrafos = container.querySelectorAll('p');
    paragrafos.forEach(p => {
        p.style.display = 'flex';
    });
    const temperaturaTitulo = container.querySelector('h2').style.display = 'block';
}

// Função que faz a requisição ao servidor da OpenWeather, com sua url Montada baseada na cidade que o usuário buscar
const requisicaoApiOpenWeather = (cidadeUsuario) => {
    // aqui: mostra o loader
    document.getElementById("loader").style.display = "flex";

    // URL Preenchida com esses dados acima (Mais o parâmetro LANG para definir o idioma das informações)
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=
    ${cidadeUsuario}&appid=${chaveApi}&lang=PT&units=metric`

    // Faz a busca no banco de dados
    fetch(urlApi).then(response => response.json())
        .then(data => {
            console.log(data); // Exibe os dados retornados pela API
            adicionandoDadosAoDOM(data);
            document.getElementById("loader").style.display = "none";
            exibirInformacoes();
        })
        .catch(error => {
            console.error(error)
            // aqui: mostra o loader
            document.getElementById("loader").style.display = "none";
            exibirInformacoes();
        }
        );
}
// Função para coletar a cidade digitada pelo usuário no input, com a cidade inserida, é feita uma requisição até a api da openweather
const buscarDadosCidadeUsuario = () => {
    let cidadeUsuario = document.getElementById('cidadePesquisada').value
    requisicaoApiOpenWeather(cidadeUsuario)
    ocultarInformacoes();
}
// Preenchendo os campos que o usuário vai ver com as informações que foram retornadas do banco de dados
const adicionandoDadosAoDOM = (data) => {
    // pegando e preenchendo os campos do DOM com os dados da minha API
    const cidade = document.getElementById('nomeCidade').innerText = `${data.name}`;
    const temperatura = document.getElementById('temperatura').innerText = `${Math.round(data.main.temp) + "°"}`;
    const vento = document.getElementById('vento').innerHTML = `<span class="material-symbols-outlined simbolos">airwave</span>${data.wind.speed + "m/s"}`;
    const humidade = document.getElementById('humidade').innerHTML = `<span class="material-symbols-outlined simbolos">humidity_high</span> ${data.main.humidity + "%"}`;
    const pressao = document.getElementById('pressao').innerHTML = `<span class="material-symbols-outlined simbolos">mist</span> ${data.main.pressure + "hPa"}`;
    const temperaturaMinima = document.getElementById('temperaturaMinima').innerHTML = `<span class="material-symbols-outlined simbolos">device_thermostat</span>${data.main.temp_min + "°"}`;
}
// Adiciona ao botão de pesquisar, o evento de click, isso faz com que ele chame uma função para buscar os dados refrentes a cidade que o usuário pesquisou
const botao = document.getElementById('botaoPesquisar').addEventListener('click', buscarDadosCidadeUsuario)

// Array com cidades, para ser usado na função "buscarCidadeAleatoria" executada sempre que a página é carregada
const cidades = [
    "Sao paulo",
    "Ipu",
    "Ipueiras",
    "El salvador"
];
// Função que adiciona dados padrões de inicio na tela sempre que a página for recarregada
const buscarCidadeAleatoria = (arr) => {
    const indiceAleatorio = Math.floor(Math.random() * arr.length)
    const cidadeAleatoria = arr[indiceAleatorio]
    // Chamando a função de requisição, passaremos uma cidade aleatoria como parâmetro de busca
    requisicaoApiOpenWeather(cidadeAleatoria)
    ocultarInformacoes() // Oculta as informações enquanto o loading está ativo
}
// sempre que a página for carrega vai chamar a função que busca os dados de uma cidade aletoria, baseadas no array de cidades disponiveis
document.addEventListener('DOMContentLoaded', buscarCidadeAleatoria(cidades))

/*
NNNNNNNN        NNNNNNNNRRRRRRRRRRRRRRRRR   
N:::::::N       N::::::NR::::::::::::::::R  
N::::::::N      N::::::NR::::::RRRRRR:::::R 
N:::::::::N     N::::::NRR:::::R     R:::::R
N::::::::::N    N::::::N  R::::R     R:::::R
N:::::::::::N   N::::::N  R::::R     R:::::R
N:::::::N::::N  N::::::N  R::::RRRRRR:::::R 
N::::::N N::::N N::::::N  R:::::::::::::RR  
N::::::N  N::::N:::::::N  R::::RRRRRR:::::R 
N::::::N   N:::::::::::N  R::::R     R:::::R
N::::::N    N::::::::::N  R::::R     R:::::R
N::::::N     N:::::::::N  R::::R     R:::::R
N::::::N      N::::::::NRR:::::R     R:::::R
N::::::N       N:::::::NR::::::R     R:::::R
N::::::N        N::::::NR::::::R     R:::::R
NNNNNNNN         NNNNNNNRRRRRRRR     RRRRRRR
*/


