document.addEventListener('DOMContentLoaded', function(){
    
    const userNameId = document.getElementById('input-usuario')
    const buscaUser = document.getElementById('busca-usuario')

    const userAvatar = document.getElementById('profile-avatar')
    const userProfileName = document.getElementById('profile-name')
    const profileUserName = document.getElementById('profile-username')
    const userRepositories = document.getElementById('user-repositories')
    const userFollowing = document.getElementById('user-following')
    const userFollowers = document.getElementById('user-followers')
    const userProfile = document.getElementById('profile-link')
    
    const userReadMe = document.getElementById('profile-readme')

    function buscaUsuario (username) {
        try {
            fetch(`https://api.github.com/users/${username}`)
            .then(function(resposta) {
                return resposta.json()
            })
            .then(function(json){
                    // Atualizando os elementos do DOM com os dados recebidos do JSON
        
                        userAvatar.src = json.avatar_url || 'https://via.placeholder.com/70x70'
                        userProfileName.innerText = json.name || 'Usuario não encontrado'
                        profileUserName.innerText = json.login || 'Username não encontrado'
                        userReadMe.innerText = json.bio || 'Ocorreu um erro, bio não encontrada'
                        userRepositories.innerText = json.public_repos || '0'
                        userFollowing.innerText = json.following || '0'
                        userFollowers.innerText = json.followers || '0'
                        userProfile.href = json.html_url || '#'
                })
                .catch(function(error){        
                    // Exibe uma mensagem de erro na tela em caso de falha no fetch
        
                    console.log('Erro de requisição: ', error)
                    alert(`Ocorreu um erro. Usuario: ${userNameId} não encontrado.`)
                })
            } catch(error) {
                // Tratamento de erros fora do fetch
                console.log('Erro inesperado: ', error)
                alert(`Ocorreu um erro. Tente novamente mais tarde.`)
        }
    }

    buscaUser.addEventListener('click', function() {
        const username = userNameId.value.trim()
        if (username) {
            buscaUsuario(username)
        } else {
            alert('Por favor digite um nome de usuario valido')
        }
    })
})
