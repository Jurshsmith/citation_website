$(document).ready(() => {
    //CLEAR local storage -- dangerous
    // localStorage.clear();

    //get from storage first
    const prevData = JSON.parse(localStorage.getItem('cw_data')) || [];


    prevData.forEach(data => {
      $('<div/>').html(`${data.output}`).appendTo($('.results'));
    });


    //add event listeners here
    (() => {
      //1
      $(".result").click(function (e) {
        // const id = $(this).html();
        // console.log($(this).html());
        // console.log(e);
      });


      //2
      $(".j-overlay").click(() => {
        //reset display none to default
        //register all dynamic show and hide elements here
        $(".edit-citation").addClass("display-none");
        $(".multiple").addClass("display-none");
        $(".j-overlay").addClass("display-none");

      });
    })();

   

  });









  //all functions
  function editCitation(id){
    console.log(id);

    //show editable and alter data there
    $('.j-overlay').removeClass('display-none');
    $('.edit-citation').removeClass('display-none');

    //get from storage first
    const prevData = JSON.parse(localStorage.getItem('cw_data')) || [];

    console.log(prevData.filter(d => d.output === id));
  }

  function deleteCitation(id){
    console.log(id);
    //get from storage first
    const prevData = JSON.parse(localStorage.getItem('cw_data')) || [];

    const newData = prevData.filter(d => d.key !== id);

    updateData(newData);
    

  }



  function updateData(data){

    localStorage.setItem('cw_data', JSON.stringify(data));

    $('.results').html("");
    //get from storage first
    const prevData = JSON.parse(localStorage.getItem('cw_data')) || [];

    prevData.forEach(data => {
      $('<div/>').html(`${data.output}`).appendTo($('.results'));
    });

  }



  function setLoading(truthy){
    if(truthy){
      return $('.spinner').removeClass('display-none');
    }
    return $('.spinner').addClass('display-none');
  }



  function storeLocally(data, output){
    //get from storage first
    const prevData = JSON.parse(localStorage.getItem('cw_data')) || [];

    prevData.push({...data, output});

    //store in local storage
    localStorage.setItem('cw_data', JSON.stringify(prevData));
  }






  function citateMulti(id){
    console.log(id);
    $("#modalC").click();
    $("#searchEntry").val('');
    $("#searchEntry").val(id);
    citate();
    
  }

  function citate() {
    let currentMultipleData = {};
    console.log($("#searchEntry").val());
    const searchEntry = $("#searchEntry").val();
    
    //sets loading true
    setLoading(true);

    fetch(`/api/search?searchEntry=${searchEntry}`)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);



        if (data.empty){

        //show html that it is an empty result      

        return;
        } else {

          //if not empty
          if (data.multiple) {
            $('#modalClick').click();
          // $(".j-overlay").removeClass("display-none");
          // $(".multiple").removeClass("display-none");
          
          const cList = $(".multi");
          cList.html("");
          $.each(data.items, i => {


            const eachItem = $(`<div onClick="citateMulti(${i})"/>`)
                .addClass(`col select-con`)
              
                .html(
                  `<div class="modal-con">
                <div>
                    <img src="./img/reading.jpg" width="100px" alt="">
                </div>
                <div>
                    <h4 class="ml-4">${data.items[i].title}</h4>
                    <p>${data.items[i].description}</p>
                    <p>Type: ${data.items[i].itemType}</p>
                </div>
                  
                </div>`
                )
                
                .addClass(`call-${i}`)
                .appendTo(cList);
            });
          }

          if (!data.multiple) {
            let newOutput = `<div class="result">${data.output}
            <button class="btn" id="edit-${data._d.key}" onClick="editCitation('${data._d.key}')">Edit</button>
            <button class="btn" id="delete-${data._d.key}" onClick="deleteCitation('${data._d.key}')">Delete</button></div>`;

            storeLocally(data._d, newOutput);

            $('<div/>').html(newOutput).appendTo($('.results'))

          } 


        }

        setLoading(false);
        
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
         //show error html with display none and all
      });
  }