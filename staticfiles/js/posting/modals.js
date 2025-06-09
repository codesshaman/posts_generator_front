const setupModals = () => {
    document.getElementById('generateImageBtn').addEventListener('click', () => {
        showLoading('Генерация изображения...');
        setTimeout(() => {
            const randomId = Math.floor(Math.random() * 1000);
            document.getElementById('postImage').src = `https://via.placeholder.com/600x400?text=Generated_Image_${randomId}`;
            hideLoading();
        }, 1500);
    });

    document.getElementById('postImageUpload').addEventListener('change', function (event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('postImage').src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
};

export { setupModals };