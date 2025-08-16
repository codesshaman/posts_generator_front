document.addEventListener('DOMContentLoaded', function () {
        // Проверяем наличие элементов перед их использованием
        const generateImageBtn = document.getElementById('generateImageBtn');
        const imageGeneratorModalElement = document.getElementById('imageGeneratorModal');

        if (!generateImageBtn) {
            console.error('Элемент с ID "generateImageBtn" не найден');
            return;
        }

        if (!imageGeneratorModalElement) {
            console.error('Элемент с ID "imageGeneratorModal" не найден');
            return;
        }

        // Проверяем, доступен ли объект bootstrap
        if (typeof bootstrap === 'undefined') {
            console.error('Bootstrap JS не подключен');
            return;
        }

        // Инициализируем модальное окно
        const imageGeneratorModal = new bootstrap.Modal(imageGeneratorModalElement);

        // Получаем остальные элементы
        const generateImageBtnSubmit = document.getElementById('generateImageBtnSubmit');
        const imagePrompt = document.getElementById('imagePrompt');
        const imageGenerationResult = document.getElementById('imageGenerationResult');
        const imageGenerationLoading = document.getElementById('imageGenerationLoading');
        const generatedImageContainer = document.getElementById('generatedImageContainer');
        const generatedImage = document.getElementById('generatedImage');
        const useGeneratedImageBtn = document.getElementById('useGeneratedImageBtn');
        const imageTokensUsed = document.getElementById('imageTokensUsed');
        const previewImg = document.getElementById('previewImg');
        const imagePreview = document.getElementById('imagePreview');

        // Проверяем наличие всех необходимых элементов
        if (!generateImageBtnSubmit || !imagePrompt || !imageGenerationResult ||
            !imageGenerationLoading || !generatedImageContainer || !generatedImage ||
            !useGeneratedImageBtn || !imageTokensUsed || !previewImg || !imagePreview) {
            console.error('Не все необходимые элементы найдены');
            return;
        }

        // Обработчик для кнопки "Сгенерировать фото с помощью ИИ"
        generateImageBtn.addEventListener('click', function() {
            // Сбрасываем предыдущие результаты
            imageGenerationResult.style.display = 'none';
            generatedImageContainer.style.display = 'none';
            useGeneratedImageBtn.style.display = 'none';
            imagePrompt.value = '';

            // Открываем модальное окно
            imageGeneratorModal.show();
        });

        // Отдельная функция для инициации генерации изображения (POST-запрос)
        function initImageGeneration(prompt, style, ratio) {
            fetch('/send_image_promt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Если нужно, добавьте CSRF-токен для Django: 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    prompt: prompt,
                    style: style,
                    ratio: ratio
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при инициации генерации изображения');
                }
                return response.json();
            })
            .then(data => {
                // После успешной инициации начинаем опрос статуса
                checkStatus();
                // Для заглушки: выводим промпт в консоль браузера (как placeholder, пока Django не обработан)
                console.log('Передаваемый промпт в Django:', prompt);
            })
            .catch(error => {
                console.error('Ошибка при отправке данных в Django:', error);
                imageGenerationLoading.style.display = 'none';
            });
        }

        // Обработчик для кнопки "Сгенерировать" в модальном окне
        generateImageBtnSubmit.addEventListener('click', function() {
            const prompt = imagePrompt.value.trim();
            if (prompt === '') {
                alert('{{ enter_description }}');
                return;
            }

            const style = document.querySelector('input[name="imageStyle"]:checked').value;
            const ratio = document.querySelector('input[name="imageRatio"]:checked').value;

            imageGenerationResult.style.display = 'block';
            imageGenerationLoading.style.display = 'block';
            generatedImageContainer.style.display = 'none';
            useGeneratedImageBtn.style.display = 'none';

            // Вызываем отдельную функцию для инициации
            initImageGeneration(prompt, style, ratio);

            // Функция для опроса Django
            function checkStatus() {

            // Скрываем картинку, чтобы не мигала старая
            generatedImageContainer.style.display = 'none';

            fetch('/image_gen/')
                .then(response => response.json())
                .then(data => {
                    if (data.ready) {
                        // Убираем индикатор загрузки
                        imageGenerationLoading.style.display = 'none';

                        // Добавляем рандомный параметр к URL, чтобы обойти кэш
                        const noCacheUrl = data.image_url + '?t=' + Date.now();

                        // Устанавливаем изображение и ждём его загрузки
                        generatedImage.onload = function() {
                            generatedImageContainer.style.display = 'block';
                        };
                        generatedImage.src = noCacheUrl;

                        // Рандомные токены
                        const tokens = Math.floor(Math.random() * 800) + 200;
                        imageTokensUsed.textContent = tokens;
                        document.querySelector('#imageGenerationResult .progress-bar').style.width = (tokens / 5000 * 100) + '%';

                        useGeneratedImageBtn.style.display = 'inline-block';
                    } else {
                        setTimeout(checkStatus, 500);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при опросе статуса:', error);
                    setTimeout(checkStatus, 2000);
                });
        }


            // Запуск цикла опроса
            checkStatus();
        });

        // Обработчик для кнопки "Использовать изображение"
        useGeneratedImageBtn.addEventListener('click', function() {
            // Устанавливаем сгенерированное изображение в предпросмотр
            previewImg.src = generatedImage.src;
            imagePreview.style.display = 'block';
            document.querySelector('.image-upload-placeholder').style.display = 'none';

            // Закрываем модальное окно
            imageGeneratorModal.hide();
        });
    });
