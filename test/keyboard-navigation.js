/* global casper, keyboardNavigation */

exports.keyboardNavigationInit = function() {

  var config = {
    url: 'http://localhost:3000'
  };

  casper.test.begin('Testing keyboard navigation', 9, function suite(test) {
    test.info('⌚️ Loading ' + config.url + '…');

    casper.start(config.url, function() {
      test.assertType(keyboardNavigation, 'object', 'The keyboardNavigation object exists.');
      test.info('The function to navigate via keyboard exists. Hooray!');
    });

    casper.then(function() {
      test.assertDoesntExist('#js-navigation--next');
      test.info('The element #js-navigation--next shouldn’t exist because we’re on the homepage…');
    });

    casper.then(function() {
      test.assertExists('#js-navigation--previous');
      test.info('…while the element #js-navigation--previous should exist as it’s needed for our keyboardNavigation.navigationElement() function.');
    });

    casper.then(function() {
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading ' + config.url + '/page2/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page2', 'The URL matches /page2');
    });

    casper.then(function() {
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading ' + config.url + '/page3/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page3', 'The URL matches /page3');
    });

    casper.then(function() {
      this.sendKeys('body', casper.page.event.key.Right);
      test.info('⌚️ Loading ' + config.url + '/page2/…');
    });

    casper.then(function() {
      test.assertUrlMatch(config.url + '/page2', 'The URL matches /page2');
    });

    casper.then(function() {
      this.click('.entry-title a');
      test.info('⌚️ Clicking the first .entry-title anchor tag on /page2…');
    });

    casper.then(function() {
      test.assertExists('.page-post');
      test.info('The element .page-post exists, so we successfully navigated to a post.');
    });

    casper.then(function() {
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'INFO');
    });

    casper.then(function() {
      test.assertExists('#js-navigation--next');
      test.info('The element #js-navigation--next exists because there are newer posts to navigate to.');
    });

    casper.then(function() {
      this.sendKeys('body', casper.page.event.key.Right);
      test.info('⌚️ Loading the next post…');
    });

    casper.then(function() {
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'INFO');
    });

    casper.then(function() {
      test.assertExists('#js-navigation--previous');
      test.info('The element #js-navigation--previous exists because there are older posts to navigate to.');
    });

    casper.then(function() {
      this.sendKeys('body', casper.page.event.key.Left);
      test.info('⌚️ Loading the previous post…');
    });

    casper.then(function() {
      this.echo('The post title is: ' + this.evaluate(function() {
        return document.title;
      }), 'INFO');
    });

    casper.run(function() {
      test.done();
    });
  });
};
