export default {
 permission:{
   "ROLE_ADMIN":{
     user:"CRUD",
     task:"CRUD",
     story:"CRUD"
   },
   "ROLE_DEVELOPMENT":{
     story:"CRUD",
     task:"CRUD",
     user:['R1','US']
   },

   "ROLE_USER":{
     story: 'R',
     task: 'R',
     user:['R1','US']
   },
   "default":{
     story: [],
     task: [],
     user:[]
   }
 },
}