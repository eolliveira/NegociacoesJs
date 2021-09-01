class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');
    }

    importarNegociacoes() {

        let service = new NegociacoesService();

        service.importaNegociacoesDaSemana()
            .then((negociacoes) => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociações da semana obtidas com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);


        service.importaNegociacoesDaSemanaAnterior()
            .then((negociacoes) => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociações da semana Anterior obtidas com sucesso"
            })
            .catch(erro => this._mensagem.texto = erro);


        service.importaNegociacoesDaSemanaRetrasada()
            .then((negociacoes) => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociações da semana Retrasada obtidas com sucesso"
            })
            .catch(erro => this._mensagem.texto = erro);


        /*
        service.importaNegociacoesDaSemana((erro, negociacoes) => {
            if (erro) {
                console.log(erro);
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            service.importaNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                if (erro) {
                    console.log(erro);
                    return;
                }

                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                service.importaNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                    if (erro) {
                        console.log(erro);
                        return;
                    }

                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociacoes importadas com sucesso';
                });
            });
        });
        */
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}