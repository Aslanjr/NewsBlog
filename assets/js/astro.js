new Vue({
    el:'#app',
    data:()=>{
        return{
            Allnews:[],
        }
    },
    mounted() {
        fetch('https://shielded-savannah-17659.herokuapp.com/Api/Astro')
            .then(response => response.json(),)
            .then(news => this.Allnews = news);
    },
})