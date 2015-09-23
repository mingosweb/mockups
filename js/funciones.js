$(document).ready(
	function(){

		

		//ocultar los elementos
		$("#formTest fieldset").not(".active").hide();

		$("#formTest fieldset .pregunta").each(function(i){
			var pregunta = $(this);
			$(this).find(" :radio").each(function(){
				$(this).on("click",function(){
					if(pregunta.attr("class").search("preguntaError") !== -1){
						pregunta.removeClass("preguntaError");
						validar();
					}
				});
			});
		});
		

		function validar(){
			if($("form").serializeArray().length === 12){
				$("#formTest :submit").slideDown();
			}else{
				$("#formTest :submit").hide();
			}
		}

		validar();

		//variable para conocer el estado del PASO actual y si se HA tratado de enviar o no
		var actual = 0;
		var enviar = 0;

		//aqui ocurren todos los sucesos al navegar entre pasos
		$(".pagination a").each(function(i,element){
			$(element).on("click",function(){

				$("#formTest .paso").eq(i).find(" .pregunta").each(function(i){
						
							if($(this).find(" :checked").length === 0){
								$(this).addClass("preguntaError");
							}else{
								$(this).removeClass("preguntaError");
								validar();
							}
						
				});

				if(actual !== i){
					$("#formTest .pagination a").filter(".active").removeClass('active');
					$(element).addClass("active");
					$("form fieldset").filter(".active").slideUp().removeClass('active');
					$("form fieldset").eq(i).slideDown().addClass("active");
					actual = i;
				}
			});
		});


		$("form").on("submit",function(){
			var suma = 0;

			mensaje = "Te redireccionaremos al siguiente juego para que empieces a interactuar con lazarillo!";

			$("#formTest :checked").each(function(){
				suma += parseInt($(this).val());
			});
			
			if(suma >= 70 && suma <=90){
				alert("autismo clasico. Puntuacion: "+suma);
			}else if(suma >= 50 && suma <70){
				alert("autismo regresivo. Puntuacion: "+suma);
			}else if(suma >= 40 && suma < 50){
				alert("autismo alto funcionamiento. Puntuacion: "+suma);
			}else if(suma >= 30 && suma <=45){
				alert("autismo Aspeger. Puntuacion: "+suma);
			}

			window.location.href = "juego.html";

			return false;
		});
		


	}

);

