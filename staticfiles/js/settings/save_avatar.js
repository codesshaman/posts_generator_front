document.addEventListener('DOMContentLoaded', function () {
    // Остальной код уже есть...

    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');

    if (changeAvatarBtn && avatarInput && avatarPreview) {
        changeAvatarBtn.addEventListener('click', () => {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', function () {
            const file = avatarInput.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatarPreview.style.backgroundImage = `url(${e.target.result})`;
                    avatarPreview.style.backgroundSize = 'cover';
                    avatarPreview.style.backgroundPosition = 'center';
                    avatarPreview.innerHTML = ''; // Убираем иконку
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
