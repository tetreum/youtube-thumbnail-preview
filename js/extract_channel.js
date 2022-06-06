// force thumbnails to load
window.scroll({
    top: 1000,
    behavior: 'smooth'
});

const channel = {
    name: document.querySelector('[id="channel-name"]').innerText,
    subscribers: document.querySelector('[id="subscriber-count"]').innerText,
    avatar: document.querySelector('#channel-header-container [id="img"]').src,
    videos: [],
};

let banner = getComputedStyle(document.getElementById('backgroundFrontLayer')).backgroundImage;
banner = banner.replace('url("', "");
banner = banner.replace('")', "");

channel.banner = banner;

document.querySelectorAll('ytd-grid-video-renderer').forEach(el => {
    let metadata = el.querySelectorAll('[id="metadata-line"] span');
    const video = {
        title: el.querySelector('[id="video-title"]').innerText,
        thumbnail: el.querySelector('[id="img"]').src,
        duration: el.querySelector('[id="text"]').innerText.replace(/(\r\n|\n|\r)/gm, ""),
        views: metadata[0].innerText,
        date: metadata[1].innerText,
    };

    if (video.thumbnail.length < 1) {
        return;
    }

    channel.videos.push(video);
});

console.log(JSON.stringify(channel));