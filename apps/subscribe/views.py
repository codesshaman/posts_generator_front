from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from django.shortcuts import render
from django.utils import timezone
from .faq_translate import you_can_change_plan, how_to_cancel_sub, unused_coins_burn, accounting_invoice, support_team
from dotenv import load_dotenv
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG') == 'True'

subscription_status = True

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def subscription(request):
    """Отображает страницу подписки"""
    try:
        lang = language(request)
        you_can_change = translate("Вы можете изменить план", lang)
        how_to_cancel = translate("Как отменить подписку", lang)
        unused_coins = translate("Неиспользованные монеты сгорят", lang)
        accounting = translate("Счет для бухгалтерии", lang)
        support = translate("Обратитесь в поддержку", lang)

        # Получаем номер страницы из GET-параметра для пагинации платежей
        page = request.GET.get('page', 1)
        payment_data = []  # Заглушка для данных платежей, замените на реальные данные
        cards = []  # Заглушка для данных карт, замените на реальные данные
        tariffs_data = []  # Заглушка для данных тарифов, замените на реальные данные

        if not payment_data:
            payments = []
            paginator = None
            current_page = 1
            total_pages = 1
        else:
            paginator = Paginator(payment_data, 20)
            try:
                payments = paginator.page(page)
            except PageNotAnInteger:
                payments = paginator.page(1)
            except EmptyPage:
                payments = paginator.page(paginator.num_pages)

        # Определяем статус подписки и дату окончания
        global subscription_status
        active_status = translate("Активна", lang) if subscription_status else f"{translate('Будет отменена', lang)} {timezone.now().strftime('%d.%m.%Y')}"
        subscr_end_date = timezone.now().strftime('%d.%m.%Y')  # Текущая дата как заглушка

        context = {
            "title": translate("Моя подписка", lang),
            "h2_text": translate("Моя подписка", lang),
            "active_status": active_status,
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
            "subscr_end_date": subscr_end_date,
            "payments": payments.object_list if paginator else [],
            "current_page": payments.number if paginator else 1,
            "total_pages": paginator.num_pages if paginator else 1,
            "paginator": payments if paginator else None,
            "cards": cards,
            "tariffs": tariffs_data,
            "main_text": translate("Основная", lang),
            "edit_button": translate("Редактировать", lang),
            "delete_button": translate("Удалить", lang),
            "validity_period": translate("Срок действия", lang),
            "coins": translate("монет", lang),
            "month": translate("месяц", lang),
            "save": translate("Сохранить", lang),
            "money_saving": translate("Экономия", lang),
            "monthly_payment": translate("Ежемесячный платеж", lang),
            "annual_payment": translate("Годовой платеж", lang),
            "discount": translate("Скидка", lang),
            "upgrade_to": translate("Перейти на", lang),
            "subscription_status": subscription_status,  # Передаем статус подписки
            "cancel_subscription": translate("Отменить подписку", lang),
            "cancel_subscription_confirm": translate("Подтверждение отмены подписки", lang),
            "cancel_subscription_options": translate("Что произойдет после отмены", lang),
            "will_be_active_until": translate("Подписка будет активна до", lang),
            "automatic_renewal_disabled": translate("Автоматическое продление отключено", lang),
            "use_all_functions": translate("Вы сможете использовать все функции", lang),
            "before_expiration": translate("до истечения срока", lang),
            "renew_subscription": translate("Вы можете возобновить подписку в любой момент", lang),
            "reason_for_cancel": translate("Причина отмены", lang),
            "select_reason": translate("Выберите причину", lang),
            "too_expensive": translate("Слишком дорого", lang),
            "not_use_service": translate("Не использую сервис", lang),
            "missing_features": translate("Отсутствуют нужные функции", lang),
            "found_alternative": translate("Нашел альтернативу", lang),
            "other": translate("Другое", lang),
            "write_reason": translate("Укажите причину", lang),
            "cancel": translate("Отмена", lang),
            "confirm_unsubscription": translate("Подтвердить отмену", lang),
            "successfully_renewed": translate("Подписка успешно возобновлена", lang),
            "will_cancelled": translate("Подписка будет отменена", lang),
            "reason": translate("Причина", lang),
            "cancel_subs": translate("Отменить подписку", lang) if subscription_status else translate("Возобновить подписку", lang),
        }

        return render(request, "posting/subscription.html", context)

    except Exception as e:
        if debug:
            print(f"Ошибка в subscription: {str(e)}")
        raise
