from .groups_data import groups_topics
from django.http import JsonResponse
import random
import json


def get_analyses_text(lang):
    if lang == "ru":
        return "Мы проанализируем выбранную группу, \
                чтобы определить основную тематику, \
                интересы аудитории и наиболее \
                популярные темы постов. На основе \
                этого анализа будут предложены темы \
                для генерации постов."
    else:
        return "We will analyze the selected group to \
                determine the main topics, audience \
                interests and the most popular post \
                topics. Based on this analysis, topics \
                for generating posts will be suggested."


def analyses_text(lang):
    if lang == "ru":
        return "Анализ может занять некоторое время \
                в зависимости от размера группы и \
                количества постов. Пожалуйста, не \
                закрывайте страницу во время анализа."
    else:
        return "The analysis may take some time \
                depending on the size of the group \
                and the number of posts. Please do not \
                close the page during the analysis."


def themes_analysis_complete(lang):
    if lang == "ru":
        return "Мы проанализировали контент группы \
                и определили основные темы"
    else:
        return "We analyzed the group's content \
                and identified the main topics"


def get_group_topics(request):
    if request.method == 'POST':
        # Можно добавить проверку group_id из request.body, если нужно
        data = json.loads(request.body)
        group_id = data.get('group_id')

        # Возвращаем темы и время анализа (в секундах)
        response_data = {
            'status': 'success',
            'topics': groups_topics,
            'analysis_duration': 5  # Время эмуляции анализа в секундах
        }
        return JsonResponse(response_data)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

def check_reset_view(request):
    """Эта функция возвращает True если предыдущий
    анализ был произведён не позднее N месяцев назад
    и False если анализа не было или он был давно.
    Значение передаётся в js скрипт second_step.js
    для всплывающего окна с предупреждением о
    сохранённом предыдущем анализе"""
    # Рандомно возвращаем True или False
    # result = random.choice([True, False])
    # return JsonResponse({'allow_reset': result})
    return JsonResponse({'allow_reset': True})

def check_prew_view():
    """"Эта функция передаёт True или False
    в тех же случаях, что и предыдущая
    (check_reset_view), но результат
    используется для показа/скрытия
    блока предыдущего анализа на
    странице второго шага."""
    return True