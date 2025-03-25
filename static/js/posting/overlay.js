document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.querySelector('.toggle-sidebar');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');
        const body = document.body;

        // Сохраняем позицию прокрутки
        let scrollPosition = 0;

        if (toggleButton) {
            toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('show');

            if (sidebar.classList.contains('show')) {
                // Сохраняем текущую позицию прокрутки
                scrollPosition = window.pageYOffset;

                // Блокируем прокрутку основной страницы
                body.classList.add('menu-open');

                // Устанавливаем позицию прокрутки (чтобы страница не прыгала)
                body.style.top = `-${scrollPosition}px`;

                // Показываем оверлей
                overlay.style.display = 'block';
            } else {
                // Разблокируем прокрутку основной страницы
                body.classList.remove('menu-open');

                // Восстанавливаем позицию прокрутки
                body.style.top = '';
                window.scrollTo(0, scrollPosition);

                // Скрываем оверлей
                overlay.style.display = 'none';
            }
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function() {
            // Скрываем меню
            sidebar.classList.remove('show');

            // Разблокируем прокрутку основной страницы
            body.classList.remove('menu-open');

            // Восстанавливаем позицию прокрутки
            body.style.top = '';
            window.scrollTo(0, scrollPosition);

            // Скрываем оверлей
            overlay.style.display = 'none';
            });
        }

        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && sidebar.classList.contains('show')) {
            // Если окно стало больше 992px и меню открыто, закрываем его
            sidebar.classList.remove('show');
            body.classList.remove('menu-open');
            body.style.top = '';
            window.scrollTo(0, scrollPosition);
            overlay.style.display = 'none';
            }
        });
    });
