document.addEventListener('DOMContentLoaded', function(){
    
        // localizando id's
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
            if (!resposta.ok) {
                throw new Error (`Erro: ${resposta.status} - erro de requisição`)
            } else {
                return resposta.json()
            }
        })
        .then(function(json){
            userAvatar.src = json.avatar_url
            userProfileName.innerText = json.login
            profileUserName.innerText = json.name
            userRepositories.innerText = json.public_repos
            userFollowing.innerText = json.following
            userFollowers.innerText = json.followers
            userProfile.href = json.html_url
        })
        .catch(function(error){
            alert(error.message)
        })
        .finally(function() {
            console.log('Requisição finalizada com sucesso')
        })
})
