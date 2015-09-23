	  current = 0;
      var modal = $("#modal");
      //modal.hide();
      var containerPlay = $(modal).find("#secuencia").html("<div id='playContainer'><img id='play' src='img/botones/play.png'><h2>Play</h2><div>");
      containerPlay.find("#play")
      .addClass("playState")
      .on("click",function(){
      		modal.hide();
      });

      arrayObjetos = new Array();

      $(".prenda").draggable({ 
           start: function(){
              arrayObjetos.push($(this).attr("id"));
           },
        drag: function(e, ui){
           $(this).addClass("iluminar");
        },
        revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            $(this).removeClass("iluminar");
            return !event;
        }
      });

      $("#restart").on("click",function(){
        current = 0;
         $.each(arrayObjetos,function(i,e){
            $("#"+e).css({
              'left' : '0px',
              'top' : '0px'
            }).show();
         });
         vestir(current);
      });

      $("#drop2").droppable({
        accept: '#a-camiseta ,#a-chaqueta',
        drop: function(e,i){
          var orderDrag = parseInt($(i.draggable[0]).attr("data-order"));
          validar(orderDrag,$(i.draggable[0]));
        }
      });

      $("#drop3").droppable({
        accept: '#a-pantalon',
        drop: function(e,i){
          var orderDrag = parseInt($(i.draggable[0]).attr("data-order"));
          validar(orderDrag,$(i.draggable[0]));
        }
      });

      $("#drop4").droppable({
        accept: '#a-medias, #a-zapatos',
        drop: function(e,i){
          var orderDrag = parseInt($(i.draggable[0]).attr("data-order"));
          validar(orderDrag,$(i.draggable[0]));
        }
      });

      function validar(order,obj){
        if(current === order){
          $(obj).hide();
            current ++;
            animar(obj);
        }else{
            $(obj).draggable({revert:true});
        }
      }

      function vestir(step){
          $("#boy").attr("src","img/vestir/"+step+".png");        
      }

      function animar(obj){
              modal.addClass("normal");
              modal.show();
              var id = $(obj).attr("id");
              var nFrames = parseInt($(obj).attr("data-n-frames"));
              var delay = parseInt($(obj).attr("data-delay"));
              var timeAnimate = nFrames * delay;
              var timeCongratulation = timeAnimate + delay;


              $("#secuencia").html("<img id='secuencia' src='img/"+id+"/"+id+".gif' class='animate' />");

              setTimeout(function(){
                $("#modal #secuencia img").remove();
                modal.removeClass("normal");
              },timeAnimate);

              setTimeout(function(){
                  modal.addClass("congratulation");
              },timeCongratulation);

              setTimeout(function(){
                  vestir(current);
                  modal.hide();
                  modal.removeClass("congratulation");
              },timeCongratulation+(delay*2));
      }
