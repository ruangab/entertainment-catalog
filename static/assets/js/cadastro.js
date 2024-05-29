var base_url = "http://127.0.0.1:19980"

$(document).ready(function() {
    $("#CadastroForm").submit(function(event) {
        event.preventDefault(); // Evita que o formulário seja submetido normalmente

        var formData = $(this).serialize(); // Obtém os dados do formulário como uma string codificada

        let senha = $("#senha_usuario").val();
        let senha_repetida = $("#senha_usuario_repeat").val();
        let usuario = $("#usuario").val();

        if (senha == "" || senha == "" || usuario == ""){
            $("#senha_repeat").text("Insira todos os campos corretamente");
            $("#senha_repeat").show();
        }
        else{
            if (senha != senha_repetida){
                $("#senha_repeat").text("Senhas não coicidem");
                $("#senha_repeat").show();
            }
            else{
                $("#senha_repeat").hide();
                // Envia uma requisição AJAX POST para a rota de login
                $.ajax({
                    url: base_url + "/usuario/cadastro",
                    method: "POST",
                    data: formData,
                    success: function(response) {
                        let span = document.getElementsByClassName("close")[0];
                        
                        if (response.status == "sucesso") {
                            window.location.href = base_url + `/mensagem?h1=Bem vindo&h2=usuário logado`;
                        }
                        else{
                            $("#cadastro-titulo-modal").text(response.status);
                            $("#cadastro-result").text(response.mensagem);
                            $("#myModal").show();
    
                            // Quando o usuário clica no botão de fechar, esconde a modal
                            span.onclick = function() {
                                $("#myModal").removeAttr("style").hide();
                            }
                        }
    
                        // Se o login for bem-sucedido, redirecione o usuário para a página principal
                        console.log(response);
                    },
                    error: function(xhr, status, error) {
                        // Se o login falhar, exiba uma mensagem de erro para o usuário
                        alert("Usuário ou senha incorretos. Por favor, tente novamente.");
                    }
                });
            }
        }
       

        
    });
});