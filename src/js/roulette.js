const roulette = (() => {
  const doc = document;

  const makeList = () => {
    const list = doc.createElement("ul");
    list.classList.add("roulette__wheel");
    let semaphor = false,
      suite = 2;
    while (suite--) {
      for (var nr = 0; nr <= 100; ++nr) {
        let item = doc.createElement("li");
        item.textContent = nr;
        item.setAttribute("data-roulette-nr", nr);
        if (0 == nr) {
          item.setAttribute("data-roulette-zero", "true");
        } else {
          item.setAttribute("data-roulette-color", semaphor ? "red" : "black");
        }
        list.appendChild(item);
        semaphor = !semaphor;
      }
    }

    return list;
  };

  const makeWrap = () => {
    const wrap = doc.createElement("div");
    wrap.classList.add("roulette__wrap");
    return wrap;
  };

  class Roulette {
    constructor(container) {
      this.container = container;
      const wrap = makeWrap();
      this.wrap = wrap;
      const list = makeList();
      this.list = list;
      container.appendChild(wrap);
      wrap.appendChild(list);
      this.itemsCount = this.list.children.length;
      this.itemWidth = parseInt(
        window.getComputedStyle(list.firstElementChild).width,
        10
      );
      this.spinning = false;
    }

    stop() {
      this.spinning = false;
    }

    slowdown() {
      console.log("!!!");
      // const itemNr = Math.random() * this.itemsCount / 2;
      // console.log("item:", itemNr);
      // const target = Math.floor(itemNr) * this.itemsWidth;
      // this.ip = ip
      //   .create(0, -target, {
      //     duration: 10000,
      //     easing: v => v,
      //     update: value => {
      //       this.list.style.marginLeft = `${value}px`;
      //     },
      //     end: () => {
      //       console.log("DONE");
      //     }
      //   })
      //   .start();
    }

    spin() {
      this.spinning = true;
      const whole = this.itemsCount * this.itemWidth,
        half = whole / 2;
      this.ip = ip
        .create(0, -half, {
          duration: 10000,
          easing: v => v,
          update: value => {
            this.list.style.marginLeft = `${value}px`;
          },
          end: () => {
            const first = Array.from(this.list.children).splice(
              0,
              this.list.children.length / 2
            );
            first.forEach(item => this.list.appendChild(item));
            this.list.style.marginLeft = 0;
            if (this.spinning) {
              this.spin();
            } else {
              console.log("slow down mf!");
              const itemNr = Math.floor(Math.random() * this.itemsCount / 2);
              const x = this.list.children[itemNr].getAttribute(
                "data-roulette-nr"
              );
              const target = itemNr * this.itemWidth - 1.5 * this.itemWidth;
              console.log("item:", x);
              ip
                .create(0, -target, {
                  duration: 10000,
                  update: value => {
                    this.list.style.marginLeft = `${value}px`;
                  },
                  end: () => {
                    console.log("DONE");
                  }
                })
                .start();
              console.log("well?");
            }
          }
        })
        .start();
    }

    slowdown() {}
  }

  return container => {
    console.log("in ", container);
    return new Roulette(container);
  };
})();
