document.addEventListener('DOMContentLoaded', function() {
    // Elementos de entrada e botão de busca
    const usernameInput = document.getElementById('usernameInput');
    const searchButton = document.getElementById('searchButton');
    
    // Elementos do perfil
    const nameElemento = document.getElementById('name');
    const userNameElemeto = document.getElementById('username');
    const avatarElemento = document.getElementById('avatar');
    const repositorio = document.getElementById('repo-count');
    const seguidores = document.getElementById('followers-count');
    const seguindo = document.getElementById('following-count');
    const userLink = document.getElementById('userlink');

    // Função para buscar dados do usuário no GitHub
    function buscarUsuarioGitHub(username) {
        // Bloco try/catch para capturar e tratar erros
        try {
            fetch(`https://api.github.com/users/${username}`)
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(json) {
                // Atualizar os elementos com os dados do usuário
                nameElemento.innerText = json.name || 'Nome não disponível';
                userNameElemeto.innerText = json.login || 'Usuário não disponível';
                avatarElemento.src = json.avatar_url || 'https://via.placeholder.com/180x180';
                seguidores.innerText = json.followers || 0;
                seguindo.innerText = json.following || 0;
                repositorio.innerText = json.public_repos || 0;
                userLink.href = json.html_url || '#';
            })
            .catch(function(error) {
                // Tratamento de erros durante o fetch
                console.error('Erro ao buscar dados do usuário do GitHub:', error);
                alert('Usuário não encontrado. Por favor, tente novamente.');
            });
        } catch (error) {
            // Tratamento de erros que ocorrem fora do fetch
            console.error('Erro inesperado:', error);
            alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
        }
    }

    // Adicionar evento ao botão de busca
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
            buscarUsuarioGitHub(username);
        } else {
            alert('Por favor, digite um nome de usuário.');
        }
    });
});
