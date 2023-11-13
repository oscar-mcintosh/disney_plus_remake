const displayBackgroundImage2 = (selector4, backgroundPath, bgPosition) => {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize= 'cover';
    overlayDiv.style.backgroundPosition= bgPosition;
    overlayDiv.style.backgroundRepeat= 'no-repeat';
    overlayDiv.style.height= '100%';
    overlayDiv.style.width= '100%';
    overlayDiv.style.position= 'absolute';
    overlayDiv.style.top= '0';
    overlayDiv.style.left= '0';
    overlayDiv.style.zIndex= '-1';
    overlayDiv.style.opacity= '1';
    document.querySelector(selector4).appendChild(overlayDiv);

    // if (type === 'movie') {
    //     document.querySelector(selector4).appendChild(overlayDiv);
    // }else {
    //     document.querySelector('#show-details').appendChild(overlayDiv);
    // }
}

export { displayBackgroundImage2}