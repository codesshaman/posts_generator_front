document.addEventListener('DOMContentLoaded', function () {
  // Инициализация модального окна
  const editPostModalElement = document.getElementById('editPostModal');
  const editPostModal = new bootstrap.Modal(editPostModalElement);

  // Функция для открытия модального окна и заполнения формы
  function openEditModal(postId) {
      // Пример данных поста (в реальном приложении получите их через AJAX)
      const postData = {
          id: postId,
          title: 'Пример заголовка',
          description: 'Пример описания',
          platform: 'linkedin',
          status: 'published',
          publishDate: '2023-10-01T12:00',
          image: 'https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg' // Путь к изображению
      };

      // Заполнение формы данными поста
      document.getElementById('editPostId').value = postData.id;
      document.getElementById('editPostTitle').value = postData.title;
      document.getElementById('editPostDescription').value = postData.description;
      document.getElementById('editPostPlatform').value = postData.platform;
      document.getElementById('editPostStatus').value = postData.status;
      document.getElementById('editPostPublishDate').value = postData.publishDate;

      // Обработка изображения
      const currentImage = document.getElementById('currentPostImage');
      if (postData.image) {
          currentImage.src = postData.image;
          currentImage.style.display = 'block';
      } else {
          currentImage.style.display = 'none';
      }

      // Открытие модального окна
      editPostModal.show();
  }

  // Пример привязки к кнопке "Редактировать"
  document.querySelectorAll('.btn-edit').forEach(button => {
      button.addEventListener('click', function () {
          const postId = this.dataset.postId; // Предполагается, что у кнопки есть атрибут data-post-id
          openEditModal(postId);
      });
  });

  // Обработчик сохранения изменений
  document.getElementById('savePostChanges').addEventListener('click', function () {
      // Сбор данных из формы
      const formData = {
          id: document.getElementById('editPostId').value,
          title: document.getElementById('editPostTitle').value,
          description: document.getElementById('editPostDescription').value,
          platform: document.getElementById('editPostPlatform').value,
          status: document.getElementById('editPostStatus').value,
          publishDate: document.getElementById('editPostPublishDate').value,
          // Изображение можно обработать отдельно, если оно загружается
      };

      // Пример вывода данных в консоль (замените на AJAX-запрос для сохранения)
      console.log('Сохранение данных:', formData);

      // Закрытие модального окна
      editPostModal.hide();
  });
});

// document.addEventListener('DOMContentLoaded', function () {
//   // Проверяем наличие элементов перед их использованием
//   const editModalElement = document.getElementById('editPostModal');

//   if (!editModalElement) {
//     console.error('Модальное окно не найдено');
//     return;
//   }

//   // Получаем модальное окно редактирования
//   let editModal;
//   try {
//     editModal = new bootstrap.Modal(editModalElement);
//   } catch (error) {
//     console.error('Ошибка при инициализации модального окна:', error);
//     return;
//   }

//   // Получаем все кнопки редактирования
//   const editButtons = document.querySelectorAll('.btn-edit');

//   if (editButtons.length === 0) {
//     console.warn('Кнопки редактирования не найдены');
//   }

//   // Функция для автоматического изменения размера textarea
//   function autoResizeTextarea(textarea) {
//     // Сбрасываем высоту до минимальной
//     textarea.style.height = 'auto';
//     // Устанавливаем высоту равной scrollHeight (высота содержимого)
//     textarea.style.height = textarea.scrollHeight + 'px';
//   }

//   // Инициализируем автоматическое изменение размера для textarea
//   const descriptionTextarea = document.getElementById('editPostDescription');
//   if (descriptionTextarea) {
//     descriptionTextarea.addEventListener('input', function () {
//       autoResizeTextarea(this);
//     });
//   }

//   // Настраиваем автоматическое открытие календаря при клике на поле даты
//   const dateInput = document.getElementById('editPostPublishDate');
//   if (dateInput) {
//     // Убедимся, что у поля правильный тип
//     dateInput.setAttribute('type', 'datetime-local');

//     // При клике на поле даты автоматически открываем календарь
//     dateInput.addEventListener('click', function (e) {
//       // Фокусируемся на поле
//       this.focus();

//       // Используем современный метод showPicker, если он доступен
//       if (this.showPicker) {
//         this.showPicker();
//       } else {
//         // Для старых браузеров - эмулируем клик
//         const event = new MouseEvent('mousedown', {
//           view: window,
//           bubbles: true,
//           cancelable: true
//         });
//         this.dispatchEvent(event);
//       }
//     });

//     // Также можно добавить иконку календаря для улучшения UX
//     const dateInputContainer = dateInput.parentElement;
//     if (dateInputContainer) {
//       const calendarIcon = document.createElement('span');
//       calendarIcon.className = 'calendar-icon ph ph-calendar position-absolute';
//       calendarIcon.style.right = '10px';
//       calendarIcon.style.top = '50%';
//       calendarIcon.style.transform = 'translateY(-50%)';
//       calendarIcon.style.pointerEvents = 'none';
//       calendarIcon.style.zIndex = '10';

//       // Добавляем относительное позиционирование к контейнеру
//       dateInputContainer.style.position = 'relative';

//       // Вставляем иконку после input
//       dateInput.insertAdjacentElement('afterend', calendarIcon);
//     }
//   }

//   // Добавляем обработчик события для каждой кнопки редактирования
//   editButtons.forEach(button => {
//     button.addEventListener('click', function (e) {
//       e.preventDefault();

//       // Получаем родительский элемент поста
//       const postCard = this.closest('.post-card');

//       if (!postCard) {
//         console.error('Не удалось найти родительскую карточку поста');
//         return;
//       }

//       // Получаем данные поста с проверками
//       const titleElement = postCard.querySelector('.card-title');
//       const descriptionElement = postCard.querySelector('.post-description');
//       const imageElement = postCard.querySelector('.post-image');

//       if (!titleElement || !descriptionElement || !imageElement) {
//         console.error('Не удалось найти необходимые элементы поста');
//         return;
//       }

//       const postTitle = titleElement.textContent;
//       const postDescription = descriptionElement.textContent;
//       const postImage = imageElement.src;

//       // Определяем платформу по классу
//       let platform = 'linkedin'; // По умолчанию
//       const platformBadge = postCard.querySelector('.platform-badge');
//       if (platformBadge) {
//         if (platformBadge.classList.contains('platform-facebook')) platform = 'facebook';
//         if (platformBadge.classList.contains('platform-instagram')) platform = 'instagram';
//         if (platformBadge.classList.contains('platform-twitter')) platform = 'twitter';
//       }

//       // Определяем статус по классу
//       let status = 'published'; // По умолчанию
//       const statusBadge = postCard.querySelector('.post-status');
//       if (statusBadge) {
//         if (statusBadge.classList.contains('status-draft')) status = 'draft';
//         if (statusBadge.classList.contains('status-queued')) status = 'queued';
//       }

//       // Получаем дату публикации из текста
//       const postTimeElement = postCard.querySelector('.post-time');
//       let publishDate = '';

//       if (postTimeElement) {
//         const timeText = postTimeElement.textContent;
//         // Извлекаем дату из текста (например, из "12.05.2023, 14:30")
//         const dateMatch = timeText.match(/(\d{2})\.(\d{2})\.(\d{4}),\s*(\d{2}):(\d{2})/);

//         if (dateMatch) {
//           // Преобразуем в формат для input type="datetime-local": YYYY-MM-DDThh:mm
//           publishDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}T${dateMatch[4]}:${dateMatch[5]}`;

//           const publishDateInput = document.getElementById('editPostPublishDate');
//           if (publishDateInput) {
//             publishDateInput.value = publishDate;
//           }
//         } else if (timeText.includes('Публикация:')) {
//           // Если это запланированная публикация
//           const scheduledMatch = timeText.match(/Публикация:\s*(\d{2})\.(\d{2})\.(\d{4}),\s*(\d{2}):(\d{2})/);
//           if (scheduledMatch) {
//             publishDate = `${scheduledMatch[3]}-${scheduledMatch[2]}-${scheduledMatch[1]}T${scheduledMatch[4]}:${scheduledMatch[5]}`;

//             const publishDateInput = document.getElementById('editPostPublishDate');
//             if (publishDateInput) {
//               publishDateInput.value = publishDate;
//             }
//           }
//         }
//       }

//       // Можно также получить ID поста, если он есть
//       const postId = this.dataset.postId || '0';

//       // Заполняем форму данными поста с проверками
//       const idInput = document.getElementById('editPostId');
//       const titleInput = document.getElementById('editPostTitle');
//       const descriptionInput = document.getElementById('editPostDescription');
//       const platformInput = document.getElementById('editPostPlatform');
//       const statusInput = document.getElementById('editPostStatus');
//       const publishDateInput = document.getElementById('editPostPublishDate');
//       const currentImage = document.getElementById('currentPostImage');

//       if (idInput) idInput.value = postId;
//       if (titleInput) titleInput.value = postTitle;
//       if (descriptionInput) {
//         descriptionInput.value = postDescription;
//         // Автоматически изменяем размер textarea при загрузке данных
//         setTimeout(() => autoResizeTextarea(descriptionInput), 0);
//       }
//       if (platformInput) platformInput.value = platform;
//       if (statusInput) statusInput.value = status;
//       if (publishDateInput) publishDateInput.value = publishDate;

//       // Отображаем текущее изображение
//       if (currentImage) {
//         currentImage.src = postImage;
//         currentImage.style.display = 'block';
//       }

//       // Открываем модальное окно
//       try {
//         editModal.show();
//       } catch (error) {
//         console.error('Ошибка при открытии модального окна:', error);
//       }
//     });
//   });

//   // Обработчик для кнопки сохранения изменений
//   const saveButton = document.getElementById('savePostChanges');
//   if (!saveButton) {
//     console.error('Кнопка сохранения не найдена');
//     return;
//   }

//   saveButton.addEventListener('click', function () {
//     // Получаем данные из формы с проверками
//     const postIdInput = document.getElementById('editPostId');
//     const titleInput = document.getElementById('editPostTitle');
//     const descriptionInput = document.getElementById('editPostDescription');
//     const platformInput = document.getElementById('editPostPlatform');
//     const statusInput = document.getElementById('editPostStatus');
//     const publishDateInput = document.getElementById('editPostPublishDate');
//     const imageInput = document.getElementById('editPostImage');
//     const currentImageElement = document.getElementById('currentPostImage');

//     if (!postIdInput || !titleInput || !descriptionInput || !platformInput || !statusInput) {
//       console.error('Не удалось найти необходимые поля формы');
//       return;
//     }

//     const postId = postIdInput.value;
//     const title = titleInput.value;
//     const description = descriptionInput.value;
//     const platform = platformInput.value;
//     const status = statusInput.value;
//     const publishDate = publishDateInput ? publishDateInput.value : '';
//     const imageFile = imageInput && imageInput.files.length > 0 ? imageInput.files[0] : null;
//     const currentImage = currentImageElement ? currentImageElement.src : '';

//     // Валидация формы
//     if (!title || !description) {
//       alert('Пожалуйста, заполните все обязательные поля');
//       return;
//     }

//     // Для демонстрации просто обновляем пост в DOM
//     try {
//       updatePostInDOM(postId, {
//         title: title,
//         description: description,
//         platform: platform,
//         status: status,
//         publishDate: publishDate,
//         // Если новое изображение не выбрано, используем текущее
//         image: imageFile ? URL.createObjectURL(imageFile) : currentImage
//       });

//       // Закрываем модальное окно
//       editModal.hide();
//     } catch (error) {
//       console.error('Ошибка при обновлении поста:', error);
//       alert('Произошла ошибка при сохранении изменений');
//     }
//   });

//   // Функция для обновления поста в DOM
//   function updatePostInDOM(postId, postData) {
//     // Находим пост по ID или другому селектору
//     const postCards = document.querySelectorAll('.post-card');

//     if (postCards.length === 0) {
//       console.error('Посты не найдены в DOM');
//       return;
//     }

//     let targetPost = null;

//     // Ищем пост по ID
//     for (let i = 0; i < postCards.length; i++) {
//       const card = postCards[i];
//       const editButton = card.querySelector('.btn-edit');
//       if (editButton && editButton.dataset.postId === postId) {
//         targetPost = card;
//         break;
//       }
//     }

//     if (!targetPost) {
//       console.warn('Пост с ID ' + postId + ' не найден, используем первый пост');
//       targetPost = postCards[0];
//     }

//     // Обновляем данные поста с проверками
//     const titleElement = targetPost.querySelector('.card-title');
//     const descriptionElement = targetPost.querySelector('.post-description');
//     const imageElement = targetPost.querySelector('.post-image');

//     if (titleElement) titleElement.textContent = postData.title;
//     if (descriptionElement) descriptionElement.textContent = postData.description;

//     // Обновляем изображение, если оно изменилось
//     if (postData.image && imageElement) {
//       imageElement.src = postData.image;
//     }

//     // Обновляем платформу
//     const platformBadge = targetPost.querySelector('.platform-badge');
//     if (platformBadge) {
//       platformBadge.className = 'platform-badge'; // Сбрасываем классы
//       platformBadge.classList.add('platform-' + postData.platform);

//       // Обновляем текст платформы
//       let platformText = 'LinkedIn';
//       if (postData.platform === 'facebook') platformText = 'Facebook';
//       if (postData.platform === 'instagram') platformText = 'Instagram';
//       if (postData.platform === 'twitter') platformText = 'Twitter';
//       platformBadge.textContent = platformText;
//     }

//     // Обновляем статус
//     const statusBadge = targetPost.querySelector('.post-status');
//     if (statusBadge) {
//       statusBadge.className = 'post-status'; // Сбрасываем классы
//       statusBadge.classList.add('status-' + postData.status);

//       // Обновляем текст статуса
//       let statusText = 'Опубликовано';
//       if (postData.status === 'draft') statusText = 'Черновик';
//       if (postData.status === 'queued') statusText = 'В очереди';
//       statusBadge.textContent = statusText;
//     }

//     // Обновляем дату публикации
//     const postTimeElement = targetPost.querySelector('.post-time');
//     if (postTimeElement && postData.publishDate) {
//       try {
//         // Преобразуем формат даты из YYYY-MM-DDThh:mm в DD.MM.YYYY
//         // Преобразуем формат даты из YYYY-MM-DDThh:mm в DD.MM.YYYY, hh:mm
//         const date = new Date(postData.publishDate);

//         if (isNaN(date.getTime())) {
//           console.error('Некорректная дата:', postData.publishDate);
//           return;
//         }

//         const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

//         // Если статус "В очереди", показываем "Публикация: дата"
//         if (postData.status === 'queued') {
//           postTimeElement.innerHTML = `<i class="ph ph-clock me-1"></i> Публикация: ${formattedDate}`;
//         } else {
//           postTimeElement.innerHTML = `<i class="ph ph-clock me-1"></i> ${formattedDate}`;
//         }
//       } catch (error) {
//         console.error('Ошибка при форматировании даты:', error);
//       }
//     } else if (postTimeElement) {
//       // Если дата не указана, показываем текущую дату
//       const now = new Date();
//       const formattedNow = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
//       postTimeElement.innerHTML = `<i class="ph ph-clock me-1"></i> ${formattedNow}`;
//     }
//   }

//   // Добавляем CSS для поля даты с иконкой календаря
//   const style = document.createElement('style');
//   style.textContent = `
// /* Стили для textarea с автоматическим изменением размера */
// textarea.form-control {
//   min-height: 60px;
//   max-height: 300px;
//   overflow-y: auto;
//   resize: none;
//   transition: height 0.2s ease;
// }

// /* Стили для поля даты */
// #editPostPublishDate {
//   padding-right: 30px; /* Место для иконки */
//   cursor: pointer;
// }

// /* Стили для иконки календаря */
// .calendar-icon {
//   color: #6c757d;
//   cursor: pointer;
// }

// /* Стили для описания поста */
// .post-description {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   line-height: 1.5;
//   max-height: 4.5em; /* 3 строки * 1.5 line-height */
//   transition: max-height 0.3s ease;
// }

// /* При наведении на карточку показываем весь текст */
// .post-card:hover .post-description {
//   -webkit-line-clamp: unset;
//   max-height: 500px;
// }
// `;
//   document.head.appendChild(style);

//   // Обработчик события для модального окна при открытии
//   editModalElement.addEventListener('shown.bs.modal', function () {
//     // Автоматически изменяем размер textarea при открытии модального окна
//     const descriptionTextarea = document.getElementById('editPostDescription');
//     if (descriptionTextarea) {
//       autoResizeTextarea(descriptionTextarea);
//     }

//     // Фокусируемся на поле заголовка
//     const titleInput = document.getElementById('editPostTitle');
//     if (titleInput) {
//       titleInput.focus();
//     }
//   });
// });
