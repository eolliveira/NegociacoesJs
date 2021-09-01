class NegociacoesService {

    importaNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/semana');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possivel importar as Negociacoes da Semana');
                    }
                }
            };

            xhr.send();

        });
    }

    importaNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possivel importar as Negociacoes da Semana Anterior');
                    }
                }
            };

            xhr.send();
        });
    }

    importaNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'negociacoes/retrasada');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)
                            .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possivel importar as Negociacoes da Semana Retrasada');
                    }
                }
            };

            xhr.send();
        });
    }
}