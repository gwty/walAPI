$( document ).ready(function(){
$("#search_button").click( function() {
getproducts($("#search").val());
});
$('body').overlayScrollbars({
  className: "os-theme-dark"
}); 
});


function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}


function settext(item_selector, elements) {
    for (var item in elements) {
        var content = $.parseHTML(decodeEntities(elements[item]));
        $(item_selector + item).html(content);
    }
}

// displays the product grid

function getproductdetails(div, item_id,i, search_string) { 
      item_html = `
      <div class='item' id="${item_id}">
      <img class="image"/>
      <div class="name"></div>
      <div class="msrp"></div>
      <div class="price"></div>
      <div class="description"></div>
      </div>
      `;
      div.append(item_html);
      
      url = "/lookup/" + item_id;
      $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(item){
          console.log(item);
      var item_selector = '#' + item['itemId'] + '>.' ;
      elements = {'name': item['name'],
                           'description': item['shortDescription'],
                           'msrp': "MSRP: $" + item['msrp'],
                           'price': "Sale Price: $" + item['salePrice']
      }
      settext(item_selector, elements);
      
      $(item_selector + 'image').attr("src", item['thumbnailImage']);
      $('#' + item['itemId']).overlayScrollbars({className: "os-theme-dark", overflowBehavior:{x : "hidden"}}); 
      $('#' + item['itemId']).click( function() {
      getproductrecommendations(item, search_string);
      }
      );
    },
     error: function(xhr, ajaxOptions, thrownError){
         for (x in xhr) {console.log(x + ":" + xhr[x]);}
                    console.log(thrownError);
     }    
     });

     
}

// uses the search api 

function getproducts(search_string) {

url = "/search/" + search_string;
 $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(res){
      
      results = res.items;
      length = 10;
       
      $("#products").html("");
    
      for (var i=0;i<results.length;i++) 
             getproductdetails($("#products"),results[i]["itemId"],i, search_string);
          
    },
     error: function(xhr, ajaxOptions, thrownError){
         for (x in xhr) {console.log(x + ":" + xhr[x]);}
                    console.log(thrownError);
     }    
     });

}

//uses the recommendations api
function getproductrecommendations(item, search_string) {

url = "/recommendations/" + item['itemId'];
 $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(results){
      length = 10;
      $("#products").empty();
      showproduct(item,$("#products"));
      for (var i=0;i<length;i++) {
             getproductdetails($("#products"),results[i]["itemId"],i, search_string);
      }
      $("#back").click( function() {
      $("#products").empty();
      getproducts(search_string);
      });
      
     },
     error: function(xhr, ajaxOptions, thrownError){
         for (x in xhr) {console.log(x + ":" + xhr[x]);}
                    console.log(thrownError);
     },
     });
 
// displays more details about the product

function showproduct(item,div) {
    
      var product_html = `
      <span id="back">Back to search results</span>
      <div class='productDescription' id="productDescription">
      <img class="bigimage" />
      <div class="name"></div>
      <div class="msrp"></div>
      <div class="price"></div>
      <div class="stock"></div>
      <div class="description"></div>
      </div>
      
      <hr>
      <h3>Recommended Products for you</h3>
      <br>
      `;
      
      div.append(product_html);
      var item_selector = '#' + "productDescription" + '>.' ;
      
      elements = {'name': item['name'],
                           'description': item['longDescription'],
                           'msrp': "MSRP: $" + item['msrp'],
                           'price': "Sale Price: $" + item['salePrice'],
                           'stock': item['stock']
      }      
      settext(item_selector, elements);
      $(item_selector + 'bigimage').attr("src", item['largeImage']);

}
}