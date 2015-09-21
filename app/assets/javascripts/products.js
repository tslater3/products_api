$(document).ready(function(){
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

  // for showing all of the data
  function productCard(product) {
    $.ajax('/product_card', {
      type: 'GET',
      data: {product: product},
      success: function(data) {
        $('#products').append("<li class='robot col l3 s12'>" + data + "</li>");
        // $('.info').append("data-user-id=' + product.id")
      },
      error: function(data) {
        alert('no robots :( )');
      }
    });
  }

// for showing all of the data
  function getProducts(){
    $.ajax(baseUrl, {
      type: 'GET',
      success: function(data) {
        for (index in data.products) {
          var product = data.products[index];
          productCard(product);
        }
      }

    });
  };

  getProducts();

// for adding data
  $('.add').on('click', function(){
    var name = $('#new_product_name').val();
    var base_price = $('#new_base_price').val();
    var quantity = $('#new_quantity').val();
    var color = $('#new_color').val();
    var weight = $('#new_weight').val();
    var other = $('#new_other_attributes').val();
    var product = { product: {name: name, base_price: base_price, quantity_on_hand: quantity, color: color, weight: weight, other_attributes: other }}

    $.ajax(baseUrl, {
      type: 'POST',
      data: product,
      success: function(data) {
        var product = data.product;
        console.log(product);
        $('#products').append("<li class='robot col l3 s12'>" + data + "</li>")
        getProducts();
        $('#products').slideToggle();
        $('#add_product')[0].reset();
        $('.toggle-robots').removeClass('hide');
      }
    })
  });

// for toggling all robots
  $('.toggle-robots').on('click', function(){
    $('#products').slideToggle();
    $('.toggle-robots').addClass('hide');
  });

// for editing a robot
  $(document).on('click', '#edit', function(){
    // set some variables!

    var price = $('#product-price').html();
    var quantity = $('#product-quantity').html();
    var color = $('#product-color').html();
    var weight = $('#product-weight').html();
    var serial = $('#product-id').html();
    console.log(price);

    $.ajax(baseUrl + '/' + serial, {
      type: 'GET',
      success: function(data) {
        //still need edit name
        console.log($('#edit_price').val(price));
        $('#edit_quantity').val(quantity);
        $('#edit_color').val(color);
        $('#edit_weight').val(weight);
      }

    });




    var name = $('#edit_name').val();
    var base_price = $('#edit_price').val();
    var quantity = $('#edit_quantity').val();
    var color = $('#edit_color').val();
    var weight = $('#edit_weight').val();
    // var other = $('#edit_other_attributes').val();
    var serial_num = $('#edit_serial_num').val();
    var product = { product: {name: name, base_price: base_price, quantity_on_hand: quantity, color: color, weight: weight }}
    console.log(product);
    var id = $('#product-id').html();
    $('#edit_product').removeClass('hide');
    $('#add_product').addClass('hide');
    $('#products').slideToggle();

    $.ajax(baseUrl + '/' + id, {
      type: 'PUT',
      data: product,
      success: function(data){
        alert('heyehy');

      }
    });

  });


// for deleting things
  $(document).on('click', '.delete-product', function(){
    var id = $('#product-id').html();
    var that = $(this);
    console.log(that);
    $.ajax(baseUrl + '/' + id, {
      type: 'DELETE',
      success: function(data) {
        that.closest('.card').remove();                               // still having problems with this
        // that.closest('#product-id').remove();

      }
    });
  });







});
