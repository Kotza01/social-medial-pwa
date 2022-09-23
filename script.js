if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Registro exitoso', res))
        .catch(err => console.warn('Error: ', err))
}