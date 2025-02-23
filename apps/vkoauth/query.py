from dotenv import load_doten
import requests

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')
backend_url = os.getenv('BACKEND_HOST')
if not backend_url.startwith('https://'):
    backend_url = 'https://' + backend_url


class Query:
    def __init__(self, vk_data, vk_access_token):
        """
        Инициализация класса с данными от VK и токеном.
        
        :param vk_data: Словарь с данными пользователя от VK
        :param vk_access_token: Токен авторизации от VK
        :param backend_url: URL бэкенда (по умолчанию задан)
        """
        self.vk_data = vk_data
        self.vk_access_token = vk_access_token
        self.backend_url = backend_url

    def _prepare_payload(self):
        """
        Формирует данные для отправки на бэкенд.
        
        :return: Словарь с данными запроса
        """
        payload = {
            "auth": "vk",
            "login": self.vk_data.get("username", ""),  # Уникальный логин
            "vk": str(self.vk_data.get("vk_id", "")),   # ID ВКонтакте как строка
            "email": self.vk_data.get("email", ""),
            "name": self.vk_data.get("first_name", ""),
            "surname": self.vk_data.get("last_name", ""),
            "password": "",                  # Пароль пустой для VK
            "password_confirm": "",
            "is_staff": "False",
            "referrer": "1"
        }
        if debug:
            print("Данные для отправки: ")
            print(payload)
        return payload

    def query_to_backend(self):
        """
        Отправляет POST-запрос на бэкенд и обрабатывает ответ.
        
        :return: Ответ от бэкенда в виде словаря или None в случае ошибки
        """
        # Формируем данные
        payload = self._prepare_payload()

        # Отправляем запрос
        try:
            response = requests.post(self.backend_url, json=payload)
            # Проверяем статус ответа
            if response.status_code in (200, 201):
                auth_data = response.json()
                if debug:
                    print("Успешно:", auth_data)
                return auth_data
            else:
                if debug:
                    print("Ошибка:", response.status_code, response.text)
                return None
        except requests.exceptions.RequestException as e:
            if debug:
                print("Ошибка при запросе:", str(e))
            return None


# Пример использования
# if __name__ == "__main__":
#     # Данные пользователя, полученные от VK
#     user_data = {
#         "username": "vk_62059172",
#         "vk_id": 62059172,
#         "first_name": "Николай",
#         "last_name": "Васильев",
#         "email": ""
#     }

#     vk_access_token = "твой_токен_от_VK"  # Токен, полученный через OAuth2

#     # Создаём экземпляр класса
#     query = Query(vk_data=user_data, vk_access_token=vk_access_token)

#     # Выполняем запрос к бэкенду
#     result = query.query_to_backend()