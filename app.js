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
      historyManager.saveState(basket);
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
    historyManager.saveState(basket);
  }

  changeBasket(basketType) {
    this.basketType = basketType;
    historyManager.saveState(basket);
  }

  confirmGoody(selectedGoody) {
    if (!this.confirmed) {
      this.goodyList.push(selectedGoody);
      historyManager.saveState(basket);
    }
  }

  save() {
    return new Memento(this);
  }

  saveToFile() {
    if (!this.confirmed) {
      this.goodyList.pop();
      this.confirmed = true;
    }
    const memento = new Memento(this);
    return JSON.stringify(memento);
  }

  loadFromFile(serializedMemento) {
    const deserializedMemento = JSON.parse(serializedMemento);
    const memento = new Memento(deserializedMemento);
    this.restore(memento);
  }

  restore(memento) {
    this.goodyList = memento.getGoodyList();
    this.basketType = memento.getBasketType();
    this.confirmed = memento.getConfirmed();
  }

  applyPreconfig(option) {
    switch (option) {
      case "base":
        this.basketType = "brown";
        this.goodyList = [];
        this.confirmed = true;
        historyManager.saveState(basket);
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
        historyManager.saveState(basket);
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
        historyManager.saveState(basket);
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
    // GRADING: ACTION
    const memento = originator.save();
    this.mementos.push(memento);
    this.currentPosition++;
  }

  // Restore the state from the Memento object at the current position
  restoreState(originator) {
    if (this.currentPosition > 0) {
      const memento = this.mementos[this.currentPosition - 1];
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
  const fileName = document.getElementById("fileName");

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

  const params = new URLSearchParams(window.location.search);
  const fileUrl = params.get("load");

  if (fileUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "uploads/" + fileUrl);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const serializedMemento = xhr.responseText;
        basket.loadFromFile(serializedMemento);
        updateBasketDisplay();
      }
    };

    xhr.send();
  }

  updateBasketDisplay();
  historyManager.saveState(basket);

  confirmBtn.addEventListener("click", () => {
    basket.confirmGoody("whiteEgg");
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
    const fileSaveName = fileName.value + ".json";
    const xhr = new XMLHttpRequest();

    const params =
      "data=" +
      encodeURIComponent(basket.saveToFile()) +
      "&fileName=" +
      encodeURIComponent(fileSaveName);

    xhr.open("GET", "fileManager.php?" + params);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };

    xhr.send();
  });
});
