// CAMPOS

const campoCep = document.getElementById("cep")
const campoCidade = document.getElementById("cidade")
const campoAno = document.getElementById("ano")
const campoTelefone = document.getElementById("telefone")
const formulario = document.getElementById("formContato")


// EVENTOS

campoCep.addEventListener("input", formatarCep)
campoCep.addEventListener("blur", buscarCep)

campoAno.addEventListener("input", formatarAno)

campoTelefone.addEventListener("input", formatarTelefone)

formulario.addEventListener("submit", enviarFormulario)



// FORMATA CEP

function formatarCep() {

    let valor = campoCep.value.replace(/\D/g, "")

    valor = valor.substring(0, 8)

    if (valor.length > 5) {

        valor = valor.replace(/(\d{5})(\d+)/, "$1-$2")

    }

    campoCep.value = valor

}



// CONSULTA CEP

async function buscarCep() {

    const cep = campoCep.value.replace(/\D/g, "")


    if (cep.length !== 8) {

        campoCidade.value = ""

        return

    }


    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        const dados = await resposta.json()


        if (dados.erro) {

            campoCidade.value = "CEP não encontrado"

            return

        }


        campoCidade.value = `${dados.localidade} - ${dados.uf}`


    } catch {

        campoCidade.value = "Erro ao consultar"

    }

}



// FORMATA ANO

function formatarAno() {

    campoAno.value = campoAno.value
        .replace(/\D/g, "")
        .substring(0, 4)

}



// FORMATA TELEFONE

function formatarTelefone() {

    let valor = campoTelefone.value.replace(/\D/g, "")

    valor = valor.substring(0, 11)


    if (valor.length > 10) {

        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        )


    } else if (valor.length > 6) {

        valor = valor.replace(
            /^(\d{2})(\d{4})(\d+)/,
            "($1) $2-$3"
        )


    } else if (valor.length > 2) {

        valor = valor.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        )


    } else if (valor.length > 0) {

        valor = valor.replace(
            /^(\d+)/,
            "($1"
        )

    }


    campoTelefone.value = valor

}



// ENVIO DO FORMULÁRIO

function enviarFormulario(event) {

    event.preventDefault()


    const botao = formulario.querySelector("button")


    botao.disabled = true

    botao.innerHTML = "Enviando..."



    setTimeout(() => {


        botao.innerHTML = "✓ Mensagem enviada!"

        botao.classList.add("btn-enviado")



        const toast = document.getElementById("toast")

        toast.classList.add("show")



        setTimeout(() => {

            toast.classList.remove("show")

        }, 3500)



        formulario.reset()

        campoCidade.value = ""



        botao.disabled = false

        botao.innerHTML = "Enviar Mensagem"

        botao.classList.remove("btn-enviado")


    }, 1200)

}