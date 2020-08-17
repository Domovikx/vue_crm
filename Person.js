class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
    return this.name;
  }
}

const vasya = new Person('Vasya');
vasya.getName();
