<template>
<div class="containter">
	<h1>{{title}}</h1>
	<div class="todolist">
		<label class="label">Name</label><input v-model="newListName" class="noteInput" placeholder="What would you like to do today?"lazy></input>
		<label class="label">Note</label><input v-model="newListNote" class="noteInput" placeholder="What would you like to write down today?"lazy></input>
		<label class="label">Tags</label><input v-model="newListTag" class="noteInput" placeholder="Tag is separated by ,"lazy></input>		
		<div v-on:click="addNew" class="button blue">add new</div>
		<div v-on:click="getAll" class="button blue">get all todos</div>	
		<ul>
		<li v-for="item in items" v-on:click="toggle(item)">
			<div><span class="label" v-bind:class="{finished: item.completed}">Name: </span><input class="noteInput" v-bind:class="{finished: item.completed}" v-model="item.name"></div>
			<div><span class="label">Notes:</span><input class="noteInput" v-model="item.note"></div>
			<div><span class="label">Tags:</span><input class="noteInput" v-model="item.tags">
			</div>
			<div><span class="label">Last Modified:</span>{{item.updated_at.split('.')[0].replace('T', ' ')}}</div>
			<div>Complete: <input type="checkbox" v-model="item.completed" v-on:change="updateItem(item)"/></div>
			<div v-on:click="updateItem(item)" class="button green center">update</div>
			<div v-on:click="deleteItem(item)" class="button orange center">delete</div>
		</li>
		</ul>	
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			title: 'This is a todo list',
			items:'',
			newListName:"",
			newListNote:"",
			newListTag:""
		}
	},
	props:['oriTagList'],
	mounted:function(){
		this.getAll();
	},
	methods:{
		toggle(item){
			item.completed = !item.completed;			
		},
		getAll(){
  			this.$http.get('http://localhost:8888/list').then((response) => {
			// success callback
			this.items= response.body;
			//emit message to father elem
			var arr=[];
			this.items.forEach(function(a){
				arr=arr.concat(a.tags);
			});
			var uniqueArr = arr.filter(function(item, pos) {
			    return arr.indexOf(item) == pos;
			})
			this.$emit("update-from-todo", uniqueArr);			  
			}, (response) => {
			  // error callback
			});
		},    
		addNew(){
			var obj = {
				'name':this.newListName,
				'completed':false,
				'note':this.newListNote? this.newListNote: "Default",
				'tags':this.newListTag? this.newListTag.split(","): "Null",
				'updated_at':Date.now()
			}
			this.newListNote="";
			this.newListName="";
			this.newListTag="";
			this.$http.post('http://localhost:8888/list',JSON.stringify(obj)).then((response) => {
				// success callback
				this.items= response.body;
				}, (response) => {
				  // error callback
			});
		},
		updateItem(item){
			if(typeof item.tags != "string"){
				item.tags = item.tags.join(',');
			}
			var obj = {
				'name':item.name,
				'completed':item.completed,
				'note':item.note,
				'tags':item.tags? item.tags.split(",") :"Null",
				'updated_at':Date.now()
			}

			this.$http.post('http://localhost:8888/list/'+item._id,JSON.stringify(obj)).then((response) => {
				// success callback
				this.items= response.body;
				//emit message to father elem
				var arr=[];
				this.items.forEach(function(a){
					arr=arr.concat(a.tags);
				});
				var uniqueArr = arr.filter(function(item, pos) {
				    return arr.indexOf(item) == pos;
				})
				this.$emit("update-from-todo", uniqueArr);					
				}, (response) => {
				  // error callback
			});	
		},
		deleteItem(item){
			this.$http.delete('http://localhost:8888/list/'+item._id).then((response) => {
				// success callback
				this.items= response.body;
				}, (response) => {
				  // error callback
			});
		}
	}
}
</script>

<style lang="sass">
*{
    padding:0;
    margin:0;
}
body{
	background-color:#2a2a2a;
}
.containter{
    background-color: #111216;
    color:#999999;
    width:650px;
    margin: 20px auto auto auto;
    padding-bottom:12px;
}
.todolist{
	margin: 20px 40px; 
	position: relative; 
	display:block;
	font-size:18px;
  	font-weight:600;
}

.label{
	display:inline-block;
	width:17%;
}
.button{
	display:inline-block;
	text-align: center;
	margin:15px 5px 10px 0px;
	//border-radius:3px;
	padding:10px 20px;
	color: #fff;
	&:hover{
		cursor:pointer;
	}
}

.green{
	background-color: #55C175;
	&:hover{
		opacity:.8;
		background-color:darken(#55C175, 20%);
	}
}
.orange{
	background-color:#D96F5F;
	&:hover{
		opacity:.8;
		background-color:darken(#D96F5F, 20%);
	}	
}
.blue{
	background-color:#5785C7;
	&:hover{
		opacity:.8;
		background-color:darken(#5785C7, 20%);
	}	
}

.center{
	text-align:center;
}
.noteInput {
	width:80%;
  	font-size:14px;
  	font-family:'Open Sans', sans-serif;
  	height:36px;
  	display:inline-block;
  	border-radius:100px;
  	padding-left:15px; //for input cursor
  	background-color:#202023;
  	border:0;
  	color:#fff;
  	margin:10px 0px;
  	-webkit-transition: all 0.30s ease-in-out;
  	-moz-transition: all 0.30s ease-in-out;
  	-ms-transition: all 0.30s ease-in-out;
  	-o-transition: all 0.30s ease-in-out;
}
.noteInput:focus{
  	box-shadow: 0px 0px 1pt 1pt #999999;
 	background-color:#111216; 
  	outline:none;
}
::-webkit-input-placeholder {
    color: #666666;
    font-style:italic;
    /* padding-left:10px; */
}
:-moz-placeholder {
    /* Firefox 18- */
    color: #666666;
    font-style:italic;
}
::-moz-placeholder {
    /* Firefox 19+ */
    color: #666666;
    font-style:italic;
}
:-ms-input-placeholder {
    color: #666666;
    font-style:italic;
}

h1 { 
	font-size: 48px;
	text-align: center; 
	padding:10px 0px;
	color: #fff; 
	background-color:#D96F5F;
	-webkit-text-rendering: optimizeLegibility; 
	-moz-text-rendering: optimizeLegibility; 
	text-rendering: optimizeLegibility;
}

ul {
	list-style:none;
	margin: 0px -40px; //with todolist margin
  li{
  	display:block;
  	padding:20px 40px;
  	margin:10px 0px;
  	background-color:#17181D;
  }
}

.finished{
	text-decoration: line-through;

}
</style>