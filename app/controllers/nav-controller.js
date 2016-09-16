module.exports = (app) => {
  app.controller('NavController', function() {
    this.isCollasped = true;
    this.collapsedClass = this.isCollasped ? 'collapse': '';
    this.doSomething = function() {
      this.isCollasped = !this.isCollasped;
      this.collapsedClass = this.isCollasped ? 'collapse': '';
    };
  });
};
