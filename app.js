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
  }

  changeBasket() {
    this.basketType = this.basketType === "brown" ? "white" : "brown";
  }

  confirmGoody() {
    this.confirmed = true;
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
class Momento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
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

    // Calculate the total width and height of the goodie container
    const numGoodies = basket.goodyList.length;
    const numRows = Math.ceil(numGoodies / 6);
    const containerWidth = 600;
    const containerHeight = numRows * 150;

    const container = document.createElement("div");
    container.classList.add("container");

    basketElement.appendChild(container);
    basketElement.appendChild(basketImage);

    // Display the goodies inside the basket
    basket.goodyList.forEach((goody, index) => {
      const goodyImage = document.createElement("img");
      goodyImage.src = goodyImagePaths[goody];
      goodyImage.classList.add("goody-image");
      container.appendChild(goodyImage);
    });
  };

  updateBasketDisplay();

  confirmBtn.addEventListener("click", () => {
    basket.confirmGoody();
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
    basket.changeBasket();
    updateBasketDisplay();
  });

  whiteBasketBtn.addEventListener("click", () => {
    basket.changeBasket();
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
    // Implement undo functionality here.
  });
  redoBtn.addEventListener("click", () => {
    // Implement redo functionality here.
  });

  saveBtn.addEventListener("click", () => {
    // Implement save functionality here, possibly using AJAX to send data to the server.
  });
});
