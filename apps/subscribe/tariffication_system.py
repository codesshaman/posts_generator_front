from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG') == 'True'
in_detail = False


# Эмулированные данные тарифов
tarffs_data = [
    {"tariff_id": 1, "tariff_name": "Profi", "coins_num": "10000",
      "saving_num": "3", "tariff_price": "990", "style": "", "label": ""},
    {"tariff_id": 2, "tariff_name": "Profi 2", "coins_num": "13000",
      "saving_num": "7", "tariff_price": "1100", "style": "bg-warning", "label": "Максимум возможностей"},
    {"tariff_id": 3, "tariff_name": "Profi 3", "coins_num": "17000",
      "saving_num": "9", "tariff_price": "1300", "style": "bg-primary", "label": "Самый популярный"},
]
