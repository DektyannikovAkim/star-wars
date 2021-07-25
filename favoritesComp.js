const favoriteHero = {
    props: ['hero'],
    template: `
        <figure class="heroes-item">
            <img :src="hero.characterPhoto" alt="hero">
            <figcaption class="item-info">
            <div class="wrapper-for-hero-info">
            <h3>{{ hero.name }}</h3>
            <h3>Place of Birth:</h3>
            <h3>{{ hero.homeworld }}</h3>
            </div>
                <button class="hero-add" type="button" 
                @click="$root.toggleFavorites(hero)"
                :class="{ favorite: hero.favorite}">
                <i class="fas fa-heart"></i>
                </button>  
            </figcaption>
        </figure>
    `
}

const favoritesHeroes = {
    components: { favoriteHero },
    props: ['favoritesHeroes'],
    template: `
    <div class="heroes-list">
        <favoriteHero 
            v-for="hero of favoritesHeroes" 
            :key="hero.id"
            :hero="hero">
        </favoriteHero>
    </div>
    <div class="wrapper-for-favorite-info">
        <span class="no-heroes-in-favorites" v-show="!favoritesHeroes.length">
            You don't have any favorite heroes yet :(</span>
        <button v-show="favoritesHeroes.length"
            class="clear"
            @click="$root.clearFavorites()">
            Clear favotites
        </button>
    </div>
`
}