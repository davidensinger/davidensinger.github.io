/* global casper, keyboardNavigation */

exports.keyboardNavigationInit = function() {

  var config = {
    url: 'http://localhost:3000'
  };

  casper.test.begin('Testing keyboard navigation', 12, function suite(test) {
    test.info('⌚️ Loading ' + config.url + '…');

    casper.start(config.url, function() {
      test.assertType(keyboardNavigation, 'object', 'The keyboardNavigation object exists. Hooray!');
      test.assertDoesntExist('#js-navigation--next', 'The element #js-navigation--next doesn’t exist because we’re on the homepage, which is the foremost page in the site pagination…');
      test.assertExists('#js-navigation--previous', 'The element #js-navigation--previous does exist as it’s needed for our keyboardNavigation.navigationElement() function.');
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading ' + config.url + '/page2/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page2', 'The URL matches /page2');
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading ' + config.url + '/page3/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page3', 'The URL matches /page3');
      this.sendKeys('body', casper.page.event.key.Right);
      test.info('⌚️ Loading ' + config.url + '/page2/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page2', 'The URL matches /page2');
      this.click('.entry-title a');
      test.info('⌚️ Clicking the first .entry-title anchor tag on /page2…');
    });

    casper.then(function() {
      test.assertExists('.page-post', 'The element .page-post exists, so we successfully navigated to a post.');
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'PARAMETER');
      test.assertExists('#js-navigation--next', 'The element #js-navigation--next exists because there are newer posts to navigate to.');
      this.sendKeys('body', casper.page.event.key.Right);
      test.info('⌚️ Loading the next post…');
    });

    casper.then(function() {
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'PARAMETER');
      test.assertExists('#js-navigation--previous', 'The element #js-navigation--previous exists because there are older posts to navigate to.');
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading the previous post…');
    });

    casper.then(function() {
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'PARAMETER');
      this.open(config.url + '/about/');
      test.info('⌚️ Loading the About page…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/about', 'The URL matches /about');
      test.assertDoesntExist('#js-navigation--next', 'The element #js-navigation--next doesn’t exist because we’re on a page template');
      test.assertDoesntExist('#js-navigation--previous', 'The element #js-navigation--previous doesn’t exist because we’re on a page template');
    });

    casper.run(function() {
      test.done();
    });
  });
};
