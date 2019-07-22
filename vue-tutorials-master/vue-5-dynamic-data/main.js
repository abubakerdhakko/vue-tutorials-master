const app = new Vue({
    el: "#app",
    data: {
      editFriend: null,
      friends: [],
        addFriend: false,
    },
    methods: {
        deleteFriend(id, i) {
            fetch("http://dummy.restapiexample.com/api/v1/employees" + id, {
                method: "DELETE"
            })
                .then(() => {
                    this.friends.splice(i, 1)
                    console.log('deleted')
                })
        },
        updateFriend(friend) {
            fetch("http://dummy.restapiexample.com/api/v1/employees" + friend.id, {
               body: JSON.stringify(friend),
                method: "PUT",
                headers: {
                   "content/type": "applicstion/json",
                },
            })
                .then(() => {
                    this.editFriend = null;
                    console.log('data updated')
                })
        },
        insertFriend(friend) {
            fetch("http://dummy.restapiexample.com/api/v1/employees" + friend, {
                body: JSON.stringify(friend),
                method: "POST",
                headers: {
                    "content/type": "applicstion/json",
                },
            })
                .then(() => {
                    // this.editFriend = null;
                     alert('data added')
                    console.log('data updated')
                    addFriend = false
                })
        }
    },
    mounted() {
        fetch('http://dummy.restapiexample.com/api/v1/employees')
        .then(response => response.json())
        .then((data) => {
        this.friends = data;
        })
    },

    template: `
    <div>
      <li v-for="friend, i in friends" >
      <div v-if="editFriend === friend.id ">
       <input v-model="friend.employee_name" v-on:keyup.13="updatefriens"/>
        <button v-on:click="updateFriend(friend.id, i)">save</button>
       </div>
       <div v-else>
       <button v-on:click="addFriend = true">add</button>
       <button v-on:click="editFriend = friend.id">editFriend</button>
      <button v-on:click="deleteFriend(friend.id, i)">x</button>{{friend.employee_name}}       
       </div>
       <!--add data-->
       <div v-if="addFriend === true">
       <input v-model="friend.employee_name" v-on:keyup.13="updatefriens"/>
        <button v-on:click="insertFriend(friend)">add/save</button>
       </div>
       <!--<div v-else>-->
       <!--<button v-on:click="addFriend === true">add</button>-->
      <!--<button v-on:click="deleteFriend(friend.id, i)">x</button>{{friend.employee_name}}       -->
       <!--</div>-->
    </li>
    </div>
    `,
});
