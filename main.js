document.addEventListener('DOMContentLoaded', function(){
    
    const userAvatar = document.getElementById('profile-avatar')
    const userProfileName = document.getElementById('profile-name')
    const profileUserName = document.getElementById('profile-username')
    const userRepositories = document.getElementById('user-repositories')
    const userFollowing = document.getElementById('user-following')
    const userFollowers = document.getElementById('user-followers')
    const userProfile = document.getElementById('profile-link')
    
    const endpoint = `https://api.github.com/users/nicolasoliveiramor`

    fetch(endpoint)

    .then(function(resposta) {
            
        // Tratando exceção de requisição da API

            if (!resposta.ok) {
                throw new Error (`Erro: ${resposta.status} - erro de requisição`)
            } else {
                return resposta.json()
            }
        })
        .then(function(json){

            // Atualizando os elementos do DOM com os dados recebidos do JSON

                userAvatar.src = json.avatar_url
                userProfileName.innerText = json.name
                profileUserName.innerText = json.login
                userRepositories.innerText = json.public_repos
                userFollowing.innerText = json.following
                userFollowers.innerText = json.followers
                userProfile.href = json.html_url
        })
        .catch(function(error){

            // Exibe uma mensagem de erro na tela em caso de falha na requisição

                alert(error.message)
        })
        .finally(function() {
            console.log('Requisição finalizada com sucesso')
        })
})
