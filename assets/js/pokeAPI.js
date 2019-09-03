class PokemonApi {

    initialCall() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/',
            type: 'GET',
            success: (data) => {
                console.log('initial call:', data)
            },
            error: (error) => {
                console.error('failed to get', error)
            }
        });
    }
}