// Reference to the output paragraph, mouse event area, form, input field, image, text area, audio, and audio link
const output = document.getElementById('output');
const mouseArea = document.getElementById('mouseArea');
const form = document.getElementById('form');
const inputField = document.getElementById('name');
const image = document.getElementById('image');
const textBox = document.getElementById('textBox');
const audio = document.getElementById('audio');
const audioLink = document.getElementById('audioLink');
const audioProgress = document.getElementById('audioProgress');

// Utility function to log events
function logEvent(eventType, detail = '') {
  output.textContent = `Event triggered: ${eventType} ${detail}`;
}

// Mouse Event Listeners
mouseArea.addEventListener('click', () => logEvent('click'));
mouseArea.addEventListener('dblclick', () => logEvent('dblclick'));
mouseArea.addEventListener('mousedown', () => logEvent('mousedown'));
mouseArea.addEventListener('mouseup', () => logEvent('mouseup'));
mouseArea.addEventListener('mouseover', () => logEvent('mouseover'));
mouseArea.addEventListener('mouseout', () => logEvent('mouseout'));
mouseArea.addEventListener('mousemove', () => logEvent('mousemove'));
mouseArea.addEventListener('mouseenter', () => logEvent('mouseenter'));
mouseArea.addEventListener('mouseleave', () => logEvent('mouseleave'));

// Form Event Listener
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission for demo purposes
  logEvent('form submit');
  // Trigger blur event on the input field
  inputField.blur();
  // Apply the blur effect to the image
  image.classList.add('blur');
});

// Input Field Event Listeners
inputField.addEventListener('focus', () => logEvent('input focus'));
inputField.addEventListener('blur', () => {
  logEvent('input blur');
  // Apply the blur effect to the image
  image.classList.add('blur');
});
inputField.addEventListener('input', () => logEvent('input change', ` - Value: ${inputField.value}`));

// Clipboard Event Listeners
textBox.addEventListener('copy', (event) => {
  logEvent('copy', ` - Data: ${event.clipboardData.getData('text/plain')}`);
});
textBox.addEventListener('cut', (event) => {
  logEvent('cut', ` - Data: ${event.clipboardData.getData('text/plain')}`);
});
textBox.addEventListener('paste', (event) => {
  logEvent('paste', ` - Data: ${event.clipboardData.getData('text/plain')}`);
});

// Audio Link Click Event Listener
audioLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link action
  if (audio.paused) {
    audio.play(); // Play the audio if it's paused
  } else {
    audio.pause(); // Pause the audio if it's playing
  }
});

// Audio Event Listeners (Simplified)
audio.addEventListener('play', () => logEvent('audio play'));
audio.addEventListener('pause', () => logEvent('audio pause'));
audio.addEventListener('volumechange', () => logEvent('audio volume change', ` - Volume: ${audio.volume}`));
audio.addEventListener('ended', () => logEvent('audio ended'));

// Progress Bar Visibility
// Note: No event listeners for the progress bar, just showing it

// Simplified Window Resize Event Listener
window.addEventListener('resize', () => {
  logEvent('window resize', ` - Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
});

// Other Window Event Listeners
window.addEventListener('scroll', () => logEvent('window scroll', ` - Scroll Top: ${window.scrollY}`));
window.addEventListener('load', () => logEvent('window load'));
window.addEventListener('focus', () => logEvent('window focus'));
