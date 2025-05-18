from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from .payment_history import payment_data
from django.shortcuts import render
from .credit_cards import card_data
from .faq_translate import you_can_change_plan, how_to_cancel_sub, unused_coins_burn, accounting_invoice, support_team
from dotenv import load_dotenv
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG') == 'True'


@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def subscription(request):
    """Отображает страницу подписки"""
    try:
        lang = language(request)
        you_can_change = you_can_change_plan(lang)
        how_to_cancel = how_to_cancel_sub(lang)
        unused_coins = unused_coins_burn(lang)
        accounting = accounting_invoice(lang)
        support = support_team(lang)

        # Получаем номер страницы из GET-параметра для пагинации платежей
        page = request.GET.get('page', 1)

        # Проверяем, что payment_data не пустой
        if not payment_data:
            payments = []
            paginator = None
            current_page = 1
            total_pages = 1
        else:
            # Создаем объект Paginator
            paginator = Paginator(payment_data, 20)  # 20 платежей на страницу
            if debug:
                print("payment_data:", payment_data)
                print("page:", page)
            try:
                payments = paginator.page(page)
            except PageNotAnInteger:
                payments = paginator.page(1)
            except EmptyPage:
                payments = paginator.page(paginator.num_pages)

        # Подготовка данных карт
        cards = card_data if card_data else []
        if debug:
            print("Отображаем страницу подписки")

        context = {
            "title": translate("Моя подписка", lang),
            "h2_text": translate("Моя подписка", lang),
            "active_status": translate("Активна: ", lang),
            "tokens_prof": "5,000",
            "start_date_text": "15.03.2023",
            "next_payment_text": "15.04.2023",
            "price_sum": "2,990",
            "сurrency": "₽",
            "last_card_nums": "4582",
            "сurrent_expenses": "2,550",
            "coins_available": "5,000",
            "posts_gen_sum": "1,850",
            "groups_an_sum": "450",
            "profi_coins": "10,000",
            "profi_price": "990",
            "discount_percent": "20",
            "subscr_month": translate("апрель", lang),
            "subscr_year": "2023",
            "subscription_price": "2,990",
            "card_type_visa": "Visa",
            "month_date": "05/25",
            "card_type_mc": "MasterCard",
            "you_can_change": you_can_change,
            "how_to_cancel": how_to_cancel,
            "unused_coins": unused_coins,
            "accounting": accounting,
            "support_team": support,
            "subscr_end_date": "15.04.2023",
            'payments': payments.object_list if paginator else [],
            'current_page': payments.number if paginator else 1,
            'total_pages': paginator.num_pages if paginator else 1,
            'paginator': payments if paginator else None,
            'cards': cards,  # Добавляем данные карт в контекст
            'main_text': translate("Основная", lang),
            'edit_button': translate("Редактировать", lang),
            'delete_button': translate("Удалить", lang),
            'validity_period': translate("Срок действия", lang),
        }

        return render(request, "posting/subscription.html", context)

    except Exception as e:
        if debug:
            print(f"Ошибка в subscription: {str(e)}")
        raise
