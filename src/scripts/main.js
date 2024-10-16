// Evento para carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {

    // Elementos do formulário de busca de usuário
    const userNameId = document.getElementById('input-usuario')
    const buscaUser = document.getElementById('busca-usuario')

    // Elementos do perfil para o desktop
    const userAvatar = document.getElementById('profile-avatar')
    const userProfileName = document.getElementById('profile-name')
    const profileUserName = document.getElementById('profile-username')
    const userRepositories = document.getElementById('user-repositories')
    const userFollowing = document.getElementById('user-following')
    const userFollowers = document.getElementById('user-followers')
    const userProfile = document.getElementById('profile-link')

    // Elementos do perfil para o mobile
    const userFollowingMobile = document.getElementById('user-following-mobile')
    const userFollowersMobile = document.getElementById('user-followers-mobile')
    const userRepositoriesMobile = document.getElementById('user-repositories-mobile')

    const userReadMe = document.getElementById('profile-readme')

    // Função async para requisitar dados do usuário na API do GitHub
    async function buscaUsuario(username) {
        // Try/Catch para captura de erros da requisição à API
        try {
            const resposta = await fetch(`https://api.github.com/users/${username}`)
            const json = await resposta.json()

            // Condicional para tratar falha na busca de usuário
            if (!resposta.ok) {
                throw new Error(json.message || 'Erro ao buscar usuário')
            }

            // Atualizando os elementos do DOM com os dados recebidos
            if (userAvatar) userAvatar.src = json.avatar_url || 'https://via.placeholder.com/70x70'
            if (userProfileName) userProfileName.innerText = json.name || 'Usuario não encontrado'
            if (profileUserName) profileUserName.innerText = json.login || 'Username não encontrado'
            if (userReadMe) userReadMe.innerText = json.bio || 'Ocorreu um erro, bio não encontrada'
            if (userRepositories) userRepositories.innerText = json.public_repos || '0'
            if (userFollowing) userFollowing.innerText = json.following || '0'
            if (userFollowers) userFollowers.innerText = json.followers || '0'
            if (userProfile) userProfile.href = json.html_url || '#'

            // Atualizando os elementos do DOM com os dados recebidos para o mobile.
            if (userRepositoriesMobile) userRepositoriesMobile.innerText = json.public_repos || '0'
            if (userFollowingMobile) userFollowingMobile.innerText = json.following || '0'
            if (userFollowersMobile) userFollowersMobile.innerText = json.followers || '0'

        } catch (error) {

            // Tratamento de erros fora do fetch
            console.log('Erro: ', error)
            alert(`Ocorreu um erro: ${error.message}`)
        }
    }

    // Evento de 'click' para iniciar a busca do usuário
    buscaUser.addEventListener('click', function () {
        const username = userNameId.value.trim()
        if (username) {
            buscaUsuario(username)
        } else {
            alert('Por favor digite um nome de usuario valido')
        }
    })
})
