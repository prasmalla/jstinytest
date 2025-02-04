/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
const TinyTestHelper = {
  renderStats: function(tests, failures) {
    let numberOfTests = Object.keys(tests).length;
    let passes = numberOfTests - failures;
    let results = `Ran ${numberOfTests} tests with ${passes} passes and ${failures} failures.`

    let summary = document.createElement('h1');
    summary.textContent = results;
    document.body.appendChild(summary);
  }
}

const TinyTest = {

    run: function(tests) {
        let failures = 0;
        for (let testName in tests) {
            let testAction = tests[testName];
            try {
                testAction();
                console.log('%c' + testName, 'color: green');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, 'color: red');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures === 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

const fail                = TinyTest.fail,
      assert              = TinyTest.assert,
      assertEquals        = TinyTest.assertEquals,
      eq                  = TinyTest.assertStrictEquals, // alias for assertStrictEquals
      assertStrictEquals  = TinyTest.assertStrictEquals,
      tests               = TinyTest.run;
