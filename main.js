const app = {
    data() {
        return {
            API: "https://swapi.dev/api/people/?format=json",
            heroes: [],
            favoritesHeroes: [],
            pagination: {
                currentPage: 1,
                nextPages: true,
                previousPages: false
            }
        }
    },
    components: {
        'heroes': heroes,
        'favorites-heroes': favoritesHeroes,
        'search': search,
        'sorter': sorter,
        'pagination': pagination
    },
    methods: {
        getJson(API) {
            return fetch(API)
                .then(result => result.json()).catch(error => {
                    console.log(error);
                    return [];
                })
        },
        toggleFavorites(item) {
            let findItem = this.heroes.find(el => el.id === item.id);
            if (this.favoritesHeroes.find(el => el.id === item.id)) {
                if (findItem) {
                    findItem.favorite = false;
                }
                this.favoritesHeroes = this.favoritesHeroes.filter(el => el.id !== item.id)
            } else {
                findItem.favorite = true;
                this.favoritesHeroes.push(item)
            }
            localStorage.setItem('favoritesHeroes', JSON.stringify(this.favoritesHeroes))
        },
        getHeroes(items) {
            for (let item of items) {
                item.id = this.getIdFromUrl(item.url);
                item.characterPhoto = 'https://starwars-visualguide.com/assets/img/characters/' + item.id + '.jpg';
                item.favorite = this.favoritesHeroes.find(el => el.id === item.id);
                this.getJson(item.homeworld).then(data => {
                    item.homeworld = data.name;
                });
                this.heroes.push(item);
            }
        },
        getIdFromUrl(value) {
            let id = value.match(/([0-9])+/g);
            id = id[0];
            return id;
        },
        getfavoritesHeroes() {
            if (JSON.parse(localStorage.getItem('favoritesHeroes'))) {
                this.favoritesHeroes = JSON.parse(localStorage.getItem('favoritesHeroes'));
            }
        },
        clearFavorites() {
            localStorage.clear();
            this.favoritesHeroes.length = 0;
        },
        setPage(p) {
            this.heroes.length = 0;
            this.getJson('https://swapi.dev/api/people/?page=' + p + '&format=json')
                .then(data => {
                    this.paginator(data, p)
                    this.getHeroes(data.results);
                });
        },
        paginator(data, currentPage) {
            if (data.next && data.previous) {
                this.pagination.nextPages = true;
                this.pagination.previousPages = true;
            } else if (data.next) {
                this.pagination.nextPages = true;
                this.pagination.previousPages = false;
            } else {
                this.pagination.nextPages = false;
                this.pagination.previousPages = true;
            }
            this.pagination.currentPage = currentPage;
        }
    },
    computed: {
        collection() {
            return this.paginate(this.heroes);
        }
    },
    mounted() {
        this.getJson(this.API)
            .then(data => {
                this.getHeroes(data.results);
                console.log(this.heroes);
            });
        this.getfavoritesHeroes();
    }
}

Vue.createApp(app).mount('#app');