/* ============================================
   TUTORIALS PAGE SCRIPT
   ============================================ */

const tutorialVideos = [
    {
        id: 'video-1',
        url: 'https://www.youtube.com/watch?v=McmMluu0if0',
        title: '影片 1：入門示範',
        category: '入門'
    },
    {
        id: 'video-2',
        url: 'https://www.youtube.com/watch?v=-7T9PWKeUBc',
        title: '影片 2：進階示範',
        category: '進階'
    },
    {
        id: 'video-3',
        url: 'https://www.youtube.com/watch?v=dcQI57TP5Pc',
        title: '影片 3：案例示範',
        category: '案例'
    }
];

const tutorialState = {
    selectedCategory: '全部',
    selectedVideoId: tutorialVideos[0] ? tutorialVideos[0].id : null
};

function extractVideoId(url) {
    const urlObj = new URL(url);
    const shortId = urlObj.hostname.includes('youtu.be')
        ? urlObj.pathname.replace('/', '')
        : null;

    if (shortId) {
        return shortId;
    }

    return urlObj.searchParams.get('v');
}

function getEmbedUrl(videoUrl) {
    const videoId = extractVideoId(videoUrl);
    return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : '';
}

function getCategories() {
    const uniqueCategories = new Set(tutorialVideos.map((video) => video.category));
    return ['全部', ...uniqueCategories];
}

function getFilteredVideos() {
    if (tutorialState.selectedCategory === '全部') {
        return tutorialVideos;
    }

    return tutorialVideos.filter((video) => video.category === tutorialState.selectedCategory);
}

function ensureSelectedVideo(filteredVideos) {
    const exists = filteredVideos.some((video) => video.id === tutorialState.selectedVideoId);

    if (!exists) {
        tutorialState.selectedVideoId = filteredVideos[0] ? filteredVideos[0].id : null;
    }
}

function renderCategoryChips() {
    const chipsContainer = document.getElementById('tutorialCategoryChips');
    const categories = getCategories();

    chipsContainer.innerHTML = categories
        .map((category) => {
            const isActive = category === tutorialState.selectedCategory;
            return `
                <button
                    type="button"
                    class="category-chip${isActive ? ' active' : ''}"
                    data-category="${category}">
                    ${category}
                </button>
            `;
        })
        .join('');

    chipsContainer.querySelectorAll('.category-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            tutorialState.selectedCategory = chip.dataset.category;
            renderTutorialsPage();
        });
    });
}

function renderFeaturedVideo(currentVideo) {
    const frameElement = document.getElementById('featuredVideoFrame');
    const titleElement = document.getElementById('featuredVideoTitle');
    const categoryElement = document.getElementById('featuredVideoCategory');
    const linkElement = document.getElementById('featuredVideoLink');

    if (!currentVideo) {
        frameElement.src = '';
        titleElement.textContent = '目前此分類尚無影片';
        categoryElement.textContent = '請切換其他分類';
        linkElement.style.display = 'none';
        return;
    }

    frameElement.src = getEmbedUrl(currentVideo.url);
    titleElement.textContent = currentVideo.title;
    categoryElement.textContent = currentVideo.category;
    linkElement.href = currentVideo.url;
    linkElement.style.display = 'inline-flex';
}

function renderVideoList(filteredVideos) {
    const listElement = document.getElementById('tutorialVideoList');

    if (filteredVideos.length === 0) {
        listElement.innerHTML = `
            <div class="video-list-empty">
                <i class="fas fa-video-slash"></i>
                <p>此分類尚未加入影片</p>
            </div>
        `;
        return;
    }

    listElement.innerHTML = filteredVideos
        .map((video, index) => {
            const isActive = video.id === tutorialState.selectedVideoId;
            return `
                <button
                    type="button"
                    class="video-list-item${isActive ? ' active' : ''}"
                    data-video-id="${video.id}">
                    <span class="video-list-index">${String(index + 1).padStart(2, '0')}</span>
                    <span class="video-list-meta">
                        <span class="video-list-title">${video.title}</span>
                        <span class="video-list-category">${video.category}</span>
                    </span>
                    <i class="fab fa-youtube"></i>
                </button>
            `;
        })
        .join('');

    listElement.querySelectorAll('.video-list-item').forEach((item) => {
        item.addEventListener('click', () => {
            tutorialState.selectedVideoId = item.dataset.videoId;
            renderTutorialsPage();
        });
    });
}

function renderTutorialsPage() {
    renderCategoryChips();

    const filteredVideos = getFilteredVideos();
    ensureSelectedVideo(filteredVideos);

    const currentVideo = filteredVideos.find((video) => video.id === tutorialState.selectedVideoId);
    renderFeaturedVideo(currentVideo);
    renderVideoList(filteredVideos);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTutorialsPage();
});
