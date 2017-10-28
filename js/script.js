$(document).ready(function () {
    $('#busca-cep').submit(function () {
        // Verifica se o CEP inserido possui 8 dígitos para que a busca seja feita
        if ($('#cep').val().length === 8) {
            $.ajax({
                url: 'https://viacep.com.br/ws/' + $('#cep').val() + '/json/',
                dataType: 'json',
                success: function (d) {
                    if (d) {
                        var cardBusca = $('#card-busca');
                        var cardResult = $('#card-resultado');

                        cardBusca.removeClass('offset-m3');
                        cardResult.fadeIn();
                        cardBusca.scrollTop(330);

                        // Adiciona as informações de forma organizada
                        complemento = (d.complemento !== "") ? ' - ' + d.complemento : '';
                        $('#card-resultado p').
                                html('<strong>Endereço:</strong> ' + d.logradouro + complemento + '<br />' +
                                        '<strong>Bairro:</strong> ' + d.bairro + '<br />' +
                                        '<strong>Cidade:</strong> ' + d.localidade + ' - ' + d.uf + '<br />' +
                                        '<strong>CEP:</strong> ' + d.cep);

                        // Chave da API do Google Maps
                        var APIKey = 'AIzaSyBxp983W4Ppj3r0d6JPBDNkZa2XmHVAeHc';
                        
                        // Incorpora o mapa do Google Maps
                        $('#card-resultado p').append('<iframe width="100%" height="400" frameborder="0" style="border:0" ' +
                                'src="https://www.google.com/maps/embed/v1/search?key=' + APIKey + '&q=' + d.logradouro + ' ' + d.bairro + ' ' + d.localidade + ' ' + d.uf + '" allowfullscreen></iframe>');
                    }
                }
            });
        } else {
            // Caso a busca não dê nenhum retorno ou seja inválida, é exibido este aviso
            Materialize.toast('Insira um CEP válido', 4000, '', function () {
                $('#cep').focus();
            });
        }
        // Ao dar submit no formulário, um return false evita que ela recarregue
        return false;
    });
});