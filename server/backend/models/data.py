import datetime

loans = [
    {
        "id": 1,
        "name": "Tom's Loan",
        "interest_rate": 5.0,
        "principal": 10000,
        "due_date": datetime.date(2025, 3, 1),
        "term_months": 12,
    },
    {
        "id": 2,
        "name": "Chris Wailaka",
        "interest_rate": 3.5,
        "principal": 500000,
        "due_date": datetime.date(2025, 3, 1),
        "term_months": 12,
    },
    {
        "id": 3,
        "name": "NP Mobile Money",
        "interest_rate": 4.5,
        "principal": 30000,
        "due_date": datetime.date(2025, 3, 1),
        "term_months": 12,
    },
    {
        "id": 4,
        "name": "Esther's Autoparts",
        "interest_rate": 1.5,
        "principal": 40000,
        "due_date": datetime.date(2026, 12, 23),
        "term_months": 12,
    },
]

loan_payments = [
    {"id": 1, "loan_id": 1, "payment_date": datetime.date(2025, 3, 4), "amount": 10500},
    {"id": 2, "loan_id": 2, "payment_date": datetime.date(2025, 3, 15), "amount": 517500},
    {"id": 3, "loan_id": 3, "payment_date": datetime.date(2025, 4, 5), "amount": 31350},
]


def get_loans():
    return loans


def get_payments():
    return loan_payments


def get_payments_by_loan_id(loan_id):
    return [payment for payment in loan_payments if payment["loan_id"] == loan_id]


def add_payment(loan_id, payment_amount, payment_date=None):
    if not any(loan["id"] == loan_id for loan in loans):
        return None

    new_payment_id = max((payment["id"] for payment in loan_payments), default=0) + 1
    payment_date = payment_date or datetime.date.today()
    new_payment = {
        "id": new_payment_id,
        "loan_id": loan_id,
        "payment_date": payment_date,
        "amount": float(payment_amount),
    }
    loan_payments.append(new_payment)
    return new_payment
