//postfix: S: self,1:one
export default {
 permissions:{
   "ROLE_ADMIN":{
     user:"CRUD",
     task:"CRUD",
     story:"CRUD"
   },
   "ROLE_DEVELOPER":{
     story:"CRUD",
     task:"CRUD",
     user:['R','US']
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