
const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const price = document.querySelector('#price')


cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'buscando'
    price.innerText = ''
    event.preventDefault();
    const ativo = document.querySelector('input').value

    if(!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado';
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {

            if(data.error) {
                mainMessage.innerText = `Alguma coisa deu errado`
                price.innerHTML = `${data.error.message} | código ${data.error.code}`
            } else {
                mainMessage.innerText = data.symbol
                price.innerText = `PRICE: ${data.open}`
            }
            
        })
    })
})