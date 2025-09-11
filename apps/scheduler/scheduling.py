from django.shortcuts import render

# Заглушка с данными постов

def get_posts():
    # Заглушка с данными постов
    return [
        {
            'id': '1',
            'image_url': 'https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png',
            'image_alt': 'Post image',
            'status': 'В очереди',
            'platform': 'Instagram',
            'publish_date': '2025-09-10',
            'publish_time': '14:00',
            'title': '5 эффективных тактик email-маркетинга',
            'description': 'Руководство по созданию эффективных email-кампаний для вашего бизнеса. Узнайте, как повысить открываемость писем и конверсию...'
        },
        {
            'id': '2',
            'image_url': 'https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg',
            'image_alt': 'Post image 2',
            'status': 'В очереди',
            'platform': 'Twitter',
            'publish_date': '2025-09-11',
            'publish_time': '10:30',
            'title': 'Как увеличить вовлеченность в социальных сетях',
            'description': 'Практические советы по созданию контента, который привлекает аудиторию и увеличивает вовлеченность...'
        },
        {
            'id': '3',
            'image_url': 'https://example.com/image3.png',
            'image_alt': 'Post image 3',
            'status': 'В очереди',
            'platform': 'LinkedIn',
            'publish_date': '2025-09-12',
            'publish_time': '09:00',
            'title': 'Стратегии контент-маркетинга для B2B',
            'description': 'Узнайте, как создавать контент, который привлекает корпоративных клиентов и укрепляет ваш бренд...'
        },
        {
            'id': '4',
            'image_url': 'https://example.com/image4.png',
            'image_alt': 'Post image 4',
            'status': 'В очереди',
            'platform': 'Instagram',
            'publish_date': '2025-09-18',
            'publish_time': '13:00',
            'title': 'Как использовать Instagram Reels для продвижения бизнеса',
            'description': 'Пошаговое руководство по созданию коротких видео, которые привлекут новую аудиторию и увеличат охваты...'
        },
        {
            'id': '5',
            'image_url': 'https://example.com/image5.png',
            'image_alt': 'Post image 5',
            'status': 'В очереди',
            'platform': 'Twitter',
            'publish_date': '2025-09-20',
            'publish_time': '11:00',
            'title': '5 советов для создания вирусных твитов',
            'description': 'Узнайте, как создавать твиты, которые привлекают внимание и вызывают обсуждение в Twitter...'
        },
        {
            'id': '6',
            'image_url': 'https://example.com/image6.png',
            'image_alt': 'Post image 6',
            'status': 'В очереди',
            'platform': 'LinkedIn',
            'publish_date': '2025-09-25',
            'publish_time': '10:00',
            'title': 'Почему личный бренд важен для профессионалов',
            'description': 'Советы по построению личного бренда на LinkedIn для карьерного роста и привлечения клиентов...'
        },
        {
            'id': '7',
            'image_url': 'https://example.com/image7.png',
            'image_alt': 'Post image 7',
            'status': 'В очереди',
            'platform': 'Instagram',
            'publish_date': '2025-10-01',
            'publish_time': '15:00',
            'title': 'Как оптимизировать Instagram Stories для вовлечения',
            'description': 'Практические рекомендации по созданию сторис, которые удерживают внимание и повышают взаимодействие...'
        },
        {
            'id': '8',
            'image_url': 'https://example.com/image8.png',
            'image_alt': 'Post image 8',
            'status': 'В очереди',
            'platform': 'Twitter',
            'publish_date': '2025-10-05',
            'publish_time': '12:30',
            'title': 'Тренды контента в Twitter на 2025 год',
            'description': 'Какие форматы и темы будут популярны в Twitter в следующем году? Узнайте прямо сейчас...'
        },
        {
            'id': '9',
            'image_url': 'https://example.com/image9.png',
            'image_alt': 'Post image 9',
            'status': 'В очереди',
            'platform': 'LinkedIn',
            'publish_date': '2025-10-10',
            'publish_time': '09:30',
            'title': 'Как использовать LinkedIn для генерации лидов',
            'description': 'Стратегии поиска и привлечения потенциальных клиентов через LinkedIn для вашего бизнеса...'
        },
        {
            'id': '10',
            'image_url': 'https://example.com/image10.png',
            'image_alt': 'Post image 10',
            'status': 'В очереди',
            'platform': 'Instagram',
            'publish_date': '2025-10-15',
            'publish_time': '14:30',
            'title': '5 ошибок в Instagram-маркетинге, которых стоит избегать',
            'description': 'Разбираем типичные ошибки в продвижении через Instagram и как их исправить для лучших результатов...'
        },
        {
            'id': '11',
            'image_url': 'https://example.com/image11.png',
            'image_alt': 'Post image 11',
            'status': 'В очереди',
            'platform': 'Twitter',
            'publish_date': '2025-10-20',
            'publish_time': '11:30',
            'title': 'Как использовать хэштеги для роста охватов',
            'description': 'Простые правила подбора и использования хэштегов для увеличения видимости ваших твитов...'
        },
        {
            'id': '12',
            'image_url': 'https://example.com/image12.png',
            'image_alt': 'Post image 12',
            'status': 'В очереди',
            'platform': 'LinkedIn',
            'publish_date': '2025-10-25',
            'publish_time': '08:30',
            'title': 'Как создать эффективный контент-план для B2B',
            'description': 'Шаги по разработке контент-плана, который поможет вашему бизнесу выделиться на LinkedIn...'
        },
        {
            'id': '13',
            'image_url': 'https://example.com/image13.png',
            'image_alt': 'Post image 13',
            'status': 'В очереди',
            'platform': 'Instagram',
            'publish_date': '2025-11-01',
            'publish_time': '16:00',
            'title': 'Как анализировать статистику Instagram для роста',
            'description': 'Гайд по использованию аналитики Instagram для оптимизации контента и увеличения вовлеченности...'
        }
    ]
