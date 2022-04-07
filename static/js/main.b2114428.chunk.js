(this.webpackJsonptodolistNW=this.webpackJsonptodolistNW||[]).push([[0],{130:function(t,e,n){},131:function(t,e,n){},158:function(t,e,n){"use strict";n.r(e);var a,i,c=n(0),r=n.n(c),s=n(33),o=n.n(s),l=(n(130),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,227)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,c=e.getLCP,r=e.getTTFB;n(t),a(t),i(t),c(t),r(t)}))}),d=(n(131),n(20)),u=n(14),j=n(16),b=n(102),O=n.n(b).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"ef43bd75-8438-40b6-8849-600e54b7eb04"}}),f=function(){return O.get("todo-lists")},h=function(t){return O.post("todo-lists",{title:t})},T=function(t){return O.delete("todo-lists/".concat(t))},p=function(t,e){return O.put("todo-lists/".concat(t),{title:e})},m=function(t){return O.get("todo-lists/".concat(t,"/tasks"))},g=function(t,e){return O.delete("todo-lists/".concat(t,"/tasks/").concat(e))},v=function(t,e){return O.post("todo-lists/".concat(t,"/tasks"),{title:e})},x=function(t,e,n){return O.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},S=function(t){return O.post("/auth/login",t)},k=function(){return O.delete("/auth/login")},I=function(){return O.get("/auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={}));var C=function(t,e){t.messages.length?e(w(t.messages[0])):e(w("Some error occurred")),e(L("failed"))},y=function(t,e){e(w(t.message)),e(L("failed"))},E={isLoggedIn:!1},A=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},D={status:"idle",error:null,isInitialized:!1},L=function(t){return{type:"APP/SET-STATUS",payload:{status:t}}},w=function(t){return{type:"APP/SET-ERROR",payload:{error:t}}},P=[],N=function(t){return{type:"SET-TODOLISTS",todolists:t}},F=n(5),R={},M=function(t,e,n){return{type:"SET-DISABLE-STATUS",taskId:t,todolistId:e,disabled:n}},U=function(t,e,n){return function(a,i){a(L("loading")),a(M(t,n,!0));var c=i().tasks[n].find((function(e){return e.id===t}));if(c){var r=Object(u.a)({deadline:c.deadline,description:c.description,priority:c.priority,startDate:c.startDate,title:c.title,status:c.status},e);x(n,t,r).then((function(i){var c=function(t,e,n){return{type:"UPDATE-TASK",model:e,todolistId:n,taskId:t}}(t,e,n);a(c),a(M(t,n,!1)),a(L("succeeded"))})).catch((function(t){y(t,a)}))}else console.warn("task not found in the state")}},G=n(13),K=n(207),H=n(214),z=n(204),B=n(1),V=r.a.memo((function(t){console.log("AddItemForm called");var e=Object(c.useState)(""),n=Object(G.a)(e,2),a=n[0],i=n[1],r=Object(c.useState)(null),s=Object(G.a)(r,2),o=s[0],l=s[1],d=function(){""!==a.trim()?(t.addItem(a),i("")):l("Title is required")};return Object(B.jsxs)("div",{children:[Object(B.jsx)(K.a,{variant:"outlined",error:!!o,value:a,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){null!==o&&l(null),13===t.charCode&&d()},label:"Title",helperText:o,disabled:t.disabled}),Object(B.jsx)(H.a,{color:"primary",onClick:d,disabled:t.disabled,children:Object(B.jsx)(z.a,{})})]})})),Z=r.a.memo((function(t){console.log("EditableSpan called");var e=Object(c.useState)(!1),n=Object(G.a)(e,2),a=n[0],i=n[1],r=Object(c.useState)(t.value),s=Object(G.a)(r,2),o=s[0],l=s[1];return a?Object(B.jsx)(K.a,{value:o,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,disabled:t.disabled,onBlur:function(){i(!1),t.onChange(o)}}):Object(B.jsx)("span",{onDoubleClick:function(){i(!0),l(t.value)},children:t.value})})),q=n(69),Y=n.n(q),J=n(209),W=r.a.memo((function(t){var e=t.task,n=t.todolistId,i=Object(c.useCallback)((function(){return t.removeTask(e.id,n)}),[e.id,n]),r=Object(c.useCallback)((function(i){var c=i.currentTarget.checked;t.changeTaskStatus(e.id,c?a.Completed:a.New,n)}),[e.id,n]),s=Object(c.useCallback)((function(a){t.changeTaskTitle(e.id,a,n)}),[e.id,n]);return Object(B.jsxs)("div",{className:t.task.status===a.Completed?"is-done":"",children:[Object(B.jsx)(J.a,{checked:t.task.status===a.Completed,color:"primary",onChange:r,disabled:t.task.disabled}),Object(B.jsx)(Z,{value:t.task.title,onChange:s,disabled:t.task.disabled}),Object(B.jsx)(H.a,{onClick:i,disabled:t.task.disabled,children:Object(B.jsx)(Y.a,{})})]},t.task.id)})),_=n(215),$=n(223),Q=r.a.memo((function(t){console.log("Todolist called");var e=Object(d.b)();Object(c.useEffect)((function(){var n,a=(n=t.id,function(t){t(L("loading")),m(n).then((function(e){var a=e.data.items;t(L("succeeded"));var i=function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(a,n);t(i)}))});e(a)}),[]);var n=Object(c.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),i=Object(c.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.id,t.changeTodolistTitle]),r=Object(c.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id,t.changeFilter]),s=Object(c.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id,t.changeFilter]),o=Object(c.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id,t.changeFilter]),l=t.tasks;return"active"===t.filter&&(l=t.tasks.filter((function(t){return t.status===a.New}))),"completed"===t.filter&&(l=t.tasks.filter((function(t){return t.status===a.Completed}))),Object(B.jsxs)("div",{children:[Object(B.jsxs)("h3",{children:[Object(B.jsx)(Z,{value:t.title,onChange:i,disabled:"loading"===t.entityStatus}),Object(B.jsx)(H.a,{onClick:function(){t.removeTodolist(t.id)},disabled:"loading"===t.entityStatus,children:Object(B.jsx)(Y.a,{color:"primary",sx:{fontSize:35}})})]}),Object(B.jsx)(V,{addItem:n,disabled:"loading"===t.entityStatus}),Object(B.jsx)("div",{children:l.map((function(e){return Object(B.jsx)(W,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)}))}),Object(B.jsx)("div",{style:{paddingTop:"10px"},children:Object(B.jsxs)($.a,{size:"small",variant:"contained",children:[Object(B.jsx)(_.a,{color:"all"===t.filter?"primary":"inherit",onClick:r,children:"All"}),Object(B.jsx)(_.a,{color:"active"===t.filter?"primary":"inherit",onClick:s,children:"Active"}),Object(B.jsx)(_.a,{color:"completed"===t.filter?"primary":"inherit",onClick:o,children:"Completed"})]})})]})})),X=n(213),tt=n(222),et=n(15),nt=function(){var t=Object(d.c)((function(t){return t.todolists})),e=Object(d.c)((function(t){return t.tasks})),n=Object(d.c)((function(t){return t.auth.isLoggedIn})),a=Object(d.b)();Object(c.useEffect)((function(){if(n){var t=function(t){t(L("loading")),f().then((function(e){t(L("succeeded")),t(N(e.data))}))};a(t)}}),[]);var i=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){n(L("loading")),n(M(t,e,!0)),g(e,t).then((function(a){if(0===a.data.resultCode){n(L("succeeded"));var i=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e);n(i)}else C(a.data,n)})).catch((function(t){y(t,n)}))}}(t,e);a(n)}),[a]),r=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){n(L("loading")),v(e,t).then((function(t){if(0===t.data.resultCode){var e={type:"ADD-TASK",task:t.data.data.item};n(e),n(L("succeeded"))}else C(t.data,n)})).catch((function(t){y(t,n)}))}}(t,e);a(n)}),[a]),s=Object(c.useCallback)((function(t,e,n){var i=U(t,{status:e},n);a(i)}),[a]),o=Object(c.useCallback)((function(t,e,n){var i=U(t,{title:e},n);a(i)}),[a]),l=Object(c.useCallback)((function(t,e){var n={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};a(n)}),[a]),u=Object(c.useCallback)((function(t){var e,n=(e=t,function(t){t(L("loading")),t({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:e,entityStatus:"loading"}),T(e).then((function(n){0===n.data.resultCode?(t(L("succeeded")),t(function(t){return{type:"REMOVE-TODOLIST",id:t}}(e))):(t(L("failed")),t(w(n.data.messages[0])))}))});a(n)}),[a]),j=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){p(t,e).then((function(a){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e))}))}}(t,e);a(n)}),[a]),b=Object(c.useCallback)((function(t){var e=function(t){return function(e){e(L("loading")),h(t).then((function(t){0===t.data.resultCode?(e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(L("succeeded"))):C(t.data,e)})).catch((function(t){y(t,e)}))}}(t);a(e)}),[a]);return n?Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)(X.a,{container:!0,style:{padding:"20px"},children:[Object(B.jsx)("h3",{children:"Add new todolist \xa0"}),Object(B.jsx)(V,{addItem:b})]}),Object(B.jsx)(X.a,{container:!0,spacing:3,children:t.map((function(t){var n=e[t.id];return Object(B.jsx)(X.a,{item:!0,children:Object(B.jsx)(tt.a,{elevation:6,style:{padding:"10px"},children:Object(B.jsx)(Q,{id:t.id,title:t.title,filter:t.filter,entityStatus:t.entityStatus,tasks:n,removeTask:i,changeFilter:l,addTask:r,changeTaskStatus:s,removeTodolist:u,changeTaskTitle:o,changeTodolistTitle:j})})},t.id)}))})]}):Object(B.jsx)(et.a,{to:"/login"})},at=n(217),it=n(218),ct=n(216),rt=n(220),st=n(206),ot=n(219),lt=n(105),dt=n(61),ut=n(109),jt=Object(lt.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.task.todoListId,[Object(u.a)(Object(u.a)({},e.task),{},{disabled:!1})].concat(Object(j.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(u.a)(Object(u.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(u.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var a=Object(u.a)({},t);return e.todolists.forEach((function(t){a[t.id]=[]})),a;case"SET-TASKS":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.todolistId,e.tasks.map((function(t){return Object(u.a)(Object(u.a)({},t),{},{disabled:!1})}))));case"SET-DISABLE-STATUS":return Object(u.a)(Object(u.a)({},t),{},Object(F.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(u.a)(Object(u.a)({},t),{},{disabled:e.disabled}):t}))));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(u.a)(Object(u.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(j.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{filter:e.filter}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(u.a)(Object(u.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(u.a)(Object(u.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":case"APP/SET-ERROR":return Object(u.a)(Object(u.a)({},t),e.payload);case"APP/SET-INITIALIZED":return Object(u.a)(Object(u.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(u.a)(Object(u.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),bt=Object(ut.a)({reducer:jt,middleware:function(t){return t().prepend(dt.a)}}),Ot=d.c;window.store=bt;var ft=n(211),ht=n(210),Tt=r.a.forwardRef((function(t,e){return Object(B.jsx)(ht.a,Object(u.a)({elevation:6,ref:e,variant:"filled"},t))}));function pt(){var t=Object(d.b)(),e=Ot((function(t){return t.app.error})),n=function(e,n){"clickaway"!==n&&t(w(null))};return Object(B.jsx)(ft.a,{open:!!e,autoHideDuration:6e3,onClose:n,children:Object(B.jsx)(Tt,{onClose:n,severity:"error",sx:{width:"100%"},children:e})})}var mt=n(226),gt=n(221),vt=n(225),xt=n(224),St=n(201),kt=n(108),It=function(){var t=Object(d.b)(),e=Object(d.c)((function(t){return t.auth.isLoggedIn})),n=Object(et.g)(),a=Object(kt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Min length is 3 characters"):e.password="Required",e},onSubmit:function(e){var n;t((n=e,function(t){t(L("loading")),S(n).then((function(e){0===e.data.resultCode?(t(A(!0)),t(L("succeeded"))):C(e.data,t)})).catch((function(e){y(e,t)}))}))}});return e&&n("/"),Object(B.jsx)(X.a,{container:!0,justifyContent:"center",children:Object(B.jsx)(X.a,{item:!0,justifyContent:"center",children:Object(B.jsx)("form",{onSubmit:a.handleSubmit,children:Object(B.jsxs)(gt.a,{children:[Object(B.jsxs)(St.a,{children:[Object(B.jsxs)("p",{children:["To log in get registered",Object(B.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noreferrer",children:" here"})]}),Object(B.jsx)("p",{children:"or use common test account credentials:"}),Object(B.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(B.jsx)("p",{children:"Password: free"})]}),Object(B.jsxs)(xt.a,{children:[Object(B.jsx)(K.a,{label:"Email",margin:"normal",name:"email",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.email}),a.touched.email&&a.errors.email&&Object(B.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(B.jsx)(K.a,Object(u.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&Object(B.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(B.jsx)(vt.a,{label:"Remember me",control:Object(B.jsx)(J.a,{name:"rememberMe",onChange:a.handleChange,checked:a.values.rememberMe})}),Object(B.jsx)(_.a,{type:"submit",variant:"contained",color:"primary",disabled:!a.isValid||!a.dirty,children:"Login"})]})]})})})})};var Ct=function(){var t=Object(d.b)(),e=Ot((function(t){return t.app.status})),n=Ot((function(t){return t.app.isInitialized})),a=Ot((function(t){return t.auth.isLoggedIn}));return Object(c.useEffect)((function(){t((function(t){I().then((function(e){0===e.data.resultCode&&t(A(!0))})).finally((function(){t({type:"APP/SET-INITIALIZED",isInitialized:!0})}))}))}),[]),n?Object(B.jsxs)("div",{className:"App",children:[Object(B.jsx)(at.a,{position:"static",children:Object(B.jsxs)(it.a,{children:[Object(B.jsx)(H.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(B.jsx)(st.a,{})}),Object(B.jsx)(ct.a,{variant:"h6",children:"News"}),a&&Object(B.jsx)(_.a,{color:"inherit",onClick:function(){t((function(t){t(L("loading")),k().then((function(e){0===e.data.resultCode?(t(N([])),t(A(!1)),t(L("succeeded"))):C(e.data,t)})).catch((function(e){y(e,t)}))}))},children:"Logout"})]})}),"loading"===e&&Object(B.jsx)(ot.a,{color:"secondary"}),Object(B.jsx)(rt.a,{fixed:!0,children:Object(B.jsxs)(et.d,{children:[Object(B.jsx)(et.b,{path:"/",element:Object(B.jsx)(nt,{})}),Object(B.jsx)(et.b,{path:"login",element:Object(B.jsx)(It,{})}),Object(B.jsx)(et.b,{path:"404",element:Object(B.jsx)("h1",{style:{textAlign:"center"},children:"404: PAGE NOT FOUND"})}),Object(B.jsx)(et.b,{path:"*",element:Object(B.jsx)(et.a,{to:"404"})})]})}),Object(B.jsx)(pt,{})]}):Object(B.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(B.jsx)(mt.a,{})})},yt=n(57);o.a.render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(d.a,{store:bt,children:Object(B.jsx)(yt.a,{children:Object(B.jsx)(Ct,{})})})}),document.getElementById("root")),l()}},[[158,1,2]]]);
//# sourceMappingURL=main.b2114428.chunk.js.map