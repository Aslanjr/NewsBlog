new Vue({
	el:'#app',
	data(){
		return{
			user:{
				Email:'',
				Password:'',
			},
			token:''
		}
	},
	methods:{
		post(){
			axios
				.post('/Auth/Login',{
					Email:this.user.Email,
					Password:this.user.Password
				})
				.then(res => this.token = res.data )
   			 .catch(error => alert(error,'error'));

		}
	}
})