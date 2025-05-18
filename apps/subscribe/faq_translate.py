from dotenv import load_dotenv
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
