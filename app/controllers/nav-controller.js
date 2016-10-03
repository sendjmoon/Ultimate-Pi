module.exports = (app) => {
  app.controller('NavController', function() {
    this.isCollasped = true;
    //I would make this a function, would help make this more maintainable
    this.collapsedClass = this.isCollasped ? 'collapse': '';
    this.doSomething = function() {
      this.isCollasped = !this.isCollasped;
      this.collapsedClass = this.isCollasped ? 'collapse': '';
    };
  });
};
