import $ from 'jQuery';

/**
 * Finds the position of the bottom end of $element relative to the screen.
 * @param {jQuery} $window - the window element so we can find the scroll position
 * @param {jQuery} $element - the element of interest
 * @return number
 */
function getBottom($window, $element) {
  const top = $element.offset().top - $window.scrollTop();
  const height = $element.outerHeight();
  return top + height;
}

// Once the DOM structure has been loaded
$(function() {
  // Grab the window jQuery element
  const $window = $(window);

  // For each bottom bar
  $('.js-bottom-bar').each(function() {
    // Grab the jQuery element
    const $bottomBar = $(this);

    // Get the element whose disappearance above the viewport will trigger the bottom bar
    const $reference = $($bottomBar.data('bottom-bar-reference'));

    // Store the state of the bottom bar in the variable so we don't waste resources checking it in the DOM
    let isVisible = false;

    // Check if the bottom bar should be visible every x milliseconds
    setInterval(function() {
      // If the reference element is above the screen
      if (getBottom($window, $reference) < 0) {
        // And the bottom bar is not yet shown
        if (!isVisible) {
          // Show the bottom bar
          $bottomBar.addClass('bottom-bar--visible');

          // Remember it's visible
          isVisible = true;
        }
        // If the reference element is within the screen or below, and the bottom bar is visible
      } else if (isVisible) {
        // Hide the bottom bar
        $bottomBar.removeClass('bottom-bar--visible');

        // Remember it's hidden
        isVisible = false;
      }
    }, 500);
  });
});
