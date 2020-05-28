		var currency = '£';
//cart value
 var CartDataValue = function() {
    function getCartData(){
      return JSON.parse(localStorage.getItem('cart'));
    }
    function setCartData(o){
      localStorage.setItem('cart', JSON.stringify(o));
      return false;
    }
    var cartData = getCartData();
    //console.log(cartData)
    var sum = [];
    var countProduct = [];
    if(cartData !== null) {
      for(var items in cartData){
        var cartValue = cartData[items][4]*1;
        var cartPrice = cartData[items][1].split(currency)[1]*1*cartValue;
         sum.push(cartPrice);
         countProduct.push(cartValue);
       }
        var sumResult = sum.reduce(function(a, b) { return a + b; }, 0);
        var countProductResult = countProduct.reduce(function(a, b) { return a + b; }, 0);
        //console.log(sumResult);
        //console.log(countProductResult);
        document.querySelector('#sumPrice').innerHTML = currency + '' + sumResult.toFixed(2);
        document.querySelector('#sumProduct').innerHTML = '(' + countProductResult + ')';
      }
      else {
        document.querySelector('#sumPrice').innerHTML = '';
        document.querySelector('#sumProduct').innerHTML = '(0)';
      }
      //console.log(sum)
  }
//end cart value
//menu
document.getElementById("burger").onclick = function() {open()};

function open() {
    document.getElementById("menu").classList.toggle("show");
    document.getElementById("burger").classList.toggle("close");
}
//end menu
//search
document.getElementById("search").onclick = function(event) {
	event.preventDefault();
	openSearch()
};

function openSearch() {
    document.getElementById("search__container").classList.toggle("show");
}
//end search

//filter 
var FilterFunction = function() {
	document.getElementById("filter__stage").onclick = function(event) {
		event.preventDefault();
		openFilter()
	};
	function openFilter() {
	    document.getElementById("filter__menu").classList.toggle("show");
	    document.getElementById("filter__stage").classList.toggle("close");
	}
	var fashionContainer = document.getElementById('fashion');
	var selectedFashion;
	var productTypeContainer = document.getElementById('productType');
	var selectedProductType;
	var colorFilterContainer = document.getElementById('colorFilter');
	var selectedColorFilter;
	var brandContainer = document.getElementById('brand');
	var selectedBrand;
	var sizeFilterContainer = document.getElementById('sizeFilter');
	var selectedSizeFilter;
	var priceFilterContainer = document.getElementById('priceFilter');
	var selectedPriceFilter;

	var filterStage = document.getElementById('filter__stage');
	var dataFashion = filterStage.querySelector('[data-filter="fashion"]');
	var dataType = filterStage.querySelector('[data-filter="type"]');
	var dataColor = filterStage.querySelector('[data-filter="color"]');
	var dataBrand = filterStage.querySelector('[data-filter="brand"]');
	var dataSize = filterStage.querySelector('[data-filter="size"]');
	var dataPrice = filterStage.querySelector('[data-filter="price"]');

	var SelectValue = function(id, data) { 
		id.onclick = function(event) {
		  var target = event.target;
		  var input = target.closest('li');
		  var valueField = id.closest('li').querySelector('.filter__value');
		  var stageValue = id.closest('li').querySelector('.filter__heading');
		  var parentLi = id.parentNode;
		  var defaultSelect = id.closest('li').querySelector('.filter-select__item-default');
		  if (input.innerHTML != 'Not selected') {
		  		valueField.innerHTML = input.innerHTML;
		  		data.innerHTML = input.innerHTML; 
		  		data.style.color = "#f14a58";
		  		defaultSelect.style.color = "#a8a8a8";
		  		let styles = 'font-size:12px; padding: 13px 25px;'
				stageValue.style = styles;
				valueField.style = 'padding: 0 25px';
				parentLi.style = 'background: #f7f7f7';
		  }
		  else {
		  	valueField.innerHTML = '';
		  	data.innerHTML = stageValue.innerHTML; 
		  	data.style.color = "#000";
		  	defaultSelect.style.color = "#000";
		  	let styles = 'font-size:16px; padding: 25px;'
				stageValue.style = styles;
			valueField.style = 'padding: 0';
			parentLi.style = 'background: #fff';
		  }
		  if (!input) return; 
		  if (!id.contains(input)) return;

		  highlightSelect(input, id);
		} 
	}
	SelectValue(fashionContainer, dataFashion);
	SelectValue(productTypeContainer, dataType);
	SelectValue(colorFilterContainer, dataColor);
	SelectValue(brandContainer, dataBrand);
	SelectValue(sizeFilterContainer, dataSize);
	SelectValue(priceFilterContainer, dataPrice);
	
	function highlightSelect(node, id) {
		 if(id == fashionContainer) {
		  if (selectedFashion) {
		    selectedFashion.classList.remove('highlight');
		  }
		  selectedFashion = node;
		  selectedFashion.classList.add('highlight');
		}
		 if(id == productTypeContainer) {
		  if (selectedProductType) {
		    selectedProductType.classList.remove('highlight');
		  }
		  selectedProductType = node;
		  selectedProductType.classList.add('highlight');
		}
		 if(id == colorFilterContainer) {
		  if (selectedColorFilter) {
		    selectedColorFilter.classList.remove('highlight');
		  }
		  selectedColorFilter = node;
		  selectedColorFilter.classList.add('highlight');
		}
		 if(id == brandContainer) {
		  if (selectedBrand) {
		    selectedBrand.classList.remove('highlight');
		  }
		  selectedBrand = node;
		  selectedBrand.classList.add('highlight');
		}
		 if(id == sizeFilterContainer) {
		  if (selectedSizeFilter) {
		    selectedSizeFilter.classList.remove('highlight');
		  }
		  selectedSizeFilter = node;
		  selectedSizeFilter.classList.add('highlight');
		}
		 if(id == priceFilterContainer) {
		  if (selectedPriceFilter) {
		    selectedPriceFilter.classList.remove('highlight');
		  }
		  selectedPriceFilter = node;
		  selectedPriceFilter.classList.add('highlight');
		}
	}
}
//end filter
//slider
var SliderFunction = function() {
	var controls = document.querySelectorAll('.buttons__controls');
		for(var i=0; i<controls.length; i++){
			controls[i].style.display = 'inline-block';
		}

	var slides = document.querySelectorAll('#slides .slider__item');
	var currentSlide = 0;
	var slideInterval = setInterval(nextSlide,10000);
	var dots = document.querySelectorAll("#dots a");
	var playing = true;

	 for (var i = 0; i < dots.length; ++i) {
		var dot = dots[i];
		dot.addEventListener("click", function (event) {
		    event.preventDefault();
	    	var activeDot = (parseInt(this.getAttribute("data-slide"), 10));
	    	goToSlide(activeDot);
	    	this.classList.add('current');
	    	clearInterval(slideInterval);
			slideInterval = setInterval(nextSlide,10000);
			pauseSlideshow();
	    });
	}
	 
	function pauseSlideshow(){
		clearInterval(slideInterval);
	}

	function playSlideshow(){
		playing = true;
		slideInterval = setInterval(nextSlide,10000);
	}

	function nextSlide(){
		goToSlide(currentSlide+1);
	}

	function previousSlide(){
		goToSlide(currentSlide-1);
	}

	function goToSlide(n){
		slides[currentSlide].className = 'slider__item';
		currentSlide = (n+slides.length)%slides.length;
		slides[currentSlide].className = 'slider__item showing';
		document.querySelector("#dots .current").classList.remove('current');
		for (var i = 0; i < dots.length; ++i) {
			var dot = dots[i];
			var activeDot = (parseInt(dot.getAttribute("data-slide"), 10));
			if (activeDot === currentSlide) {
				dot.classList.add('current');
			}	
		}
	}

	var next = document.getElementById('next');
	var previous = document.getElementById('previous');

	next.onclick = function(){
		clearInterval(slideInterval);
		//slideInterval = setInterval(nextSlide,10000);
		playSlideshow();
		nextSlide();
			
	};

	previous.onclick = function(){
		clearInterval(slideInterval);
		playSlideshow();
		//slideInterval = setInterval(nextSlide,10000);
		previousSlide();
	};
}
//end slider
//catalog

		function catalog(name, color, size, gender, img, price){
			this.name = name;
			this.color = color;
			this.size = size;
			this.gender = gender;
			this.img = img;
			this.price = price;
		}

		var catalog =  [
			{name: 'Straight Leg Jeans',
			color: ['blue','red'],
			size: [42, 48, 50, 52],
			gender: 'female',
			img: 'girl5',
			price: 55},
			{name: 'Boyfriend T-Shirt with Bohemian Print',
			color: ['blue','red'],
			size: [42, 48, 50, 52],
			gender: 'male',
			img: 'boy1',
			price: 34.25},
			{name: 'Only Busted Knee Jean',
			color: ['blue','red'],
			size: [42, 48, 50, 52],
			gender: 'female',
			img: 'girl6',
			price: 140.50},
			{name: 'Only Skinny Jeans',
			color: ['blue','red'],
			size: [42, 48, 50, 52],
			gender: 'female',
			img: 'girl7',
			price: 12.75}
			
		 ]
var CatalogFunction = function() {
		 catalogList = document.getElementById('catalog');
		 //console.log(catalog);

		 function add(about, el, className, key) {
			var about = document.createElement(el);
			about.className = className;              
			catalogList.appendChild(productItem).appendChild(productLink).appendChild(about).innerHTML = key;
		}
		var CreateCatalogListFunction = function() {

			function add(about, el, className, key) {
				var about = document.createElement(el);
				about.className = className;              
				catalogList.appendChild(productItem).appendChild(productLink).appendChild(about).innerHTML = key;
			}
			for (var i = 0; i < catalog.length; i++) {
				 //product item
				var productItem = document.createElement("li");
				productItem.className='product__item'; 
				var productLink = document.createElement("a");
				productLink.className='product__link'; 
				productLink.setAttribute("href", "./details.html"); 
				var productDivImg = document.createElement("div");
				productDivImg.className='product__img-inner'; 
				//img
				var productImg = document.createElement("img");
				productImg.className='product__img'; 
				productImg.setAttribute("src", "./img/" + catalog[i].img + '.png'); 
				productImg.setAttribute("width", "240");
				productImg.setAttribute("height", "340");              
				catalogList.appendChild(productItem).appendChild(productLink).appendChild(productDivImg).appendChild(productImg);
				//name
				add('productName', 'h4', 'product__name', catalog[i].name);
				//price
				add('productPrice', 'p', 'product__price', currency + '' +catalog[i].price);
			}
		}
		CreateCatalogListFunction();
	}
		//end catalog

//slider-preview
var SliderThumbsFunction = function() {
	var sliderStage = document.getElementById('sliderStage');
	var thumbs= document.getElementById('thumbs');
	var imgStage = document.getElementById('imgStage');
	var activeThumb = thumbs.getElementsByClassName('highlight')[0];
	var selectedThumbs;

	var SliderValue = function(id) { 
		id.onclick = function(event) {
			event.preventDefault();
		  var target = event.target;
		  var input = target.closest('a');
		  if (!input) return; 
		  if (!id.contains(input)) return;
		  var bigPath = input.getAttribute("href");
		  var bigAlt = input.getAttribute("title");
		  imgStage.setAttribute("src", bigPath);
		  imgStage.setAttribute("alt", bigAlt);
		  activeThumb.classList.remove('highlight');
		  highlightThumbs(input, id);
		} 
	}
	function highlightThumbs(node, id) {
		if(id == thumbs) {
		  if (selectedThumbs) {
		    selectedThumbs.classList.remove('highlight');
		  }
		  selectedThumbs = node;
		  selectedThumbs.classList.add('highlight');
		}
	}
	SliderValue(thumbs);
}
//end slider-preview
//basket
var BasketFunction = function() {
	//select size
	var sizeContainer = document.getElementById('size');
	var colorContainer = document.getElementById('color');
	var selectedSize;
	var selectedColor;
	var CheckValue = function(id) { 
		id.onclick = function(event) {
		  var target = event.target;
		  var input = target.closest('input');
		  if (!input) return; 
		  if (!id.contains(input)) return;

		  highlight(input, id);
		} 
	}
	CheckValue(sizeContainer);
	CheckValue(colorContainer);
	function highlight(node, id) {
		 if(id == sizeContainer) {
		  if (selectedSize) {
		    selectedSize.classList.remove('highlight');
		  }
		  selectedSize = node;
		  selectedSize.classList.add('highlight');
		}
		if(id == colorContainer) {
		  if (selectedColor) {
		    selectedColor.classList.remove('highlight');
		  }
		  selectedColor = node;
		  selectedColor.classList.add('highlight');
		}
	}
	//end select size
	var productDetails = document.getElementById('detailsInfo');
	function makeCounter() {
	  var currentCount = 1;
	  return function() {
	    return currentCount++
	  };

	};
	var addToBag = document.getElementById('addToBag');
	function getCartData(){
		  return JSON.parse(localStorage.getItem('cart'));
		}
		function setCartData(o){
		  localStorage.setItem('cart', JSON.stringify(o));
		  return false;
		}
	var clicker = function(e) {
		if(selectedSize==null) {
			alert('select size');
		}
		else if(selectedColor==null) {
			alert('select color');
		}
		else {
			this.disabled = true; 
			var value = this.counter();
			var product = detailsInfo.querySelector('.details-info__heading').innerHTML;
			var dataTitle = detailsInfo.querySelector('.details-info__heading').getAttribute("data-heading");
			var dataColor = selectedColor.getAttribute("data-color");
			var dataSize = selectedSize.getAttribute("data-size");
			var priceValue = detailsInfo.querySelector('#price').innerHTML;
			var productSize = selectedSize.getAttribute('value');
			var productColor = selectedColor.getAttribute('value');
			alert(' Вы добавили в корзину ' + product);
			var addInfo = product +  ', ' + currency + ' ' + priceValue + ' ' + productSize + ' ' + productColor;
			//localStorage.setItem(addInfo, value);
			var counter = document.querySelector('#sumProduct');
			var sumCurrent = document.querySelector('#sumPrice').innerHTML;
			//console.log(sumCurrent);
			//var sum = document.querySelector('#sumPrice').innerHTML = priceValue*1 + sumCurrent*1;
			//var counter = document.querySelector('#sumProduct').innerHTML = value;
			var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
		    itemId = dataTitle + '' + dataSize + '' + dataColor, // ID товара
		    itemTitle = product, 
		    itemColor = 'Color: ' + productColor, 
		    itemSize = 'Size: ' + productSize, 
		    itemPrice = currency + '' + priceValue;
		    itemQuantity = 1;
			if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
				cartData[itemId][4] += 1;
				} else { // если товара в корзине еще нет, то добавляем в объект
				cartData[itemId] = [itemTitle, itemPrice, itemColor, itemSize, 1];
			};
			if(!setCartData(cartData)){ // Обновляем данные в LocalStorage
				this.disabled = false; // разблокируем кнопку после обновления LS
			}
			CartDataValue();
		
		}
		
	};
	for (var i = 0; i < 1; i++) {
		clicks=0;
	  	addToBag.counter = makeCounter();
	  	addToBag.onclick = function(e) {
	  		e.preventDefault();
	    clicker.apply(this);
	    clicks++;
	    
	  };

	  
	}
}
var bagCount = document.getElementById('sumProduct');
var bagPrice = document.getElementById('sumPrice');

//end basket

//cart 
var CartFunction = function() {
cartCont = document.getElementById('cart_content'); 
function getCartData(){
      return JSON.parse(localStorage.getItem('cart'));
    }
    function setCartData(o){
      localStorage.setItem('cart', JSON.stringify(o));
      return false;
    }
var cartData = getCartData(),
      totalItems = '';
      //console.log(cartData);
//cart value

//end cart value

  if(Object.keys(cartData).length !== 0){
    totalItems = '<div class="shopping flex" id="cart-list">';
    for(var items in cartData){
      //var size = Object.keys(cartData).length;
      totalItems += '<div class="shopping__container flex" id="' + items + '"><div class="shoping__img"><a href="./details.html" class="product__link"><div class="product__img-inner"><img class="product__img" src="./img/boy1.png" width="240" height="340"></div></a></div><ul class="shopping__list">';
      for(var i = 0; i < cartData[items].length; i++){
         result = '<li class="shopping__item shopping__item-' + [i] + ' ">' + cartData[items][i] + '</li>';
         totalItems += result;
      }
      totalItems += '<li class="shopping__item"><a href="#" id="del-' + items + '" class="btn-del" data-id="' + items + '">Remove item</a></li></ul></div>';
    }
    totalItems += '</div>';
    cartCont.innerHTML = totalItems;
  } else {
    cartCont.innerHTML = 'Your shopping bag is empty!';
  }

 
	document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;

 //del cart
   var delCart = document.getElementById('btn_del');
  delCart.onclick = function(event) {
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Your shopping bag is empty. Use <a href="./catalog.html"><strong>Catalog</strong></a> to add new items';
    CartDataValue();
    document.querySelector('#sumPrice').innerHTML = '';
    document.querySelector('#sumProduct').innerHTML = '(0)';
    document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;
  }
  //buy 
   var buyCart = document.getElementById('btn_buy');
  	buyCart.onclick = function(event) {
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Thank you for your purchase';
    CartDataValue();
    document.querySelector('#sumPrice').innerHTML = '';
    document.querySelector('#sumProduct').innerHTML = '(0)';
    document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;
  }


  //del items
  var container = document.getElementById('cart-list');

    container.onclick = function(event) {
      event.preventDefault();
      if (!event.target.classList.contains('btn-del')) return;
      var itemId = event.target.getAttribute("data-id");
      var parentBlock = document.getElementById(itemId);
      var quantity = parentBlock.querySelector('.shopping__item-4').innerHTML;
      //console.log(quantity)
      var parentContainer = parentBlock.parentNode;
      if(quantity==1) {
        parentBlock.remove();
        var cartData = getCartData(); 
        delete cartData[itemId]; 
        setCartData(cartData);
      }
      else {
        var cartData = getCartData();
        cartData[itemId][4] = cartData[itemId][4]*1-1;
        setCartData(cartData);
        parentBlock.querySelector('.shopping__item-4').innerHTML = cartData[itemId][4]*1;
        parentBlock.querySelector('.shopping__item-4').setAttribute("data-id", cartData[itemId][4]);
      }
      if (parentContainer.childNodes.length < 1) {
           cartCont.innerHTML = 'Your shopping bag is empty. Use <a href="./catalog.html" class="btn-return"><strong>Catalog</strong></a> to add new items';
      }
      CartDataValue(); 
      document.getElementById('total').innerHTML = document.getElementById('sumPrice').innerHTML;   
    } 
}
//end cart