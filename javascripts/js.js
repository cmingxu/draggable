$(document).ready(function () {

  section = $(".section:first").clone();
  section_dom = "<div class='section'><p>new section <span>X</span></p></div>";
  
  // make all repeateable ele dragable
  $('.dragables .repeateable').draggable({ cursor: "crosshair",
                                   helper: function () {
                                     return section_dom;
                                   },
                                   connectToSortable: ".dropable_area",
  });

  // make all field ele dragable
  $('.dragables .field').draggable({
                                   cursor: "crosshair",
                                   helper: "clone" ,
                                   stop: function () {
                                     console.log("field stop");
                                   }
  });

  
  //all section under dragable area sortable
  $(".dropable_area").sortable( {
    handle: "p",
    update:  function(event, ui) {
      console.log("update")
      if(ui.item.hasClass("repeateable")){
        ui.item.replaceWith(section_dom);
        $(".dropable_area .section").each(function (index, section) {
          section_droppable($(section));
        });

      }
    }
  });

  //each section accept fields
  $(".dropable_area .section").each(function (index, section) {
    section_droppable($(section));
  });

  //make a section droppable, either static or dynamic
  function section_droppable(section) {
    console.log('section_droppable');
    section.droppable({
     accept: ".dragables .field",
     hoverClass: "ui-state-highlight",
     drop: function (event, ui) {
       console.log('drop');

       ui.draggable.clone().css("display", "block").appendTo($(this));
       ui.draggable.draggable({disabled: true}).addClass("disabled");
     }
    });

    section.find("span").click(function () {
      if(confirm("Sure to remove this section? ")){
        section = $(this).closest(".section");
        section.find(".field").each(function (index, field) {
          $(".field:contains(" + $(field).text() + ")").draggable({disabled: false}).removeClass("disabled");
        });
        section.remove();
      }
    });
  }


});
