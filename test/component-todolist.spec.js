// test/component-todo.spec.js
var Vue = require('vue')
var ComponentA = require('../components/todoList.vue')

describe('todoList.vue', function () {

  // asserting JavaScript options
  it('should have correct title', function () {
    expect(ComponentA.data().title).toBe('This is a todo list')
  })

  // asserting rendered result by actually rendering the component
  // it('should render correct message', function () {
  //   var vm = new Vue({
  //     template: '<div><test></test></div>',
  //     components: {
  //       'test': ComponentA
  //     }
  //   }).$mount()
  //   expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from Component A!')
  // })
})