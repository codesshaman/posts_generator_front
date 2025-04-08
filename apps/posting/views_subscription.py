from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
from datetime import datetime
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

def you_can_change_plan(lang):
    if lang == "ru":
        return "Вы можете изменить тариф подписки в любое \
                время. Для повышения тарифа нажмите кнопку \
                'Повысить до...' рядом с выбранным тарифом. \
                Изменения вступят в силу немедленно, а разница \
                в стоимости будет рассчитана пропорционально \
                оставшемуся времени текущего периода. Для \
                понижения тарифа нажмите \"Изменить тариф\" в \
                блоке текущей подписки."
    else:
        return "You can change your subscription rate at any \
                time. To increase the tariff, click the \"Upgrade \
                to...\" button next to the selected \
                tariff. Changes will take effect immediately \
                and the difference in cost will be calculated \
                pro rata based on the remaining time in the \
                current period. To lower the tariff, click \
                \"Change plan\" in the current subscription block."


def how_to_cancel_sub(lang):
    if lang == "ru":
        return "Для отмены подписки нажмите кнопку \"Отменить \
                подписку\" в блоке текущей подписки. Ваша \
                подписка будет активна до конца оплаченного \
                периода, после чего автоматически не продлится. \
                Вы сможете использовать все функции сервиса до \
                окончания срока действия подписки."
    else:
        return "To cancel your subscription, click the \"Cancel \
                subscription\" button in the current subscription \
                block. Your subscription will be active until the \
                end of the paid period, after which it will not \
                automatically renew. You will be able to use all \
                functions of the service until the subscription \
                expires."


def unused_coins_burn(lang):
    if lang == "ru":
        return "Неиспользованные коины не переносятся на следующий \
                месяц. В начале каждого расчетного периода ваш \
                баланс коинов обновляется до количества, \
                предусмотренного вашим тарифом. Мы рекомендуем \
                использовать все доступные коины до конца месяца \
                для максимальной эффективности."
    else:
        return "Unused coins are not carried over to the next month. \
                At the beginning of each billing period, your coin \
                balance is updated to the amount allowed by your \
                tariff. We recommend using all available coins \
                before the end of the month for maximum efficiency."

def accounting_invoice(lang):
    if lang == "ru":
        return "Для получения счета-фактуры или других бухгалтерских \
                документов, пожалуйста, обратитесь в службу поддержки \
                через раздел \"Настройки\" > \"Поддержка\". Укажите \
                ваши реквизиты и период, за который вам нужны документы. \
                Мы подготовим все необходимые документы в течение 2 \
                рабочих дней."
    else:
        return "To obtain an invoice or other accounting documents, \
                please contact support via \"Settings\" > \"Support\". \
                Indicate your details and the period for which you \
                need documents. We will prepare all the necessary \
                documents within 2 working days."

def support_team(lang):
    if lang == "ru":
        return "Если у вас возникли вопросы по подписке или оплате, \
                наша команда поддержки всегда готова помочь."
    else:
        return "If you have any questions about your subscription \
                or payment, our support team is always ready to help."


# Create your views here.
def subscription(request):
    lang = language(request)
    you_can_change = you_can_change_plan(lang)
    how_to_cancel = how_to_cancel_sub(lang)
    unused_coins = unused_coins_burn(lang)
    accounting = accounting_invoice(lang)
    support = support_team(lang)
    """Отображает страницу подписки"""
    if debug:
        print("Отображаем страницу подписки")
    return render(request, "posting/subscription.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
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
    })