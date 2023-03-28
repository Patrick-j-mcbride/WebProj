class Basket {
    constructor() {
      this.goodyList = [];
      this.basketType = 'brown';
    }
  
    addGoody(goody) {
      this.goodyList.push(goody);
    }
  
    removeGoody() {
      this.goodyList.pop();
    }
  
    changeBasket() {
      this.basketType = this.basketType === 'brown' ? 'white' : 'brown';
    }
  
    applyPreconfig(config) {
      // Implement preconfig logic here.
    }
  }

  const goodyImagePaths = {
    'blueEgg': 'images/blue_egg.png',
    'stripedEgg': 'images/striped_egg.png',
    'chocolateBunny': 'images/chocolate_bunny.png',
    'whiteEgg': 'images/white_egg.png'
  };

  
  const basket = new Basket();

  document.addEventListener('DOMContentLoaded', () => {
    const goodySelect = document.getElementById('goodySelect');

    const confirmBtn = document.getElementById('confirm');
    const deleteBtn = document.getElementById('delete');
    const addBtn = document.getElementById('add');

    const changeBasketBtn = document.getElementById('changeBasket');

    const preconfigBaseBtn = document.getElementById('base');
    const preconfigAllEggsBtn = document.getElementById('allEggs');
    const preconfigMixedBtn = document.getElementById('mixed');

    const undoBtn = document.getElementById('undo');
    const redoBtn = document.getElementById('redo');
    const saveBtn = document.getElementById('save');

    const basketElement = document.getElementById('basket');
    const updateBasketDisplay = () => {
      // Clear the current content of the basket element
      basketElement.innerHTML = '';
    
      // Set the basket image based on the basketType
      const basketImage = document.createElement('img');
      basketImage.src = `images/${basket.basketType}_basket.png`;
      basketImage.classList.add('basket-image');
    
      // Calculate the maximum number of goodies per row
      const maxGoodiesPerRow = 6;
    
      // Calculate the width and height of a goody image
      const goodyWidth = 100;
      const goodyHeight = 150;
    
      // Calculate the total width and height of the goodie container
      const numGoodies = basket.goodyList.length;
      const numRows = Math.ceil(numGoodies / maxGoodiesPerRow);
      const containerWidth = maxGoodiesPerRow * goodyWidth;
      const containerHeight = numRows * goodyHeight;
    
      // Set the styles of the goodie container to center it above the basket
      const containerLeft = Math.floor((basketElement.offsetWidth - containerWidth) / 2);
      const containerBottom = basketImage.offsetHeight + 10; // Change 10 to the desired spacing between the basket and the goodie container
      const containerStyle = `position: relative; left: ${containerLeft}px; bottom: ${containerBottom}px; width: ${containerWidth}px; height: ${containerHeight}px; display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end;`;
      const container = document.createElement('div');
      container.setAttribute('style', containerStyle);
      basketElement.appendChild(container);
      basketElement.appendChild(basketImage);
    
      // Display the goodies inside the basket
      basket.goodyList.forEach((goody, index) => {
        const goodyImage = document.createElement('img');
        goodyImage.src = goodyImagePaths[goody];
        goodyImage.classList.add('goody-image');
        const row = Math.floor(index / maxGoodiesPerRow);
        const col = index % maxGoodiesPerRow;
        const x = col * goodyWidth;
        const y = (numRows - 1 - row) * goodyHeight; // calculate the y position from the bottom of the container
        goodyImage.style.left = x + 'px';
        goodyImage.style.bottom = y + 'px';
        container.appendChild(goodyImage);
      });
    };
    
    
    updateBasketDisplay();
        
    confirmBtn.addEventListener('click', () => {
        const selectedGoody = goodySelect.value;
        basket.addGoody(selectedGoody);
        updateBasketDisplay();
    });
        
    deleteBtn.addEventListener('click', () => {
        basket.removeGoody();
        updateBasketDisplay();
    });
    addBtn.addEventListener('click', () => {
      const selectedGoody = goodySelect.value;
      basket.addGoody(selectedGoody);
      updateBasketDisplay();
    });
    changeBasketBtn.addEventListener('click', () => {
        basket.changeBasket();
        updateBasketDisplay();
    });
            
    preconfigBaseBtn.addEventListener('click', () => {
        basket.applyPreconfig('base');
        updateBasketDisplay();
    });
            
    preconfigAllEggsBtn.addEventListener('click', () => {
        basket.applyPreconfig('allEggs');
        updateBasketDisplay();
    });
    preconfigMixedBtn.addEventListener('click', () => {
        basket.applyPreconfig('mixed');
        updateBasketDisplay();
    });
                
    undoBtn.addEventListener('click', () => {
        // Implement undo functionality here.
    });
    redoBtn.addEventListener('click', () => {
        // Implement redo functionality here.
    });
                    
    saveBtn.addEventListener('click', () => {
        // Implement save functionality here, possibly using AJAX to send data to the server.
    });         
});
            