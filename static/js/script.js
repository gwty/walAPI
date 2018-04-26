apiKey = "ufureemfx7a3mzx4mr93xc82";

// protects agains scripting attacks

function protectstring(string) {
return $($.parseHTML(string)).text();
}

$( document ).ready(function(){
$("#search_button").click( function() {
getproducts($("#search").val());
})
});

// displays the product grid

function getproductdetails(div, item,i) {
      item_html = `
      <div class='item' id="${item['itemId']}">
      <img class="image"/>
        <div class="name"></div>
                <div class="msrp"></div>
        <div class="price"></div>
        <div class="description"></div>
      </div>
      `;
    
      div.append(item_html);
      
      var item_selector = '#' + item['itemId'] + '>.' ;
      
      var name = protectstring(item['name']);
      var description = protectstring(item['shortDescription']);
      var image = protectstring(item['thumbnailImage']);
      var msrp = item['msrp'];
      if (!msrp) msrp = "";
      var price = item['salePrice'];
      
      $(item_selector + 'name').text(name);
      if (!item['shortDescription'])
            $(item_selector + 'description').text("Description is not found");
      else 
            $(item_selector + 'description').html(description);
      $(item_selector + 'image').attr("src", image);
      $(item_selector + 'msrp').text("MSRP: $"+ msrp);
      $(item_selector + 'price').text("Sale Price: $" + price);
      
      $('#' + item['itemId']).click( function() {
      getproductrecommendations(item);
      }
      );
}

// uses the search api 

function getproducts(search_string) {

url = "http://api.walmartlabs.com/v1/search?query=+" + search_string + "&format=json&apiKey=" +apiKey;
 $.ajax({
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: function(res){
      results = res.items;
      length = 10;
      $("#products").text("");
      for (i=0;i<length;i++) {
             getproductdetails($("#products"),results[i],i);
      }
     }
     });

}

//uses the recommendations api, routed through the local server. the original one doesn't support jsonp
function getproductrecommendations(item) {

    url = "/recommendations/" + item['itemId'];
    console.log(url);
 $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(res){
      results = res;
      console.log(res);
      length = 10;
      $("#details").empty();
      showproduct(item,$("#details"));
      for (i=0;i<length;i++) {
             getproductdetails($("#details"),results[i],i);
      }
      
     },
     error: function(xhr, ajaxOptions, thrownError){
         for (x in xhr) {console.log(x + ":" + xhr[x]);}
                    console.log(thrownError);
                },
     });
 
// displays more details about the product

function showproduct(item,div) {
      item_html = `
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
    
      div.append(item_html);
      console.log(item);
      var item_selector = '#' + "productDescription" + '>.' ;
      
      var name = protectstring(item['name']);
      var description = protectstring(item['longDescription']);
      var image = protectstring(item['largeImage']);
      var msrp = item['msrp'];
      if (!msrp) msrp = "";
      var price = item['salePrice'];
      var stock = item['stock'];
      
      console.log(price);
      $(item_selector + 'name').text(name);
      if (!item['longDescription'])
            $(item_selector + 'description').text("Description is not found");
      else 
            $(item_selector + 'description').html(description);
      $(item_selector + 'msrp').text("MSRP: $"+ msrp);
      $(item_selector + 'price').text("Sale Price: $" + price);
      $(item_selector + 'stock').text("Stock: " + stock);
      $(item_selector + 'bigimage').attr("src", image);

      
}

// Get the modal

var modal = document.getElementById('productDetails');
modal.style.display = "block";

// Get the <span> element that closes the modal

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}