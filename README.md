# testing-react-applications-101

This is repository for saving demo code for my [Testing React Applications - 101](https://www.meetup.com/meetup-group-zZPQtwTs/events/254549168/) talk at Chennai.JS React Meetup, September 22, 2018.

## Topics to be covered:

1. Introduction to Jest
2. Introduction to Enzyme
3. Installing Enzyme
4. Test Rendering without errors
4. Test Initial State
5. Test Button Click
6. What to do next?
    * Testing Redux props
    * Mocking ajax calls
    * Testing Redux Thunk actions
    * Testing forms

## Commands
```
npm run test
```

## Code for reference
```
test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)
});

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1)
});

describe('Increment', () => {
  // now we have enough tests to organize by function
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  });
  test('clicking increment button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  });
});

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });
  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });
  // make sure error doesn't show by default
  test('error does not show when not needed', () => {
    // I plan to implement this by using a "hidden" class for the error div
    // I plan to use the data-test value 'error-message' for the error div
    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, 'error-message');

    // using enzyme's ".hasClass()" method
    // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });
  describe('counter is 0 and decrement is clicked', () => {
    // using a describe here so I can use a "beforeEach" for shared setup

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper
    beforeEach(() => {
      // no need to set counter value here; default value of 0 is good
      wrapper = setup();

      // find button and click
      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
      wrapper.update();
    });
    test('error shows', () => {
      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(false);
    });
    test('counter still displays 0', () => {
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(0);
    });
    test('clicking increment clears the error', () => {
      // find and click the increment button
      const button = findByTestAttr(wrapper, 'increment-button');
      button.simulate('click');

      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(true);
    });
  });
});
```