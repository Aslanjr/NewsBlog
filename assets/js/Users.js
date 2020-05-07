new Vue({
    el:'#app',
    data:()=>{
        return{
            Users:[],
        }
    },
    mounted() {
        fetch('https://shielded-savannah-17659.herokuapp.com/Api/Users')
            .then(response => response.json(),)
            .then(users => this.Users = users);
    },
})