const hero = {
    props: ['hero'],
    template: `
<figure class="heroes-item">
    <img :src="hero.characterPhoto" alt="hero">
    <figcaption class="item-info">
        <h3>{{ hero.name }}</h3>
        <button class="hero-add" type="button" 
            @click="$root.toggleFavorites(hero)"
            :class="{ favorite: hero.favorite}">
            <i class="fas fa-heart"></i>
        </button>  
    </figcaption>
</figure>`
}

const heroes = {
    components: { hero },
    props: ['heroes'],
    template: `
    <div class="heroes-list">
        <hero 
            v-for="hero of heroes" 
            :key="hero.id"
            :hero="hero">
        </hero>
    </div>`
}