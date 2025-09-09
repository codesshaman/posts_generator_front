from django.shortcuts import render

# Заглушка с данными постов

def get_posts():
    # Заглушка с данными постов
    return [
        {
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
            'image_url': 'https://example.com/image3.png',
            'image_alt': 'Post image 3',
            'status': 'В очереди',
            'platform': 'LinkedIn',
            'publish_date': '2025-09-12',
            'publish_time': '09:00',
            'title': 'Стратегии контент-маркетинга для B2B',
            'description': 'Узнайте, как создавать контент, который привлекает корпоративных клиентов и укрепляет ваш бренд...'
        }
    ]
