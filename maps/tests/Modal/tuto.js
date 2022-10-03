console.info('In ten seconds, the tuto modal will be launched')

function launchTuto(){
    console.info('Lunch tuto');
    WA.ui.modal.openModal({
        src: 'http://extra.workadventure.localhost/tutorialv1.html',
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
    });
}

setTimeout(() => {
    launchTuto();
}, 2000)
