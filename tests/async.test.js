// asyncFunctions.test.js

const { fetchDataWithCallback } = require('../asyncFunction');

 

test("fetchDataWithCallback returns data", (done) => {

  function callback(data) {

    try {

      expect(data).toBe("data received");

      done(); // Call done to indicate the test is complete

    } catch (error) {

      done(error); // Passing an error to done will fail the test

    }

  }

 

  fetchDataWithCallback(callback);

})