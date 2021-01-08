$(() => {
    $("form").on('click', (e) => {
        e.preventDefault();
        // Take User name
        let userinput = $('input[type="number"]').val();
        var button = $(e.target).text();
        console.log($(e.target));
        console.log(button.toUpperCase());
        if(userinput < 1) {
          userinput = 10;
        }
        let container = document.getElementById("conatiner");
        container.style.display = "block"
        $.ajax({
          url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough="+button.toUpperCase(),
        })
          // .done(function( data ) {
          //   if ( console && console.log ) {
          //     console.log( "Sample of data:", data.slice( 0, 100 ) );
          .then(
            (data) => {
              // print the number of complaints that are input
              var count = 0;
          for (let index = 0; index < data.length; index++) {
            if (data[index].agency == 'NYPD' && count < Number(userinput)) {
              count++;
              $('ol').append(`
            <li>
            <strong>Borough</strong><span id="borough">${
              data[index].borough
            }</span>
            <br>
            <strong>Descriptor</strong>:<span id="descriptor">${
              data[index].descriptor
            }</span>
            <br>
            <strong>Agency</strong>:<span id="agency">${data[index].agency}</span>
            <br>
            <div ><strong>Resolution description</strong>:<span><br><section>${
              data[index].resolution_description
            }</section></span></div>
            <input type="submit" value="NYPD Response" onclick="response(${count.toString()})" class="btn btn-warning">
            </li>
            
            <hr>
            `);
  
              console.log(data[index]);
            }
          }
        },
        () => {
          // Output a bad request
          console.log('Bad Request');
        }
      );
    })
  });
  function myReset() {
    console.log("myReset");
    $('ol').html("")
  }