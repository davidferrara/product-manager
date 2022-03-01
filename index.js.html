<script type="text/javascript">
  $(document).ready(function() {
    //Get the Searchable Select Ready
    google.script.run.withSuccessHandler(setSelect).getSelectData();

    //Prevent form submission
    $('form').submit(function(e){
      e.preventDefault(e);
      $('form')[0].reset();
      $('form')[1].reset();
      google.script.run.withSuccessHandler(setSelect).getSelectData();
      $('#add-Product-Container').slideUp(1000);
      $('#add-Disposal-Container').slideUp(1000);
    });

    //Hide all the forms.
    $('#add-Product-Container').hide();
    $('#add-Disposal-Container').hide();
    $('#result-Container').hide();
    $('#p-result-table').hide();
    $('#d-result-table').hide();

    //Set the button functions.
    $('#add-product-button').click(function(){
      $('#add-Product-Container').slideToggle(1000);
      $('#add-Disposal-Container').slideUp(1000);
      $('#result-Container').slideUp(1000);
      $('#p-result-table').slideUp(1000);
      $('#d-result-table').slideUp(1000);
    });
    $('#add-disposal-button').click(function(){
      $('#add-Disposal-Container').slideToggle(1000);
      $('#add-Product-Container').slideUp(1000);
      $('#result-Container').slideUp(1000);
      $('#p-result-table').slideUp(1000);
      $('#d-result-table').slideUp(1000);
    });
  });

  function setSelect(data) {
    //Add Product Form
    $('#clientPrefix').select2({ theme: "bootstrap-5", width: 'resolve', data: data });
    $('#reason').select2({ theme: "bootstrap-5", minimumResultsForSearch: Infinity });
    $('#condition').select2({ theme: "bootstrap-5", minimumResultsForSearch: Infinity });

    //Add Disposal Form
    $('#clientPrefix2').select2({ theme: "bootstrap-5", width: 'resolve', data: data });
    $('#reason2').select2({ theme: "bootstrap-5", minimumResultsForSearch: Infinity });
  }

  function getProductFormData(){
    let form = document.getElementById("add-product-form").elements;
    let array = [];
    for(let i = 0 ; i < form.length - 1; i++){
      let item = form.item(i);
      array.push(item.value);
    }
    google.script.run.withSuccessHandler(onSuccess).inputProductForm(array);
  }

  function onSuccess(resultArray) {
    displayResult(resultArray[1]);
    window.open(resultArray[0], '_blank', 'width=800, height=600');
  }

  function getDisposalFormData(){
    let form = document.getElementById("add-disposal-form").elements;
    let array = [];
    for(let i = 0 ; i < form.length - 1; i++){
      let item = form.item(i);
      array.push(item.value);
    }
    google.script.run.withSuccessHandler(onSuccess2).inputDisposalForm(array);
  }

  function onSuccess2(result) {
    displayResult(result);
  }

  function displayResultOLD(result){
    console.log({result});
    let formattedResult = '';
    for(let i = 0; i < result.length; i++) {
      if(i != result.length - 1) {
        formattedResult += result[i] + '  |  ';
      } else {
        formattedResult += result[i];
      }
    }

    $('#result').html(formattedResult);
    $('#result-Container').slideDown(1000);
  }

  function displayResult(result){
    console.log({result});
    let wrappedResult = [result];
    
    if(result.length == 11) {
      $('#p-result-table').DataTable({
        destroy: true,
        data: wrappedResult,
        dom: 'rt',
        autoWidth: false,
        ordering: false,
        columns: [
          { title: 'ID',
            width: '50px' },
          { title: 'Client Prefix',
            width: '50px' },
          { title: 'Reason Not On Amazon',
            width: '150px' },
          { title: 'Condition',
            width: '125px' },
          { title: 'Condition Notes',
            width: '300px' },
          { title: 'ASIN/UPC',
            width: '100px' },
          { title: 'Variation Notes',
            width: '100px' },
          { title: 'Quantity',
            width: '50px' },
          { title: 'Initial',
            width: '50px' },
          { title: 'Location',
            width: '100px' },
          { title: 'Date',
            width: '75px' }
        ]
      });

      $('#p-result-table').show();
    } else {
      $('#d-result-table').DataTable({
        destroy: true,
        data: wrappedResult,
        dom: 'rt',
        autoWidth: false,
        ordering: false,
        columns: [
          { title: 'ID',
            width: '50px' },
          { title: 'LPN Number',
            width: '125px' },
          { title: 'Client Prefix',
            width: '50px' },
          { title: 'Reason Disposed',
            width: '300px' },
          { title: 'ASIN/UPC',
            width: '100px' },
          { title: 'Initial',
            width: '50px' },
          { title: 'Disposal Bin',
            width: '100px' },
          { title: 'Date',
            width: '75px' }
        ]
      });

      $('#d-result-table').show();
    }

    $('#result-Container').slideDown(1000);
  }

</script>




























