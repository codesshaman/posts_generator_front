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
      "saving_num": "3", "monthly_price": "990", "annually_price": "9990", "style": "", "label": ""},
    {"tariff_id": 2, "tariff_name": "Profi 2", "coins_num": "13000",
      "saving_num": "7", "monthly_price": "1100", "annually_price": "11000", "style": "bg-warning", "label": "Максимум возможностей"},
    {"tariff_id": 3, "tariff_name": "Profi 3", "coins_num": "17000",
      "saving_num": "9", "monthly_price": "1300", "annually_price": "13000", "style": "bg-primary", "label": "Самый популярный"},
{"tariff_id": 4, "tariff_name": "Profi 4", "coins_num": "21000",
      "saving_num": "11", "monthly_price": "1700", "annually_price": "17000", "style": "", "label": ""},
    {"tariff_id": 5, "tariff_name": "Profi 5", "coins_num": "33000",
      "saving_num": "13", "monthly_price": "2100", "annually_price": "21000", "style": "", "label": ""},
    {"tariff_id": 6, "tariff_name": "Profi 6", "coins_num": "47000",
      "saving_num": "15", "monthly_price": "3000", "annually_price": "30000", "style": "", "label": ""},
]
