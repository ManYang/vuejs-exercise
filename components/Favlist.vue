<template>
<div class="todolist">
	<h1>{{title}}</h1>
	<input v-model="newList" v-on:keyup.enter="addNew"></input>
	<ul>
		<li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggle(item)">{{item.label}}</li>
	</ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'This is a todo list',
      items:[
      	{
      		label:'coding',
      		isFinished: false
      	},
       	{
      		label:'sleeping',
      		isFinished: true
      	}     	
      ],
      newList:""
    }
  },
  methods:{
  	toggle:function(item){
  		item.isFinished = !item.isFinished;
  	},
  	addNew:function(){
  		this.items.push({
  			label:this.newList,
  			isFinished:false
  		})
  		this.newList="";
  	},
  	 greeting(){
  	 	var xhr = new XMLHttpRequest();
  	 	this.msg=456;
    	xhr.open('GET', 'http://localhost:8888/user', false);
    	xhr.setRequestHeader("Content-Type", "text/plain");
    	xhr.onreadystatechange = function () {
    	    if (xhr.readyState == 4) {
    	        if (xhr.status == 200) {
    	            this.msg = xhr.responseText;
    	        }
    	    }
    	};
    	xhr.send(null);
  	}
  }
}
</script>

<style>
.finished{
	text-decoration: line-through;
}
</style>