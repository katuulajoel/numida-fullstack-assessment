from flask import Blueprint, jsonify, request
from ..models.data import add_payment

payments_bp = Blueprint("payments", __name__)


@payments_bp.route("/api/payments", methods=["POST"])
def create_payment():
    payload = request.get_json(silent=True) or {}
    loan_id = payload.get("loanId")
    payment_amount = payload.get("paymentAmount")

    if loan_id is None or payment_amount is None:
        return jsonify({"error": "loanId and paymentAmount are required"}), 400

    try:
        loan_id = int(loan_id)
        payment_amount = float(payment_amount)
    except (TypeError, ValueError):
        return jsonify({"error": "loanId must be an integer and paymentAmount must be a number"}), 400

    if payment_amount <= 0:
        return jsonify({"error": "paymentAmount must be greater than 0"}), 400

    new_payment = add_payment(loan_id, payment_amount)
    if new_payment is None:
        return jsonify({"error": f"Loan with ID {loan_id} not found"}), 404

    response_payment = {
        **new_payment,
        "payment_date": new_payment["payment_date"].isoformat(),
    }
    return jsonify({"success": True, "payment": response_payment}), 201
