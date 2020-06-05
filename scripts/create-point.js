function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( state => {
        
        for (state of state) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }       
    })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateImput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateImput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        } 
        
        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)