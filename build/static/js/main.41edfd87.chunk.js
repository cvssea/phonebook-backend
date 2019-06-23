(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=t(4),l=t(15),i=t(16),m=t(2),s=t(3),f=t.n(s),d="/api/people",b=function(e){var n=e.title;return r.a.createElement("h1",null,n)},h=function(e){var n=e.message;return r.a.createElement("div",{className:"Notification ".concat(n.success?"success":"error")},n.text)},v=function(e){var n=e.onChange,t=e.value;return r.a.createElement("div",null,r.a.createElement("h3",null,"Filter by name"),r.a.createElement("input",{onChange:n,value:t}))},E=function(e){var n=e.onSubmit,t=e.onChange,a=e.newPerson;return r.a.createElement("form",{onSubmit:n},r.a.createElement("h3",null,"Add new person"),r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{name:"name",onChange:t,value:a.name,placeholder:"Add Name"})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{name:"number",onChange:t,value:a.number,placeholder:"Add Number"})),r.a.createElement("div",null,r.a.createElement("button",null,"add")))},p=function(e){var n=e.name,t=e.number,a=e.onClick;return r.a.createElement("p",null,n," ",t," ",r.a.createElement("button",{onClick:a},"delete"))},g=function(e){var n=e.people,t=e.handleDelete,a=n.map(function(e){return r.a.createElement(p,{key:e.id,name:e.name,number:e.number,onClick:function(){return t(e.id)}})});return r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),a)},w=function(){var e=Object(a.useState)([]),n=Object(m.a)(e,2),t=n[0],c=n[1],u={name:"",number:""},s=Object(a.useState)(u),p=Object(m.a)(s,2),w=p[0],j=p[1],O=Object(a.useState)(""),C=Object(m.a)(O,2),x=C[0],S=C[1],k=Object(a.useState)(t),y=Object(m.a)(k,2),N=y[0],A=y[1],D=Object(a.useState)(null),P=Object(m.a)(D,2),T=P[0],F=P[1];Object(a.useEffect)(function(){f.a.get(d).then(function(e){return e.data}).then(function(e){return c(e)}).catch(function(e){return F({success:!1,fatalError:!0,text:"".concat(e," - Please try again later.")})})},[]);var J=function(){return F(null)};return Object(a.useEffect)(function(){var e=t.filter(function(e){return e.name.toLowerCase().includes(x.toLowerCase())});e.length&&A(e)},[t,x]),r.a.createElement("div",null,r.a.createElement(b,{title:"Phonebook"}),T&&r.a.createElement(h,{message:T}),T&&T.fatalError?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{onChange:function(e){var n=e.target.value;S(n)},value:x}),r.a.createElement(E,{onSubmit:function(e){if(e.preventDefault(),t.some(function(e){return e.name===w.name})){if(window.confirm("".concat(w.name," is already added. Replace the old number?"))){var n=t.find(function(e){return e.name===w.name}).id;(function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})})(n,w).then(function(e){c(t.map(function(n){return n.id===e.id?e:n})),F({success:!0,text:"Updated number for ".concat(e.name)}),setTimeout(J,5e3)}).catch(function(e){c(t.filter(function(e){return e.id!==n})),F({success:!1,text:"".concat(w.name," has already been deleted from the server!")}),setTimeout(J,5e3)})}}else(function(e){return f.a.post(d,e).then(function(e){return e.data})})(w).then(function(e){c([].concat(Object(i.a)(t),[e])),F({success:!0,text:"Added ".concat(w.name,"!")})}).catch(function(e){return F({success:!1,text:e.response.data.error})}),setTimeout(J,5e3);j(u)},onChange:function(e){var n=e.target,t=n.name,a=n.value;j(Object(l.a)({},w,Object(o.a)({},t,a)))},newPerson:w}),r.a.createElement(g,{people:N,handleDelete:function(e){var n=t.find(function(n){return n.id===e});window.confirm("Delete ".concat(n.name,"?"))&&(function(e){return f.a.delete("".concat(d,"/").concat(e))}(e).then(function(){return c(t.filter(function(n){return n.id!==e}))}).catch(function(a){c(t.filter(function(n){return n.id!==e})),F({success:!1,text:"".concat(n.name," was already deleted from the server")}),setTimeout(J,5e3)}),S(""))}})))};t(40);u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.41edfd87.chunk.js.map