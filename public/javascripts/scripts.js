$(function(){var r=!0;$(".switch-button").on("click",function(o){o.preventDefault(),console.log(12),$(".box.auth p.error").remove(),$("input").removeClass("error"),$("input").val(""),r?(r=!1,$(".register").show("slow"),$(".login").hide()):(r=!0,$(".login").show("slow"),$(".register").hide())}),$("input").on("focus",function(){$("p.error").remove(),$("input").removeClass("error")}),$(".register-button").on("click",function(r){r.preventDefault(),$(".register p.error").remove();var o={login:$("#register-login").val(),password:$("#register-password").val(),passwordConfirm:$("#register-password-confirm").val()};$.ajax({type:"POST",data:JSON.stringify(o),contentType:"application/json",url:"/api/auth/register"}).done(function(r){r.ok?$(".register h2").after("<p class='success'>Отлично!</p>"):($(".register h2").after('<p class="error">'+r.error+"</p>"),r.fields&&r.fields.forEach(function(r){$("input[name="+r+"]").addClass("error")}))})}),$(".login-button").on("click",function(r){r.preventDefault(),$(".login p.error").remove();var o={login:$("#login-login").val(),password:$("#login-password").val()};$.ajax({type:"POST",data:JSON.stringify(o),contentType:"application/json",url:"/api/auth/login"}).done(function(r){r.ok?$(".login h2").after("<p class='success'>Отлично!</p>"):($(".login h2").after('<p class="error">'+r.error+"</p>"),r.fields&&r.fields.forEach(function(r){$("input[name="+r+"]").addClass("error")}))})})});