from datetime import datetime, timedelta

def validate_tariff_update(client_data, tariffs_data):
    if not client_data:
        return False

    tariff_name = client_data.get("tariff_name")
    period = int(client_data.get("period", 0))  # Добавляем значение по умолчанию
    next_billing_date = client_data.get("next_billing_date")

    # Находим тариф по имени
    tariff = next((t for t in tariffs_data if t["tariff_name"] == tariff_name), None)
    if not tariff:
        return False

    # Проверка цены
    price = str(client_data.get("price")).strip()
    expected_price = tariff["monthly_price"] if period == 0 else tariff["annually_price"]
    print(f"Ожидалась цена: {expected_price}, передана цена: {price}")
    if price != expected_price:
        return False

    # Проверка цены с допусками и очисткой
    try:
        price = float(price.replace(' ', '').replace('\xa0', '').replace(',', '.'))
        expected_price = float(tariff["monthly_price"]) if period == 0 else float(tariff["annually_price"])
        if abs(price - expected_price) > 0.01:
            return False
    except Exception:
        return False

    # Проверка на наличие всех необходимых полей
    if not all([tariff_name, price, next_billing_date]):
        return False

    # Расчёт следующей даты списания
    today = datetime.today()
    if period == 0:
        next_expected = today + timedelta(days=30)
    else:
        try:
            next_expected = today.replace(year=today.year + 1)
        except ValueError:
            next_expected = today + timedelta(days=365)

    # Проверка даты списания
    try:
        provided_date = datetime.strptime(next_billing_date, '%d.%m.%Y')
        delta_days = abs((provided_date - next_expected).days)
        if delta_days > 1:
            return False
    except ValueError:
        return False

    return True
