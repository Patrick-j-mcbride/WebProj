const goodyImagePaths = {
  blueEgg: "images/blue_egg.png",
  stripedEgg: "images/stripe_egg.png",
  chocolateBunny: "images/chocolate_bunny.png",
  whiteEgg: "images/white_egg.png",
};

const basketImagePaths = {
  brown: "images/brown_basket.png",
  white: "images/white_basket.png",
};

class Basket {
  constructor() {
    this.goodyList = ["whiteEgg"];
    this.basketType = "brown";
    this.confirmed = false;
  }

  addGoody(goody) {
    if (this.confirmed) {
      this.goodyList.push(goody);
      this.confirmed = false;
    }
  }

  changeGoody(goody) {
    if (!this.confirmed) {
      this.goodyList.pop();
      this.goodyList.push(goody);
      this.confirmed = false;
    }
  }

  removeGoody() {
    this.goodyList.pop();
    if (this.goodyList.length === 0) {
      this.confirmed = false;
    } else {
      this.confirmed = true;
    }
  }

  changeBasket(basketType) {
    this.basketType = basketType;
  }

  confirmGoody() {
    this.confirmed = true;
  }

  save() {
    return new Memento(this);
  }

  restore(memento) {
    this.goodyList = memento.getGoodyList();
    this.basketType = memento.getBasketType();
    this.confirmed = memento.getConfirmed();
    console.log(this);
  }

  applyPreconfig(option) {
    switch (option) {
      case "base":
        this.basketType = "brown";
        this.goodyList = [];
        this.confirmed = true;
        break;
      case "allEggs":
        this.basketType = "brown";
        this.goodyList = [
          "blueEgg",
          "blueEgg",
          "blueEgg",
          "blueEgg",
          "blueEgg",
          "blueEgg",
          "whiteEgg",
        ];
        this.confirmed = true;
        break;
      case "mixed":
        this.basketType = "white";
        this.goodyList = [
          "stripedEgg",
          "blueEgg",
          "stripedEgg",
          "blueEgg",
          "stripedEgg",
          "blueEgg",
          "chocolateBunny",
          "chocolateBunny",
          "chocolateBunny",
          "whiteEgg",
        ];
        this.confirmed = true;
        break;
      default:
        console.error("Invalid preconfig option");
        return;
    }
  }
}
// GRADING: COMMAND
class Memento {
  constructor(state) {
    this.goodyList = state.goodyList.slice();
    this.basketType = state.basketType;
    this.confirmed = state.confirmed;
  }
  getGoodyList() {
    return this.goodyList;
  }
  getBasketType() {
    return this.basketType;
  }
  getConfirmed() {
    return this.confirmed;
  }
}

// GRADING: MANAGE
class HistoryManager {
  constructor() {
    this.mementos = [];
    this.currentPosition = -1;
  }
  // Add a new Memento object to the stack
  saveState(originator) {
    const memento = originator.save();
    this.mementos.push(memento);
    this.currentPosition++;
  }

  // Restore the state from the Memento object at the current position
  restoreState(originator) {
    if (this.currentPosition >= 0) {
      const memento = this.mementos[this.currentPosition];
      console.log(memento);
      originator.restore(memento);
      this.currentPosition--;
    }
  }

  // Redo the state changes by restoring the Memento object at the next position
  redoState(originator) {
    if (this.currentPosition < this.mementos.length - 1) {
      const memento = this.mementos[this.currentPosition + 1];
      originator.restore(memento);
      this.currentPosition++;
    }
  }
}
const historyManager = new HistoryManager();
const basket = new Basket();

document.addEventListener("DOMContentLoaded", () => {
  const goodySelect = document.getElementById("goodySelect");
  const confirmBtn = document.getElementById("confirm");
  const deleteBtn = document.getElementById("delete");
  const addBtn = document.getElementById("add");
  const brownBasketBtn = document.getElementById("brownBasket");
  const whiteBasketBtn = document.getElementById("whiteBasket");
  const preconfigBaseBtn = document.getElementById("base");
  const preconfigAllEggsBtn = document.getElementById("allEggs");
  const preconfigMixedBtn = document.getElementById("mixed");
  const undoBtn = document.getElementById("undo");
  const redoBtn = document.getElementById("redo");
  const saveBtn = document.getElementById("save");
  const basketElement = document.getElementById("basket");

  const updateBasketDisplay = () => {
    // Clear the current content of the basket element
    basketElement.innerHTML = "";

    // Set the basket image based on the basketType
    const basketImage = document.createElement("img");
    basketImage.src = basketImagePaths[basket.basketType];
    basketImage.classList.add("basket-image");

    const container = document.createElement("div");
    container.classList.add("container");

    basketElement.appendChild(container);
    basketElement.appendChild(basketImage);

    // Display the goodies inside the basket
    basket.goodyList.forEach((goody) => {
      const goodyImage = document.createElement("img");
      goodyImage.src = goodyImagePaths[goody];
      goodyImage.classList.add("goody-image");
      container.appendChild(goodyImage);
    });
  };

  updateBasketDisplay();

  confirmBtn.addEventListener("click", () => {
    basket.confirmGoody();
    historyManager.saveState(basket);
    console.log(historyManager.mementos);
    updateBasketDisplay();
  });

  deleteBtn.addEventListener("click", () => {
    basket.removeGoody();
    updateBasketDisplay();
  });

  addBtn.addEventListener("click", () => {
    const selectedGoody = goodySelect.value;
    basket.addGoody(selectedGoody);
    updateBasketDisplay();
  });

  goodySelect.addEventListener("click", () => {
    const selectedGoody = goodySelect.value;
    basket.changeGoody(selectedGoody);
    updateBasketDisplay();
  });

  brownBasketBtn.addEventListener("click", () => {
    basket.changeBasket("brown");
    updateBasketDisplay();
  });

  whiteBasketBtn.addEventListener("click", () => {
    basket.changeBasket("white");
    updateBasketDisplay();
  });

  preconfigBaseBtn.addEventListener("click", () => {
    basket.applyPreconfig("base");
    updateBasketDisplay();
  });

  preconfigAllEggsBtn.addEventListener("click", () => {
    basket.applyPreconfig("allEggs");
    updateBasketDisplay();
  });
  preconfigMixedBtn.addEventListener("click", () => {
    basket.applyPreconfig("mixed");
    updateBasketDisplay();
  });

  undoBtn.addEventListener("click", () => {
    historyManager.restoreState(basket);
    updateBasketDisplay();
  });
  redoBtn.addEventListener("click", () => {
    historyManager.redoState(basket);
    updateBasketDisplay();
  });

  saveBtn.addEventListener("click", () => {
    // Implement save functionality here, possibly using AJAX to send data to the server.
  });
});
