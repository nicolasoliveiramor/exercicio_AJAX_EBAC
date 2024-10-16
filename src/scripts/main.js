document.addEventListener('DOMContentLoaded', function () {

    const userNameId = document.getElementById('input-usuario')
    const buscaUser = document.getElementById('busca-usuario')

    // Capturando id para o desktop.
    const userAvatar = document.getElementById('profile-avatar')
    const userProfileName = document.getElementById('profile-name')
    const profileUserName = document.getElementById('profile-username')
    const userRepositories = document.getElementById('user-repositories')
    const userFollowing = document.getElementById('user-following')
    const userFollowers = document.getElementById('user-followers')
    const userProfile = document.getElementById('profile-link')

    // Capturando id para o mobile.
    const userFollowingMobile = document.getElementById('user-following-mobile')
    const userFollowersMobile = document.getElementById('user-followers-mobile')
    const userRepositoriesMobile = document.getElementById('user-repositories-mobile')

    const userReadMe = document.getElementById('profile-readme')

    async function buscaUsuario(username) {
        try {
            const resposta = await fetch(`https://api.github.com/users/${username}`)
            const json = await resposta.json()

            if (!resposta.ok) {
                throw new Error(json.message || 'Erro ao buscar usuário')
            }

            // Atualizando os elementos do DOM com os dados recebidos
            if (userAvatar) userAvatar.src = json.avatar_url || 'https://via.placeholder.com/70x70';
            if (userProfileName) userProfileName.innerText = json.name || 'Usuario não encontrado';
            if (profileUserName) profileUserName.innerText = json.login || 'Username não encontrado';
            if (userReadMe) userReadMe.innerText = json.bio || 'Ocorreu um erro, bio não encontrada';
            if (userRepositories) userRepositories.innerText = json.public_repos || '0';
            if (userFollowing) userFollowing.innerText = json.following || '0';
            if (userFollowers) userFollowers.innerText = json.followers || '0';
            if (userProfile) userProfile.href = json.html_url || '#';

            // Atualizando os elementos do DOM com os dados recebidos para o mobile.
            if (userRepositoriesMobile) userRepositoriesMobile.innerText = json.public_repos || '0';
            if (userFollowingMobile) userFollowingMobile.innerText = json.following || '0';
            if (userFollowersMobile) userFollowersMobile.innerText = json.followers || '0';

        } catch (error) {

            // Tratamento de erros fora do fetch
            console.log('Erro: ', error)
            alert(`Ocorreu um erro: ${error.message}`)
        }
    }

    buscaUser.addEventListener('click', function () {
        const username = userNameId.value.trim()
        if (username) {
            buscaUsuario(username)
        } else {
            alert('Por favor digite um nome de usuario valido')
        }
    })
})
