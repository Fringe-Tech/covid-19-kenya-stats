// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log("[PWA Builder] active service worker found, no need to register");
    } else {
        // Register the service worker
        navigator.serviceWorker
            .register("sw.js", {
                scope: "./"
            })
            .then(function (reg) {
                console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
            });
    }
}
// For Add To Home Screen (A2HS) button
// Chrome Only for now
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'block';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

// Display Message at top of homepage when offline
window.addEventListener('online', function (e) {
    // We could use this event to Resync data with server.
    console.log("You are online");
    hideOfflineWarning();
}, false);

window.addEventListener('offline', function (e) {
    // We could use this event to Queue up events for server.
    console.log("You are offline");
    showOfflineWarning()
}, false);

// Check if the user is connected.
if (navigator.onLine) {
    hideOfflineWarning();
} else {
    // Show offline message
    showOfflineWarning();
}

function showOfflineWarning() {
    document.querySelector('.offline-notification').classList.add('show');
}

function hideOfflineWarning() {
    document.querySelector('.offline-notification').classList.remove('show');
}