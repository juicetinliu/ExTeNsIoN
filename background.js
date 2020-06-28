'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({yesno: 1}, function() {
    });
});

function updateIcon() {
    chrome.storage.sync.get('yesno', function(data) {
        var current = data.yesno;
        current++;
        if (current > 2) current = 1;
        chrome.browserAction.setIcon({path: 'IcOn' + current + '.png'});
        chrome.storage.sync.set({yesno: current}, function() {
        });
    });
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();