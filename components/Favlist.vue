<template>
<div class="message">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '123'
    }
  },
  methods:{
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
.message {
  color: red;
}
</style>